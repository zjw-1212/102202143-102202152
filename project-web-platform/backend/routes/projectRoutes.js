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


const { applyForProject } = require('../controllers/projectController');

// 用户申请加入项目
router.post('/:id/apply', applyForProject);

module.exports = router;
