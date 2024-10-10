const Project = require('../models/Project');
const User = require('../models/User');
const Message = require('../models/Message');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/project-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// 创建新项目
exports.createProject = async (req, res) => {
  console.log('Received create project request:', req.body); // 打印请求体

  const { title, description, requirements } = req.body;
  
  try {
    const userId = req.userId; // 确保此字段已设置

    const project = new Project({
      title,
      description,
      requirements,
      createdBy: userId
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error); // 打印具体错误
    res.status(500).json({ message: '发布项目失败', error: error.message });
  }
};


// 用户加入项目
exports.joinProject = async (req, res) => {
    const userId = req.userId; 
    const { id: projectId } = req.params;

    try {
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).send({ message: '项目不存在' });

        if (project.members.includes(userId)) {
            return res.status(400).send({ message: '您已经是项目成员' });
        }

        project.members.push(userId);
        await project.save();

        res.status(200).send({ success: true, message: '加入成功' });
    } catch (error) {
        res.status(500).send({ success: false, message: '服务器错误' });
    }
};

// 用户申请加入项目
exports.applyForProject = async (req, res) => {
  try {
    console.log('Request details:', req.params, req.body);
    const userId = req.user? req.user._id : null;
    const { id: projectId } = req.params;
    const { message } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).send({ message: '项目不存在' });

    if (!project.applications) {
      project.applications = [];
    }

    const application = { userId, message };
    project.applications.push(application);
    await project.save();

    res.status(200).send({ success: true, message: '申请成功' });
  } catch (error) {
    console.error('Error applying for project:', error);
    res.status(500).send({ success: false, message: '服务器错误' });
  }
};

// 获取聊天历史记录
exports.getChatHistory = async (req, res) => {
    const { id: projectId } = req.params;
    try {
        const messages = await Message.find({ projectId }).sort({ timestamp: 1 });
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send({ message: '获取历史记录失败' });
    }
};

// 删除项目
exports.deleteProject = async (req, res) => {
    const userId = req.user._id;
    const { id: projectId } = req.params;

    try {
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).send({ message: '项目不存在' });

        if (project.createdBy.toString() !== userId) {
            return res.status(403).send({ message: '您没有权限删除该项目' });
        }

        await Project.findByIdAndDelete(projectId);
        res.status(200).send({ success: true, message: '项目已删除' });
    } catch (error) {
        res.status(500).send({ success: false, message: '服务器错误' });
    }
};

// 更新项目（需要认证）
exports.updateProject = async (req, res) => {
    const { title, description, requirements } = req.body;

    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).send({ message: '项目不存在' });
        }

        if (project.createdBy.toString() !== req.user._id) {
            return res.status(403).send({ message: '您无权编辑此项目' });
        }

        project.title = title;
        project.description = description;
        project.requirements = requirements;
        await project.save();

        res.status(200).json(project);
    } catch (error) {
        res.status(500).send({ message: '服务器错误，编辑项目失败', error: error.message });
    }
};

// 用户退出项目
exports.leaveProject = async (req, res) => {
    const userId = req.userId;
    const { id: projectId } = req.params;

    try {
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).send({ message: '项目不存在' });

        if (!project.members.includes(userId)) {
            return res.status(400).send({ message: '您不是该项目成员' });
        }

        project.members = project.members.filter(member => member.toString() !== userId);
        await project.save();

        res.status(200).send({ success: true, message: '已退出项目' });
    } catch (error) {
        res.status(500).send({ success: false, message: '服务器错误' });
    }
};

// 保存消息到数据库
exports.saveMessage = async (projectId, userId, username, text) => {
    const message = new Message({
        projectId,
        userId,
        username,
        text
    });
    await message.save();
};

// 导出所有函数
module.exports = {
    createProject: exports.createProject,
    joinProject: exports.joinProject,
    applyForProject: exports.applyForProject,
    getChatHistory: exports.getChatHistory,
    deleteProject: exports.deleteProject,
    updateProject: exports.updateProject,
    leaveProject: exports.leaveProject,
    saveMessage: exports.saveMessage
};