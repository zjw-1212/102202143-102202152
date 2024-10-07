const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// 注册路由
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, major } = req.body;
    const user = new User({ username, email, password, major });
    await user.save();
    res.status(201).send({ message: '用户注册成功' });
  } catch (error) {
    res.status(400).send({ message: '注册失败', error });
  }
});

// 登录路由
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ message: '用户名或密码错误' });
    }
    const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: '登录失败', error });
  }
});

module.exports = router;
