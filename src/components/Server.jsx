import axios from "axios";
const baseUrl = 'http://localhost:3000/api/blogs'
const loginUrl = 'http://localhost:3000/api/login'
let token = null

//user request functions

function setToken(userToken) {
    token = `Bearer ${userToken}`
}

const userLogin = async (userCredentials) => {
    const req = await axios.post(loginUrl, userCredentials);
    return req.data;
}


//blogs request functions

const getAllblogs = async () => {
    const req = await axios.get(baseUrl);
    return req.data;
}

const deleteBlog = async (id) => {
    const req = await axios.delete(`${baseUrl}/${id}`);
    return req.data;
}

const addBlog = async (blog) => {
    const config = { headers: { Authorization: token } }
    const req = await axios.post(baseUrl, blog, config);
    return req.data;
}

const updateBlog = async (blog) => {
    const req = await axios.put(baseUrl, blog);
    return req.data
}

export default { getAllblogs, deleteBlog, addBlog, userLogin, setToken, updateBlog };