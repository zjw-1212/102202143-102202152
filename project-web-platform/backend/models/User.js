const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// 用户模型定义
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  major: { type: String, required: true }
});

// 静态方法用于加密密码
userSchema.statics.hashPassword = async function(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// 实例方法用于验证密码
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
