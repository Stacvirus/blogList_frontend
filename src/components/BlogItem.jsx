import { func } from "prop-types";
import { useState } from "react";

function Item({ blog, deleteItem, addLikes, user }) {

    const [btnLabel, setBtnLabel] = useState('view');
    const [show, setShow] = useState(false);

    const blogStyles = {
        padding: '10px 0 0 2px',
        border: '1px solid',
        marginBottom: '5px'
    }

    const listStyles = {
        display: show ? '' : 'none'
    }

    function delBlog() {
        return deleteItem(blog);
    }

    function handleView() {
        setShow(!show);
        btnLabel === 'view' ? setBtnLabel('hide') : setBtnLabel('view');
    }

    function handleLike() {
        addLikes(blog);
    }

    const delBtnStyles = { display: user === blog.user.username ? '' : 'none' }

    return (
        <div style={blogStyles}>
            <li>{blog.title}, {blog.author} <button onClick={handleView}>{btnLabel}</button></li>
            <ul style={listStyles}>
                <li>{blog.url}</li>
                <li>{blog.likes} <button onClick={handleLike}>like</button></li>
                <li>{blog.user.username}</li>
                <button onClick={delBlog} style={delBtnStyles}>remove</button>
            </ul>
        </div>
    )
}

export default Item;