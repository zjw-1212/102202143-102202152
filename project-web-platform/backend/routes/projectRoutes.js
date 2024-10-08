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

  try {
    // 提取并验证 JWT
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // 确保 JWT 密钥匹配
    const userId = decoded.userId;

    // 创建新项目
    const project = new Project({
      title,
      description,
      requirements,
      createdBy: userId
    });

    await project.save();
    res.status(201).send(project);
  } catch (error) {
    console.error('发布项目失败', error);
    res.status(500).send({ message: '发布项目失败' });
  }
});


// 删除项目
router.delete('/:id', async (req, res) => {
  const { id: projectId } = req.params;
  const token = req.headers.authorization.split(' ')[1];
  const { userId } = jwt.verify(token, 'SECRET_KEY');

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: '项目不存在' });
    }

    // 确保当前用户是项目的创建者
    if (project.createdBy.toString() !== userId) {
      return res.status(403).json({ message: '您无权删除此项目' });
    }

    await Project.findByIdAndDelete(projectId);  // 删除项目
    res.status(200).json({ message: '项目已删除' });
  } catch (error) {
    res.status(500).json({ message: '服务器错误，删除项目失败' });
  }
});

// 更新项目（编辑）
router.put('/:id', async (req, res) => {
  const { title, description, requirements } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const { userId } = jwt.verify(token, 'SECRET_KEY');

  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: '项目不存在' });
    }

    // 确保只有项目创建者可以编辑项目
    if (project.createdBy.toString() !== userId) {
      return res.status(403).json({ message: '您无权编辑此项目' });
    }

    project.title = title;
    project.description = description;
    project.requirements = requirements;
    await project.save();

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: '服务器错误，编辑项目失败' });
  }
});


// 用户申请加入项目
const { applyForProject } = require('../controllers/projectController');
router.post('/:id/apply', applyForProject);


module.exports = router;
