import AdminModalCreateBlog from "../components/admin.modal.create.blog";
import { useEffect, useState } from "react";
import { getBlog, deleteBlog } from "../services/service.blog";
import { toast } from "react-toastify";
const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [editingBlog, setEditingBlog] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await getBlog('all');
            if (res.status === 200) {
                setBlogs(res?.metadata);
            } else {
                console.error("Error fetching blogs");
            }
        }
        fetchBlogs();
    }, [])
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            const res = await deleteBlog(id);
            if (res.status === 200) {
                setBlogs(blogs.filter(blog => blog._id !== id));
                toast.success("Blog deleted successfully");
            } else {
                toast.error("Error deleting blog");
            }
        }
    }
    return (
        <div className="w-full ml-2">
            <h1 className="text-4xl font-bold">Blog Page</h1>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setOpen(true)}>
                Create New Post
            </button>
            <AdminModalCreateBlog open={open} setOpen={setOpen}
                blogs={blogs} setBlogs={(newblogs) => setBlogs(newblogs)}
                editingBlog={editingBlog}
                setEditingBlog={setEditingBlog}
            />
            <div className="mt-4 w-full">
                <h2 className="text-2xl font-semibold">Recent Posts</h2>
                <table className="w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-r">Title</th>
                            <th className="py-2 px-4 border-b border-r">Content</th>
                            <th className="py-2 px-4 border-b border-r">Image</th>
                            <th className="py-2 px-4 border-b border-r">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs?.map((blog) => (
                            <tr key={blog._id} className="border-r">
                                <td className="py-2 px-4 border-b border-r">{blog.blog_title}</td>
                                <td className="py-2 px-4 border-b border-r">{blog.blog_content}</td>
                                <td className="py-2 px-4 border-b border-r">
                                    <img src={blog.blog_image} alt={blog.blog_title} className="w-16 h-16" />
                                </td>
                                <td className="py-2 px-4 border-b border-r">
                                    <button className="px-2 py-1 bg-red-500 text-white rounded mr-2" onClick={() => handleDelete(blog._id)}>Delete</button>
                                    <button className="px-2 py-1 bg-yellow-500 text-white rounded"
                                        onClick={() => {
                                            setEditingBlog(blog);
                                            setOpen(true);
                                        }}
                                    >Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default Blog