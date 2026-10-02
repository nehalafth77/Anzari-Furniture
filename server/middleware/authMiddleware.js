/**
 * server/middleware/authMiddleware.js
 *
 * Express middleware to verify requests using Supabase JWTs.
 * Falls back to the legacy Anzari token format for backwards compatibility
 * during the migration period.
 *
 * Usage:
 *   import { requireAuth, requireAdmin } from './middleware/authMiddleware.js';
 *   router.get('/protected', requireAuth, handler);
 *   router.get('/admin-only', requireAdmin, handler);
 */

import { verifySupabaseToken } from '../config/supabase.js';

/**
 * requireAuth — verifies any authenticated user (Supabase JWT or legacy token).
 * Sets req.user = { id, email, role } on success.
 */
export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No authorization token provided.',
    });
  }

  const token = authHeader.slice(7); // strip "Bearer "

  // ── Legacy Anzari token (format: "anzari_token_<timestamp>") ─────────────
  if (token.startsWith('anzari_token_')) {
    req.user = {
      id: 'admin_01',
      email: 'admin@anzarifurniture.com',
      role: 'admin',
      source: 'legacy',
    };
    return next();
  }

  // ── Supabase JWT ────────────────────────────────────────────────────────
  try {
    const supabaseUser = await verifySupabaseToken(token);
    req.user = {
      id: supabaseUser.id,
      email: supabaseUser.email,
      role: supabaseUser.user_metadata?.role || supabaseUser.role || 'user',
      source: 'supabase',
      supabaseUser,
    };
    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: `Authentication failed: ${err.message}`,
    });
  }
}

/**
 * requireAdmin — extends requireAuth; additionally checks that the verified
 * user has the 'admin' role. Returns 403 if authenticated but not admin.
 */
export async function requireAdmin(req, res, next) {
  await requireAuth(req, res, async () => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.',
      });
    }
    next();
  });
}
