import AdminModalUrl from "../components/admin.modal.url"
import { useState, useEffect } from "react";
import { getUrl } from "../services/service.url";

const Url = () => {
    const [urls, setUrls] = useState([]);
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState(null);
    useEffect(() => {
        const fetchUrls = async () => {
            const res = await getUrl('all');
            if (res.status === 200) {
                setUrls(res?.metadata);
            } else {
                console.error("Error fetching URLs");
            }
            // Fetch URLs from the server
        }
        fetchUrls();
    }, [])

    return (
        <div className='w-full ml-2'>
            <h1>PAGE URL</h1>
            <button className='bg-blue-500 text-white p-2 rounded-lg' onClick={() => { setUrl(null); setOpen(true); }}>
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
                    {
                        urls?.map((url) => (
                            <tr key={url._id} className='border border-slate-600'>
                                <td className='border border-slate-600'>{url.url_name}</td>
                                <td className='border border-slate-600'>
                                    <button className='bg-blue-500 text-white p-2 rounded-lg' onClick={() => { setUrl(url); setOpen(true); }}>
                                        Edit
                                    </button>
                                    <button className='bg-red-500 text-white p-2 rounded-lg ml-2'>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Url