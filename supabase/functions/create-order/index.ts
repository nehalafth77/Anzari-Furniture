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

    const body = await req.json();
    const {
      customerDetails,
      shippingAddress,
      items,
      deliveryMethod = 'Standard White Glove',
      paymentMethod = 'Card / UPI',
      subtotal = 0,
      discount = 0,
      shippingFee = 0,
      tax = 0,
      total = 0,
      userId = null,
    } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Order must include at least one item' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!customerDetails || !shippingAddress) {
      return new Response(
        JSON.stringify({ error: 'Customer details and shipping address are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const orderId = crypto.randomUUID();
    const orderNumber = `ANS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // 1. Insert Order
    const { error: orderError } = await supabase.from('Order').insert({
      id: orderId,
      orderNumber,
      userId,
      customerDetails,
      shippingAddress,
      deliveryMethod,
      paymentMethod,
      paymentStatus: 'Completed',
      subtotal: Number(subtotal),
      discount: Number(discount),
      shippingFee: Number(shippingFee),
      tax: Number(tax),
      total: Number(total),
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    // 2. Insert Order Items & decrement stock
    const orderItemsToInsert = [];
    for (const item of items) {
      const prodId = item.productId || item.product || item._id || item.id;
      const qty = Number(item.quantity) || 1;

      orderItemsToInsert.push({
        id: crypto.randomUUID(),
        orderId,
        productId: prodId || null,
        name: item.name || 'Furniture Item',
        price: Number(item.price) || 0,
        quantity: qty,
        image: item.image || '',
        color: item.color || null,
      });

      // Decrement stock if product exists
      if (prodId) {
        const { data: currentProduct } = await supabase
          .from('Product')
          .select('stock')
          .eq('id', prodId)
          .maybeSingle();

        if (currentProduct) {
          const newStock = Math.max(0, (currentProduct.stock || 0) - qty);
          await supabase
            .from('Product')
            .update({ stock: newStock, updatedAt: new Date().toISOString() })
            .eq('id', prodId);
        }
      }
    }

    const { data: insertedItems, error: itemsError } = await supabase
      .from('OrderItem')
      .insert(orderItemsToInsert)
      .select('*');

    if (itemsError) {
      console.error('Error inserting order items:', itemsError);
    }

    const fullOrder = {
      id: orderId,
      _id: orderId,
      orderNumber,
      customerDetails,
      shippingAddress,
      deliveryMethod,
      paymentMethod,
      paymentStatus: 'Completed',
      subtotal,
      discount,
      shippingFee,
      tax,
      total,
      status: 'Confirmed',
      items: insertedItems || orderItemsToInsert,
      createdAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify({ success: true, data: fullOrder }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
