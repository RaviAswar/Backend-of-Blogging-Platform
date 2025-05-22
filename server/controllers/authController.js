const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const { Op } = require('sequelize');
require('dotenv').config();

const authController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }]
        }
      });
      
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }
      
      const user = await User.create({ username, email, password });
      
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );
      
      res.status(201).json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  },
  
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const isValidPassword = await user.validPassword(password);
      
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );
      
      res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error during login' });
    }
  }
};

module.exports = authController;