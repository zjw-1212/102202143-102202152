const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const Message = require('./models/Message');
const ProjectController = require('./controllers/projectController');
require('dotenv').config();
// 路由
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');  // 引入 user 路由

const app = express();
const server = http.createServer(app);

// 动态处理多个来源
const allowedOrigins = ['http://localhost:8080', 'http://127.0.0.1:808','http://10.133.11.9:8080'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true  // 允许携带凭证
}));

app.use(express.json());

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);  // 使用 user 路由

// 数据库连接
mongoose.connect('mongodb://localhost:27017/project-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => console.log('MongoDB connected'));

// WebSocket 实时消息处理
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,  // 允许多个来源
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('新用户连接');
  
  socket.on('joinProject', (projectId) => {
    socket.join(projectId);
  });



  socket.on('disconnect', () => {
    console.log('用户断开连接');
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
