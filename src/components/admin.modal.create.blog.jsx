import { Dialog } from "@mui/material";
import { useState, useEffect } from "react";
import { createBlog, updateBlog } from "../services/service.blog";
import { toast } from "react-toastify";

const AdminModalCreateBlog = ({ open, setOpen, blogs, setBlogs, editingBlog, setEditingBlog }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState('');
    useEffect(() => {
        if (editingBlog) {
            setTitle(editingBlog.blog_title || "");
            setContent(editingBlog.blog_content || "");
            setImage(editingBlog.blog_image || "");
        } else {
            setTitle("");
            setContent("");
            setImage("");
        }
    }, [editingBlog]);
    const handleClose = () => {
        setOpen(false);
        setTitle("");
        setContent("");
        setImage("");
        setEditingBlog(null);
    }
    const handleCreateBlog = async () => {
        // Logic to create a blog post
        const response = await createBlog({ blog_title: title, blog_content: content, blog_image: image, editingBlog, setEditingBlog });
        if (response.status === 201) {
            // Handle success (e.g., show a success message, refresh the blog list, etc.)
            setBlogs([...blogs, response.metadata]);
            setTitle("");
            setContent("");
            setImage("");
            toast.success("Blog created successfully");
            handleClose();
        }
        else {
            // Handle error (e.g., show an error message)
            console.error("Error creating blog");
        }
    }
    const handleUpdateBlog = async () => {
        const response = await updateBlog(editingBlog._id, {
            blog_title: title,
            blog_content: content,
            blog_image: image
        });
        if (response.status === 200) {
            const updated = blogs.map(blog =>
                blog._id === editingBlog._id ? response.metadata : blog
            );
            setBlogs(updated);
            toast.success("Blog updated successfully");
            setEditingBlog(null);
            handleClose();
        } else {
            toast.error("Error updating blog");
        }
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            className="bg-white"
        >
            <div className="p-4">
                <h2 className="text-xl font-bold">Create Blog</h2>
                {/* input title */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Blog Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                {/* input content */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <textarea
                        id="content"
                        rows="4"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Blog Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                {/* input image */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image
                    </label>
                    <input
                        type="text"
                        id="image"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => (editingBlog ? handleUpdateBlog() : handleCreateBlog())}
                    >
                        {editingBlog ? "Update Blog" : "Create Blog"}
                    </button>
                </div>
            </div>
        </Dialog>
    );
}
export default AdminModalCreateBlog;