/**
 * server/config/supabase.js
 * Server-side Supabase client using @supabase/supabase-js.
 * Uses lazy initialization so env vars are guaranteed loaded by dotenv
 * before the clients are constructed.
 *
 * Exports:
 *   supabaseAdmin        — service-role client (bypasses RLS)
 *   supabasePublic       — publishable-key client (respects RLS)
 *   verifySupabaseToken  — validates a Supabase JWT
 */

import { createClient } from '@supabase/supabase-js';

let _admin = null;
let _public = null;

function getAdminClient() {
  if (!_admin) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY;
    if (!url || !key || key.includes('REPLACE')) {
      console.warn(
        '[Supabase] SUPABASE_URL or SUPABASE_SECRET_KEY not configured. ' +
          'Set the real secret key in server/.env.'
      );
    }
    _admin = createClient(url || '', key || '', {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return _admin;
}

function getPublicClient() {
  if (!_public) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    _public = createClient(url || '', key || '');
  }
  return _public;
}

/**
 * Admin/service-role client — bypasses Row Level Security.
 * Use ONLY on the server; never expose SUPABASE_SECRET_KEY to the browser.
 */
export const supabaseAdmin = new Proxy({}, {
  get(_, prop) {
    return getAdminClient()[prop];
  },
});

/**
 * Public/anon client — respects Row Level Security.
 */
export const supabasePublic = new Proxy({}, {
  get(_, prop) {
    return getPublicClient()[prop];
  },
});

/**
 * Verify a Supabase-issued JWT via the Supabase Auth getUser API.
 * @param {string} jwt  Bearer token
 * @returns {Promise<object>} Supabase user object
 */
export async function verifySupabaseToken(jwt) {
  const { data, error } = await getAdminClient().auth.getUser(jwt);
  if (error || !data?.user) {
    throw new Error(error?.message || 'Invalid or expired Supabase token');
  }
  return data.user;
}

/** Log Supabase config status (called from server.js after dotenv loads) */
export function logSupabaseStatus() {
  const url = process.env.SUPABASE_URL;
  const hasSecret = process.env.SUPABASE_SECRET_KEY &&
    !process.env.SUPABASE_SECRET_KEY.includes('REPLACE');
  if (url && hasSecret) {
    console.log(`[Supabase] ✓ Connected → ${url}`);
  } else {
    console.warn('[Supabase] ⚠ Not fully configured — add SUPABASE_SECRET_KEY to server/.env');
  }
}

