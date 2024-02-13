import { useEffect, useState } from "react";
import Item from "./BlogItem";
import AddBlog from "./AddBlog";
import serverData from './Server';
import LoginForm from "./Login";

function Blogs() {
    const [blogs, setBlogs] = useState();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    //useeffect to fetch all blogs at init period
    useEffect(fetchBlogs, []);

    //useeffect to get the user infos from localstorage at init peroid
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedInUser');
        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            setUser(user);
            serverData.setToken(user.token);
        }
    }, []);

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
        try {
            const userToken = (await serverData.userLogin(userInfos));
            window.localStorage.setItem('loggedInUser', JSON.stringify(userToken));
            setUser(userToken);
            setToken(userToken.token);
            serverData.setToken(userToken.token);
        } catch (error) {
            console.error('login failed!');
            setUser(null)
        }
    }

    function showLogin() {
        return <LoginForm login={handleLogin} />
    }

    function showAddBlogs() {
        return <AddBlog Save={handleSaveBlogs} />
    }

    return (
        <div>
            {!user && showLogin()}
            {user && showAddBlogs()}
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
