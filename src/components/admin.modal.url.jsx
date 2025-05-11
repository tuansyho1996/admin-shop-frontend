import { Dialog } from "@mui/material";

const AdminModalUrl = ({ open, setOpen, url, setUrl }) => {
    const [urlName, setUrlName] = useState("");
    const [urlLink, setUrlLink] = useState("");

    const handleClose = () => {
        setOpen(false);
        setUrlName("");
        setUrlLink("");
    }

    const handleCreateUrl = async () => {
        // Logic to create a URL
        const response = await createUrl({ url_name: urlName, url_link: urlLink });
        if (response.status === 201) {
            // Handle success (e.g., show a success message, refresh the URL list, etc.)
            setUrl([...url, response.metadata]);
            setUrlName("");
            setUrlLink("");
            toast.success("URL created successfully");
            handleClose();
        }
        else {
            // Handle error (e.g., show an error message)
            console.error("Error creating URL");
        }
    }
    const handleUpdateUrl = async () => {
        const response = await updateUrl(url._id, {
            url_name: urlName,
            url_link: urlLink
        });
        if (response.status === 200) {
            const updated = url.map(url =>
                url._id === url._id ? response.metadata : url
            );
            setUrl(updated);
            toast.success("URL updated successfully");
            handleClose();
        } else {
            toast.error("Error updating URL");
        }
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <div className="p-4">
                <h2 className="text-lg font-semibold">{url ? "Edit URL" : "Create URL"}</h2>
                <input
                    type="text"
                    placeholder="URL Name"
                    value={urlName}
                    onChange={(e) => setUrlName(e.target.value)}
                    className="border p-2 w-full mb-4"
                />
                <input
                    type="text"
                    placeholder="URL Link"
                    value={urlLink}
                    onChange={(e) => setUrlLink(e.target.value)}
                    className="border p-2 w-full mb-4"
                />
                <button
                    onClick={url ? handleUpdateUrl : handleCreateUrl}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {url ? "Update URL" : "Create URL"}
                </button>
            </div>
        </Dialog>
    );
}

export default AdminModalUrl;