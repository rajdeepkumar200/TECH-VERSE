const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

// POST /api/admin/login
router.post('/login', AdminController.login);

// GET /api/admin/verify
router.get('/verify', AdminController.verify);

module.exports = router;
