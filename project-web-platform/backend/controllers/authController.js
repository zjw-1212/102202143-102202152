const User = require('../models/User'); // 引入用户模型
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 用户注册
exports.register = async (req, res) => {
  const { username, email, password, major } = req.body;

  try {
    // 检查用户是否已存在
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '用户已存在' });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 创建新用户
    const user = new User({ username, email, password: hashedPassword, major });
    await user.save();

    res.status(201).json({ message: '用户注册成功' });
  } catch (error) {
    res.status(500).json({ message: '注册失败' });
  }
};

// 用户登录
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '用户不存在' });
    }

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '密码错误' });
    }

    // 生成JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: '登录失败' });
  }
};
