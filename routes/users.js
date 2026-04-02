const express = require('express');
const router = express.Router();
const logger = require('../middleware/logger');
const authenticate = require('../middleware/auth');
const { registerUser, loginUser, getUsers } = require('../controllers/userController');

router.use(logger); // Logs all requests

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', authenticate, getUsers); // Protected route

module.exports = router;