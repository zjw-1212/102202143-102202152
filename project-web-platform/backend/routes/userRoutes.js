const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authMiddleware = require('../middlewares/authMiddleware'); // 用于验证 JWT 令牌
const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect('mongodb://localhost:27017/project-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});


// 获取用户的基本信息
router.get('/profile', authMiddleware.verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    // 返回用户信息（排除密码等敏感信息）
    res.status(200).json({
      username: user.username,
      email: user.email,
      major: user.major,
    });
  } catch (error) {
    console.error('获取用户信息失败:', error);
    res.status(500).json({ message: '服务器错误，无法获取用户信息' });
  }
});


// 获取用户的项目
router.get('/my-projects', authMiddleware.verifyToken, async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.userId }); // 查找当前用户参与的项目
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: '获取项目失败' });
  }
});

// 获取用户管理的项目
router.get('/my-managed-projects', authMiddleware.verifyToken, async (req, res) => {
  try {
    console.log('Request user ID:', req.userId); // 检查是否获取到了 userId
    const projects = await Project.find({ createdBy: req.userId }); // 使用 req.userId 查询项目
    console.log('Fetched projects:', projects);
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching managed projects:', error);
    res.status(500).json({ message: '服务器错误，无法获取管理的项目' });
  }
});


module.exports = router;

