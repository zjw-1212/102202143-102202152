const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server); // 用于实时通信
const PORT = process.env.PORT || 3000;

// 连接 MySQL 数据库
const sequelize = new Sequelize('projectpartner', 'projectuser', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

// 数据模型
const User = sequelize.define('User', {
    major: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    account: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING }
});

const Project = sequelize.define('Project', {
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    requirements: { type: DataTypes.TEXT },
    schedule: { type: DataTypes.STRING },
    maxMembers: { type: DataTypes.INTEGER },
    creator: { type: DataTypes.STRING }
});

const Message = sequelize.define('Message', {
    projectId: { type: DataTypes.INTEGER },
    sender: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT }
});

// 同步数据库
sequelize.sync().then(() => {
    console.log("数据库已同步");
});

// 使用中间件
app.use(cors());
app.use(bodyParser.json());

// 设置静态文件目录 (assets 文件夹，存放CSS, JS等)
app.use(express.static(path.join(__dirname, '../assets')));

// 路由设置
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// 登录页面
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/LoginPage.html'));
});

// 注册页面
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/RegisterPage.html'));
});

// 主页
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/HomePage.html'));
});

// 我的项目
app.get('/myprojects', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/MyProjectsPage.html'));
});

// 项目管理
app.get('/projectmanagement', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/ProjectManagementPage.html'));
});

// 交流协作
app.get('/communication', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/CommunicationPage.html'));
});

// 我的（用户资料）
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/UserProfilePage.html'));
});

// 处理静态资源
app.use(express.static('assets'));
app.use(express.static(path.join(__dirname, '../pages')));

// 用户注册
app.post('/api/register', async (req, res) => {
    const { major, email, username, account, password } = req.body;
    try {
        const newUser = await User.create({ major, email, username, account, password });
        res.send({ message: '注册成功', user: newUser });
    } catch (error) {
        res.status(500).send({ message: '注册失败', error });
    }
});

// 用户登录
app.post('/api/login', async (req, res) => {
    const { account, password } = req.body;
    const user = await User.findOne({ where: { account, password } });
    if (user) {
        res.send({ message: '登录成功', user });
    } else {
        res.status(401).send({ message: '账号或密码错误' });
    }
});

// 发布项目
app.post('/api/projects', async (req, res) => {
    const { title, description, requirements, schedule, maxMembers, creator } = req.body;
    try {
        const newProject = await Project.create({ title, description, requirements, schedule, maxMembers, creator });
        res.send({ message: '项目发布成功', project: newProject });
    } catch (error) {
        res.status(500).send({ message: '发布项目失败', error });
    }
});

// 获取项目列表
app.get('/api/projects', async (req, res) => {
    const projects = await Project.findAll();
    res.send(projects);
});

// 实时消息获取
io.on('connection', (socket) => {
    console.log('新用户已连接');

    socket.on('joinProject', (projectId) => {
        socket.join(projectId);
        console.log(`用户已加入项目 ${projectId}`);
    });

    socket.on('message', async (msg) => {
        const { projectId, sender, content } = msg;
        const newMessage = await Message.create({ projectId, sender, content });

        // 将消息发送给项目组的所有成员
        io.to(projectId).emit('message', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('用户已断开连接');
    });
});

// 启动服务器
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
