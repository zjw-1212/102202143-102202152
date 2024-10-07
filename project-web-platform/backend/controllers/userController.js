// 获取用户个人信息
exports.getProfile = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const user = await User.findById(userId).select('-password');
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: '服务器错误' });
    }
  };
  