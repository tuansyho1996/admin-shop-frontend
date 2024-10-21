'use client'
import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Typography, IconButton } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { uploadImageToS3, getImgs, deleteImg } from '../services/service.media';

export default function Media() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  //Fetch Images
  useEffect(() => {
    fetchImages()
  }, [])
  const fetchImages = async () => {
    const res = await getImgs()
    if (res.status === 200) {
      setImages(res.metadata)
    }
  }s
  // Modal handlers
  const handleCreateModalOpen = () => setOpenCreateModal(true);
  const handleCreateModalClose = () => setOpenCreateModal(false);

  const handleDeleteModalOpen = (image) => {
    setSelectedImage(image);
    setOpenDeleteModal(true);
  };
  const handleDeleteModalClose = () => setOpenDeleteModal(false);

  // Handle image creation
  const handleCreateImage = async (event) => {
    event.preventDefault();
    const fileInput = event.target.image.files[0];
    if (fileInput) {
      const res = await uploadImageToS3(fileInput)
      if (res.status === 201) {
        setImages((prevImages) => [...prevImages, res.metadata]);
        handleCreateModalClose();
      }
    }
  };

  // Handle image deletion
  const handleDeleteImage = async () => {
    const res = await deleteImg(selectedImage._id)
    if (res.status === 200) {
      setImages(images.filter((img) => img._id !== selectedImage._id));
      setOpenDeleteModal(false);
    }
  };

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>
        Admin Image Manager
      </Typography>

      {/* Create Image Button */}
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateModalOpen}>
        Upload New Image
      </Button>

      {/* List of Images */}
      <div className="grid grid-cols-12 gap-4 gap-4 mt-6">
        {images.length === 0 && <Typography>No images uploaded yet.</Typography>}
        {images.map((image) => (
          <div key={image._id} className="relative group">
            <img src={image.media_path} className="w-auto h-auto max-h-40 rounded" />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
              <IconButton color="secondary" onClick={() => handleDeleteModalOpen(image)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>

      {/* Create Image Modal */}
      <Modal open={openCreateModal} onClose={handleCreateModalClose}>
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
            />
            <Button type="submit" variant="contained" color="primary" className="mt-4">
              Upload
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={handleDeleteModalClose}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-lg w-full max-w-md">
          <Typography variant="h6" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography>
            Are you sure you want to delete the image <strong>{selectedImage?.name}</strong>?
          </Typography>
          <div className="flex justify-end space-x-4 mt-4">
            <Button onClick={handleDeleteModalClose}>Cancel</Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteImage}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
