import AdminModalCreateBlog from "../components/admin.modal.create.blog";
import { useState } from "react";
const Blog = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Blog Page</h1>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Create New Post
            </button>
            <AdminModalCreateBlog open={false} handleClose={() => { }} />
            <div className="mt-4">
                <h2 className="text-2xl font-semibold">Recent Posts</h2>
                <ul className="list-disc list-inside">
                    <li>Post 1</li>
                    <li>Post 2</li>
                    <li>Post 3</li>
                </ul>
            </div>
        </div>
    );
}
export default Blog;