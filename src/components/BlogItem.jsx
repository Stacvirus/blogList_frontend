function Item({ blog, deleteItem }) {

    function delBlog() {
        return deleteItem(blog.id);
    }

    return (
        <li>{blog.title}, {blog.author} <button onClick={delBlog}>Delete</button></li>
    )
}

export default Item;