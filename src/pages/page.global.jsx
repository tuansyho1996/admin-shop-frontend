import AdminModalGlobal from "../components/admin.modal.global"
import { useState, useEffect } from "react";
import { getGlobal, deleteGlobal } from "../services/service.global";

const Global = () => {
    const [globals, setGlobals] = useState([]);
    const [open, setOpen] = useState(false);
    const [global, setGlobal] = useState(null);
    useEffect(() => {
        const fetchGlobals = async () => {
            const res = await getGlobal('all');
            if (res.status === 200) {
                setGlobals(res?.metadata);
            } else {
                console.error("Error fetching Globals");
            }
            // Fetch Globals from the server
        }
        fetchGlobals();
    }, [])
    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this Global?");
        if (confirm) {
            // Call the delete Global function here
            // If successful, update the state to remove the deleted Global
            const res = await deleteGlobal(id);
            if (res.status === 200) {
                // Handle success (e.g., show a success message, refresh the Global list, etc.)
                // setGlobals(globals.filter((global) => global._id !== id));
                setGlobals(globals.filter((global) => global._id !== id));
                toast.success("Global deleted successfully");
            }
        }
    }
    return (
        <div className='w-full ml-2'>
            <h1>PAGE Global</h1>
            <button className='bg-blue-500 text-white p-2 rounded-lg my-5' onClick={() => { setGlobal(null); setOpen(true); }}>
                Create Global
            </button>
            <AdminModalGlobal open={open} setOpen={setOpen} global={global} setGlobal={setGlobal} globals={globals} setGlobals={setGlobals} />
            <table className='w-full border-collapse border border-slate-500' width="100%">
                <thead>
                    <tr>
                        <th className='border border-slate-600'>Global Name</th>
                        <th className='border border-slate-600'>Global Value</th>
                        <th className='border border-slate-600'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map through Globals here */}
                    {
                        globals?.map((global) => (
                            <tr key={global._id} className='border border-slate-600'>
                                <td className='border border-slate-600'>{global.global_name}</td>
                                <td className='border border-slate-600'>{global.global_value}</td>
                                <td className='border border-slate-600'>
                                    <button className='bg-blue-500 text-white p-2 rounded-lg' onClick={() => { setGlobal(global); setOpen(true); }}>
                                        Edit
                                    </button>
                                    <button className='bg-red-500 text-white p-2 rounded-lg ml-2' onClick={() => handleDelete(global._id)}>
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

export default Global