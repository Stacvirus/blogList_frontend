import { useState } from "react"

function LoginForm({ login }) {

    const [userInfos, setUserInfos] = useState({
        username: '',
        password: ''
    })

    function handleLogin(e) {
        e.preventDefault();
        login(userInfos);
        setUserInfos({
            username: '',
            password: ''
        });
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                username
                <input
                    type="text"
                    name="username"
                    value={userInfos.username}
                    onChange={({ target }) => setUserInfos({ ...userInfos, username: target.value })}
                /> <br />
                password
                <input
                    type="password"
                    name="password"
                    value={userInfos.password}
                    onChange={({ target }) => setUserInfos({ ...userInfos, password: target.value })}
                /> <br />
                <button type="submit">login</button>
            </form>
        </>
    )
}

export default LoginForm;
