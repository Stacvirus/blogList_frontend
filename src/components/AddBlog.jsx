import { useState } from "react"

function AddBlog({ Save }) {

    const [blogInfos, setBlogInfos] = useState({
        title: '',
        author: '',
        url: '',
        likes: ''
    });

    function saveblog(e) {
        e.preventDefault();
        Save(blogInfos);
        setBlogInfos({
            title: '',
            author: '',
            url: '',
            likes: ''
        });
    }

    return (
        <div>
            <h1>Add blogs</h1>
            <form onSubmit={saveblog}>
                title
                <input
                    type="text"
                    name="title"
                    value={blogInfos.title}
                    onChange={({ target }) => setBlogInfos({ ...blogInfos, title: target.value })}
                /> <br />
                author
                <input
                    type="text"
                    name="author"
                    value={blogInfos.author}
                    onChange={({ target }) => setBlogInfos({ ...blogInfos, author: target.value })}
                /><br />
                url
                <input
                    type="text"
                    name="url"
                    value={blogInfos.url}
                    onChange={({ target }) => setBlogInfos({ ...blogInfos, url: target.value })}
                /><br />
                likes
                <input
                    type="text"
                    name="likes"
                    value={blogInfos.likes}
                    onChange={({ target }) => setBlogInfos({ ...blogInfos, likes: target.value })}
                /><br />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default AddBlog;