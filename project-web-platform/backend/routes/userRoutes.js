const express = require('express');
const jwt = require('jsonwebtoken');
const Project = require('../models/Project');

const router = express.Router();

// 获取用户管理的项目
router.get('/my-managed-projects', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const { userId } = jwt.verify(token, 'SECRET_KEY'); // 解码 JWT 以获取 userId
    const projects = await Project.find({ createdBy: userId }); // 查询由用户创建的项目
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: '服务器错误，无法获取管理的项目' });
  }
});

module.exports = router;
