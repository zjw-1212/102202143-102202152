function RegisterForm() {
    return `
        <form id="registerForm">
            <input type="text" placeholder="专业" required>
            <input type="email" placeholder="邮箱" required>
            <input type="text" placeholder="用户名" required>
            <input type="text" placeholder="账号" required>
            <input type="password" placeholder="密码" required>
            <input type="password" placeholder="确认密码" required>
            <button type="submit">注册</button>
            <p>已有账户？<a href="LoginPage.html">登录</a></p>
        </form>
    `;
}
