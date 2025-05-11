import AdminModalUrl from "../components/admin.modal.url"
import { useState } from "react";

const Url = () => {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState(null);


    return (
        <div>
            <h1>PAGE URL</h1>
            <button className='bg-blue-500 text-white p-2 rounded-lg'>
                Create URL
            </button>
            <AdminModalUrl open={open} setOpen={setOpen} url={url} setUrl={setUrl} />
            <table className='w-full border-collapse border border-slate-500' width="100%">
                <thead>
                    <tr>
                        <th className='border border-slate-600'>URL</th>
                        <th className='border border-slate-600'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map through URLs here */}
                    <tr className='border border-slate-600'>
                        <td className='border border-slate-600'>example.com</td>
                        <td className='border border-slate-600'>
                            <button className='bg-red-500 text-white p-2 rounded-lg'>
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Url