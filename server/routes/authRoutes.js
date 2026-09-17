import express from 'express';

const router = express.Router();

// Admin credentials
const ADMIN_USER = {
  id: 'admin_01',
  name: 'Azjad Ansari',
  email: 'admin@anzarifurniture.com',
  role: 'Store Administrator',
};

// @desc    Admin login
// @route   POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both email and password.',
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Accept admin@anzarifurniture.com or admin with password admin123 (or demo password)
  const isEmailMatch =
    normalizedEmail === 'admin@anzarifurniture.com' ||
    normalizedEmail === 'admin@ansarifurniture.com' ||
    normalizedEmail === 'admin';

  if (!isEmailMatch || password !== 'admin123') {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password. Use demo credentials: admin@anzarifurniture.com / admin123',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Welcome back, Admin!',
    user: ADMIN_USER,
    token: `anzari_token_${Date.now()}`,
  });
});

// @desc    Get current logged in admin
// @route   GET /api/auth/me
router.get('/me', (req, res) => {
  return res.status(200).json({
    success: true,
    user: ADMIN_USER,
  });
});

export default router;
