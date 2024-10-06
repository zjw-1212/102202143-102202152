function LoginForm() {
    return `
        <form id="loginForm">
            <input type="text" placeholder="账号" required>
            <input type="password" placeholder="密码" required>
            <button type="submit">登录</button>
            <p>还没有账户？<a href="RegisterPage.html">注册</a></p>
        </form>
    `;
}
