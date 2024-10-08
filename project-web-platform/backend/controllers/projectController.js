const Project = require('../models/Project');
const User = require('../models/User');
const Message = require('../models/Message');

// 用户加入项目
exports.joinProject = async (req, res) => {
    const userId = req.user._id;
    const { id: projectId } = req.params;
  
    try {
      const project = await Project.findById(projectId);
      if (!project) return res.status(404).send({ message: '项目不存在' });
  
      if (project.members.includes(userId)) {
        return res.status(400).send({ message: '您已经是项目成员' });
      }
  
      // 添加用户到成员列表
      project.members.push(userId);
      await project.save();
  
      // 通知所有成员更新
      io.to(projectId).emit('updateMembers', project.members);
  
      res.status(200).send({ success: true, message: '加入成功' });
    } catch (error) {
      res.status(500).send({ success: false, message: '服务器错误' });
    }
  };
  
  // 用户退出项目
  exports.leaveProject = async (req, res) => {
    const userId = req.user._id;
    const { id: projectId } = req.params;
  
    try {
      const project = await Project.findById(projectId);
      if (!project) return res.status(404).send({ message: '项目不存在' });
  
      if (!project.members.includes(userId)) {
        return res.status(400).send({ message: '您不是该项目成员' });
      }
  
      // 从成员列表中移除用户
      project.members = project.members.filter(member => member.toString() !== userId);
      await project.save();
  
      // 通知所有成员更新
      io.to(projectId).emit('updateMembers', project.members);
  
      res.status(200).send({ success: true, message: '已退出项目' });
    } catch (error) {
      res.status(500).send({ success: false, message: '服务器错误' });
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

  // 用户申请加入项目
exports.applyForProject = async (req, res) => {
  const userId = req.user._id; // 确保用户信息可用
  const { id: projectId } = req.params;
  const { message } = req.body; // 获取申请理由

  try {
      const project = await Project.findById(projectId);
      if (!project) return res.status(404).send({ message: '项目不存在' });

      // 假设你有一个申请记录模型
      const application = { userId, message }; // 可以改成一个单独的模型
      project.applications.push(application);
      await project.save();

      res.status(200).send({ success: true, message: '申请成功' });
  } catch (error) {
      res.status(500).send({ success: false, message: '服务器错误' });
  }
};
