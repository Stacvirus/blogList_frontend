import { useEffect, useState } from "react";
import Item from "./BlogItem";
import AddBlog from "./AddBlog";
import serverData from './Server';
import LoginForm from "./Login";
import Notification from "./Notifications";

function Blogs() {
    const [blogs, setBlogs] = useState();
    const [user, setUser] = useState(null);
    const [notTxt, setNotTxt] = useState();

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
                setBlogs(res);
            })
    }

    const handleDelete = async (item) => {
        await serverData.deleteBlog(item);
        fetchBlogs();
    }

    const handleSaveBlogs = async (blogObject) => {
        try {
            await serverData.addBlog(blogObject);
            fetchBlogs();
            setNotTxt({
                text: `new blog created, ${blogObject.title}`,
                clr: 'green'
            })
            removeNofication();
        } catch (error) {
            setNotTxt({
                text: `${error.response.data.error}`,
                clr: 'red'
            })
            removeNofication();
        }
    }

    const handleLogin = async (userInfos) => {
        try {
            const userToken = (await serverData.userLogin(userInfos));
            window.localStorage.setItem('loggedInUser', JSON.stringify(userToken));
            setUser(userToken);
            serverData.setToken(userToken.token);
        } catch (error) {
            console.error(error.message);
            setNotTxt({ text: error.response.data.error, clr: 'red' });
            removeNofication();
            setUser(null)
        }
    }

    function showLogin() {
        return <LoginForm login={handleLogin} />
    }

    function showAddBlogs() {
        return <AddBlog Save={handleSaveBlogs} />
    }

    function handleLogout() {
        window.localStorage.removeItem('loggedInUser');
    }

    function showNotification({ text, clr }) {
        return (
            <Notification text={text} color={clr} />
        )
    }

    function removeNofication() {
        setTimeout(() => {
            setNotTxt(null)
        }, 2000);
    }

    return (
        <div>
            {
                notTxt && showNotification(notTxt)

            }
            {!user && showLogin()}
            {user && showAddBlogs()}
            <h1>Blogs</h1>
            <ul>
                {
                    blogs && blogs.map(b => <Item key={b.id} blog={b} deleteItem={handleDelete} />)
                }
            </ul>
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Blogs;
