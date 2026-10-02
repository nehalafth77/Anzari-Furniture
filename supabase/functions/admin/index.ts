import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase environment variables are missing');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    });

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    // Path might be /admin, /admin/analytics, /admin/orders, etc.
    const subRoute = pathParts[1] || url.searchParams.get('action') || '';

    // Handle GET requests
    if (req.method === 'GET') {
      if (subRoute === 'analytics' || subRoute === '' || subRoute === 'stats') {
        // Fetch Orders for sales & status calculations
        const { data: orders = [] } = await supabase
          .from('Order')
          .select('id, total, status, customerDetails, createdAt, trackingCode')
          .order('createdAt', { ascending: false });

        // Fetch Products for count and low stock
        const { data: products = [] } = await supabase
          .from('Product')
          .select('id, name, stock, price, category, images');

        // Fetch Users count
        const { count: usersCount } = await supabase
          .from('User')
          .select('*', { count: 'exact', head: true });

        const safeOrders = orders || [];
        const safeProducts = products || [];

        const totalSales = safeOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
        const lowStockProducts = safeProducts.filter((p) => (Number(p.stock) || 0) <= 5);

        const statusCountsMap: Record<string, number> = {};
        for (const ord of safeOrders) {
          const s = ord.status || 'Processing';
          statusCountsMap[s] = (statusCountsMap[s] || 0) + 1;
        }

        const statusCounts = Object.entries(statusCountsMap).map(([status, count]) => ({
          _id: status,
          status,
          count,
        }));

        return new Response(
          JSON.stringify({
            success: true,
            totalSales,
            totalOrders: safeOrders.length,
            totalProducts: safeProducts.length,
            totalUsers: usersCount || 0,
            lowStockCount: lowStockProducts.length,
            lowStockProducts: lowStockProducts.slice(0, 10),
            recentOrders: safeOrders.slice(0, 6),
            statusCounts,
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (subRoute === 'orders') {
        const { data: orders, error } = await supabase
          .from('Order')
          .select('*, items:OrderItem(*)')
          .order('createdAt', { ascending: false });

        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data: orders }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (subRoute === 'users') {
        const { data: users, error } = await supabase
          .from('User')
          .select('id, name, email, role, phone, createdAt, addresses:Address(*)')
          .order('createdAt', { ascending: false });

        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data: users }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Handle POST / PUT requests
    if (req.method === 'POST' || req.method === 'PUT') {
      const body = await req.json().catch(() => ({}));
      const action = body.action || subRoute;

      // Update Order Status
      if (action === 'updateOrderStatus' || subRoute === 'orders-status') {
        const { id, status, trackingCode } = body;
        if (!id) {
          return new Response(JSON.stringify({ error: 'Order ID is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const updatePayload: Record<string, any> = { updatedAt: new Date().toISOString() };
        if (status) updatePayload.status = status;
        if (trackingCode !== undefined) updatePayload.trackingCode = trackingCode;

        const { data: updatedOrder, error } = await supabase
          .from('Order')
          .update(updatePayload)
          .eq('id', id)
          .select('*')
          .single();

        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data: updatedOrder }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Update Review Status
      if (action === 'updateReviewStatus' || subRoute === 'reviews-status') {
        const { id, verifiedBuyer } = body;
        if (!id) {
          return new Response(JSON.stringify({ error: 'Review ID is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const { data: updatedReview, error } = await supabase
          .from('Review')
          .update({ verifiedBuyer: Boolean(verifiedBuyer), updatedAt: new Date().toISOString() })
          .eq('id', id)
          .select('*')
          .single();

        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data: updatedReview }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({ error: 'Not Found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
