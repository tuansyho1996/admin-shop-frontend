import { useState, useRef, useEffect } from "react";
import { Modal } from "@mui/material";
import { Box, Button, Typography } from "@mui/material";
import { uploadImageToS3, uploadManyImage } from "../../services/service.media"; //

const ModalUpload = ({ open, onClose, isUploadMany, setImages }) => {
    const formRef = useRef(null);
    const inputRef = useRef(null);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && formRef.current) {
                e.preventDefault();
                formRef.current.requestSubmit(); // Gọi submit trên form
            }
            if (e.key === 'Shift' && inputRef.current) {
                e.preventDefault();
                inputRef.current.click(); // Kích hoạt input file
            }
        };

        if (open) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [open]);
    // Handle image creation
    const handleCreateImage = async (event) => {
        event.preventDefault();
        if (!isUploadMany) {
            const fileInput = event.target.image.files[0];
            if (fileInput) {
                const res = await uploadImageToS3(fileInput)
                if (res?.status === 201) {
                    setImages((prevImages) => [res.metadata, ...prevImages]);
                    onClose();
                }
            }
        }
        else {
            const fileImages = Array.from(event.target.images.files)
            if (fileImages) {
                const res = await uploadManyImage(fileImages)
                if (res?.status === 201) {
                    setImages((prevImages) => [...res.metadata, ...prevImages]);
                    onClose();
                }
            }
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            {
                !isUploadMany
                    ?
                    <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-lg w-full max-w-md">

                        <Typography variant="h6" gutterBottom>
                            Upload New Image
                        </Typography>
                        <form onSubmit={handleCreateImage}>
                            <input
                                type="file"
                                accept="image/*"
                                name="image"
                                className="block w-full border border-gray-300 rounded p-2"
                                required
                                ref={inputRef}
                            />
                            <Button type="submit" sx={{ marginTop: '10px' }} variant="contained" color="primary" className="mt-4">
                                Upload
                            </Button>
                        </form>
                    </Box>
                    :
                    <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-lg w-full max-w-md">

                        <Typography variant="h6" gutterBottom>
                            Upload Many Image
                        </Typography>
                        <form onSubmit={handleCreateImage} ref={formRef}>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                name="images"
                                className="block w-full border border-gray-300 rounded p-2"
                                required
                                ref={inputRef}
                            />
                            <Button type="submit" sx={{ marginTop: '10px' }} variant="contained" color="primary" className="mt-4">
                                Upload Many Image
                            </Button>
                        </form>
                    </Box>
            }

        </Modal>
    );
}
export default ModalUpload;