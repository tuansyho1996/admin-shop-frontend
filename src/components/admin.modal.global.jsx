import { Dialog } from "@mui/material";
import { useState, useEffect } from "react";
import { createGlobal, updateGlobal } from "../services/service.global";
import { toast } from "react-toastify";

const AdminModalGlobal = ({ open, setOpen, global, globals, setGlobals }) => {
    const [globalName, setGlobalName] = useState("");
    const [globalValue, setGlobalValue] = useState("");
    useEffect(() => {
        if (global) {
            setGlobalName(global.global_name);
            setGlobalValue(global.global_value);
        }
    }, [global, open]);

    const handleClose = () => {
        setOpen(false);
        setGlobalName("");
        setGlobalValue("");
    }

    const handleCreateGlobal = async () => {
        // Logic to create a Global
        const response = await createGlobal({ global_name: globalName, global_value: globalValue });
        if (response.status === 201) {
            // Handle success (e.g., show a success message, refresh the Global list, etc.)
            setGlobals([...globals, response.metadata]);
            setGlobalName("");
            setGlobalValue("");
            toast.success("Global created successfully");
            handleClose();
        }
        else {
            // Handle error (e.g., show an error message)
            console.error("Error creating Global");
        }
    }
    const handleUpdateGlobal = async () => {
        const response = await updateGlobal(global._id, {
            global_name: globalName,
            global_value: globalValue
        });
        if (response.status === 200) {
            const updated = globals.map(item =>
                item._id === global._id ? response.metadata : item
            );
            setGlobals(updated);
            toast.success("Global updated successfully");
            handleClose();
        } else {
            toast.error("Error updating Global");
        }
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <div className="p-4">
                <h2 className="text-lg font-semibold">{global ? "Edit Global" : "Create Global"}</h2>
                <input
                    type="text"
                    placeholder="Global Name"
                    value={globalName}
                    onChange={(e) => setGlobalName(e.target.value)}
                    className="border p-2 w-full mb-4"
                />
                <input
                    type="text"
                    placeholder="Global Link"
                    value={globalValue}
                    onChange={(e) => setGlobalValue(e.target.value)}
                    className="border p-2 w-full mb-4"
                />
                <button
                    onClick={global ? handleUpdateGlobal : handleCreateGlobal}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {global ? "Update Global" : "Create Global"}
                </button>
            </div>
        </Dialog>
    );
}

export default AdminModalGlobal;