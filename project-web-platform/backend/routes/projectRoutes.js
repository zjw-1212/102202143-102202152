const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { getChatHistory } = require('../controllers/projectController');

const router = express.Router();

// 获取所有项目
router.get('/', async (req, res) => {
  const projects = await Project.find().populate('createdBy', 'username');
  res.send(projects);
});

// 获取项目的聊天历史记录
router.get('/:id/messages', getChatHistory);

// 创建新项目
router.post('/', async (req, res) => {
  const { title, description, requirements } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const { userId } = jwt.verify(token, 'SECRET_KEY');

  const project = new Project({
    title,
    description,
    requirements,
    createdBy: userId
  });

  await project.save();
  res.status(201).send(project);
});

// 获取用户管理的项目
router.get('/my-managed-projects', async (req, res) => {
    try {
      const userId = req.user._id;  // 假设用户登录后可获取用户 ID
      const projects = await Project.find({ createdBy: userId });
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: '服务器错误，无法获取管理的项目' });
    }
  });

const { applyForProject } = require('../controllers/projectController');

// 用户申请加入项目
router.post('/:id/apply', applyForProject);

module.exports = router;
