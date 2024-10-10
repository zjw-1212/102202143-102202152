require('dotenv').config();
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key'; // 使用环境变量或默认值

// 数据库连接
mongoose.connect('mongodb://localhost:27017/project-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('数据库连接成功');
}).catch((error) => {
  console.error('数据库连接失败', error);
});

// 注册路由
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, major } = req.body;
    console.log("Received register request:", req.body);

    // 检查是否有重复用户
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: '用户已存在' });
    }

    // 使用hashPassword加密密码
    const hashedPassword = await User.hashPassword(password);

    // 创建新用户
    const user = new User({ username, email, password: hashedPassword, major });
    await user.save();

    console.log('用户注册成功:', user);
    res.status(201).send({ message: '用户注册成功' });
  } catch (error) {
    console.error('注册失败:', error);
    res.status(400).send({ message: '注册失败', error });
  }
});

// 登录路由
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request:", req.body);

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log("User not found");
      return res.status(401).send({ message: '用户不存在，请先注册' });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      console.log("Password mismatch");
      return res.status(401).send({ message: '用户名或密码错误' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log("Login successful");

    res.status(200).send({
      token,
      user: {
        username: user.username,
        email: user.email,
        major: user.major
      }
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).send({ message: '服务器错误' });
  }
});


module.exports = router;
