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
      productId,
      userName,
      userLocation = 'Mumbai, India',
      rating,
      title = '',
      comment,
      verifiedBuyer = true,
      userId = null,
    } = body;

    if (!productId || !userName || !rating || !comment) {
      return new Response(
        JSON.stringify({ error: 'productId, userName, rating, and comment are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const numericRating = Math.min(5, Math.max(1, Number(rating) || 5));
    const reviewId = crypto.randomUUID();

    // 1. Insert Review
    const { data: newReview, error: reviewError } = await supabase
      .from('Review')
      .insert({
        id: reviewId,
        productId,
        userId,
        userName,
        userLocation,
        rating: numericRating,
        title,
        comment,
        verifiedBuyer: Boolean(verifiedBuyer),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .select('*')
      .single();

    if (reviewError) {
      throw new Error(`Failed to create review: ${reviewError.message}`);
    }

    // 2. Recalculate average rating & review count for the product
    const { data: allReviews } = await supabase
      .from('Review')
      .select('rating')
      .eq('productId', productId);

    if (allReviews && allReviews.length > 0) {
      const avg = allReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / allReviews.length;
      const roundedAvg = Math.round(avg * 10) / 10;
      await supabase
        .from('Product')
        .update({
          rating: roundedAvg,
          reviewCount: allReviews.length,
          updatedAt: new Date().toISOString(),
        })
        .eq('id', productId);
    }

    return new Response(JSON.stringify({ success: true, data: newReview }), {
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
