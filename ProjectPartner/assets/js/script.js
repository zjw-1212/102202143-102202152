// 处理用户注册
document.getElementById('registerForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== document.getElementById('confirmPassword').value) {
        alert('两次密码输入不一致');
        return;
    }

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            alert('注册成功');
            window.location.href = '/login';
        } else {
            alert(result.message || '注册失败');
        }
    } catch (error) {
        console.error('注册失败', error);
    }
});

// 处理用户登录
document.getElementById('loginForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            alert('登录成功');
            window.location.href = '/home';
        } else {
            alert(result.message || '登录失败');
        }
    } catch (error) {
        console.error('登录失败', error);
    }
});


// 使用 socket.io 客户端
const socket = io();

// 加入项目聊天室
function joinProjectChat(projectId) {
    socket.emit('joinProject', projectId);
}

// 发送消息
function sendMessage(projectId, sender, content) {
    socket.emit('message', { projectId, sender, content });
}

// 接收消息
socket.on('message', (message) => {
    // 将消息显示在聊天框中
    const chatBox = document.getElementById('chat-box');
    const newMessage = document.createElement('p');
    newMessage.textContent = `${message.sender}: ${message.content}`;
    chatBox.appendChild(newMessage);
});

// 提交发布项目表单
document.getElementById('projectForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const requirements = document.getElementById('requirements').value;
    const schedule = document.getElementById('schedule').value;
    const maxMembers = document.getElementById('maxMembers').value;
    const creator = document.getElementById('creator').value;

    const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, requirements, schedule, maxMembers, creator })
    });

    const result = await response.json();
    if (response.ok) {
        alert('项目发布成功');
    } else {
        alert('项目发布失败');
    }
});

