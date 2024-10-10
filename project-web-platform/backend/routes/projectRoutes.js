const express = require('express');
const Project = require('../models/Project');
const { verifyToken } = require('../middlewares/authMiddleware'); // 引入认证中间件
const projectController = require('../controllers/projectController'); // 确保完整导入所有控制器
console.log('projectController:', projectController);
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/project-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});


// 获取所有项目
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('createdBy', 'username');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: '获取项目失败', error: error.message });
  }
});

// 获取单个项目
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: '项目未找到' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 获取项目的聊天历史记录
router.get('/:id/messages', projectController.getChatHistory);

// 创建新项目（需要认证）
router.post('/', verifyToken, projectController.createProject); // 直接调用创建项目的函数

// 删除项目（需要认证）
router.delete('/:id', verifyToken, projectController.deleteProject);

// 更新项目（需要认证）
router.put('/:id', verifyToken, projectController.updateProject);

// 用户申请加入项目（需要认证）
router.post('/:id/apply', verifyToken, projectController.applyForProject);

// 用户加入项目（需要认证）
router.post('/:id/join', verifyToken, projectController.joinProject);

// 用户退出项目（需要认证）
router.post('/:id/leave', verifyToken, projectController.leaveProject);

module.exports = router;
