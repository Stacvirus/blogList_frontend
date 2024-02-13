import { useEffect, useState } from "react";
import Item from "./BlogItem";
import AddBlog from "./AddBlog";
import serverData from './Server';
import LoginForm from "./Login";

function Blogs() {
    const [blogs, setBlogs] = useState();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null)

    useEffect(fetchBlogs, []);

    function fetchBlogs() {
        serverData.getAllblogs()
            .then(res => {
                console.log(res)
                setBlogs(res);
            })
    }

    const handleDelete = async (item) => {
        await serverData.deleteBlog(item);
        fetchBlogs();
    }

    const handleSaveBlogs = async (blogObject) => {
        await serverData.addBlog(blogObject);
        fetchBlogs();
    }

    const handleLogin = async (userInfos) => {
        const User = await serverData.userLogin(userInfos);
        setUser(User);
        setToken(user.token);
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm login={handleLogin} />
            <AddBlog Save={handleSaveBlogs} />
            <h1>Blogs</h1>
            <ul>
                {
                    blogs && blogs.map(b => <Item key={b.id} blog={b} deleteItem={handleDelete} />)
                }
            </ul>
        </div>
    )
}

export default Blogs;
