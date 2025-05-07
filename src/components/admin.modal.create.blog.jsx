import { Dialog } from "@mui/material";

const AdminModalCreateBlog = ({ open, handleClose }) => {
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
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Blog Title"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            id="content"
                            rows="4"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Blog Content"
                        ></textarea>
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
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Create Blog
                        </button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}
export default AdminModalCreateBlog;