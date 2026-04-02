const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = 'mysecretkey';

let users = [];

// Register user
const registerUser = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Error('Username and password required');

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = { id: Date.now(), username, password: hashedPassword };
    users.push(user);
    res.status(201).json({ message: 'User created', userId: user.id });
  } catch (err) {
    next(err);
  }
};

// Login user
const loginUser = (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

// Get all users (protected)
const getUsers = (req, res) => {
  res.json(users.map(u => ({ id: u.id, username: u.username })));
};

module.exports = { registerUser, loginUser, getUsers };