const User = require('../models/User'); // 引入用户模型
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/project-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 用户注册
exports.register = async (req, res) => {
  const { username, email, password, major } = req.body;

  // 检查是否所有字段都存在
  if (!username || !email || !password || !major) {
    return res.status(400).json({ message: '请填写完整的注册信息' });
  }

  try {
    // 检查用户是否已存在
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '该邮箱已被注册' });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const user = new User({ username, email, major, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: '用户注册成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '注册失败，服务器错误' });
  }
};


// 用户登录
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 检查用户是否存在
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '用户不存在，请先注册' });
    }

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '密码错误' });
    }

    // 生成JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '3h' } // 令牌1小时后过期
    );

    // 返回JWT和用户信息
    res.status(200).json({ 
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        major: user.major
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '登录失败，服务器错误' });
  }
};
