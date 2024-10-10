// 获取用户个人信息
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/project-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});


exports.getProfile = async (req, res) => {
    const userId = req.userId;

    try {
      const user = await User.findById(userId).select('-password');
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: '服务器错误' });
    }
  };
  