'use client'
import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Typography, IconButton } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { uploadImageToS3, getImgs, deleteImg, uploadManyImage } from '../services/service.media';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Media() {
  const { page } = useParams();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeleteMultipleModal, setOpenDeleteMultipleModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [isUploadMany, setIsUploadMany] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [pages, setPages] = useState(0)
  const [cPages, setcPages] = useState(0)


  //Fetch Images
  useEffect(() => {
    const fetchImages = async () => {
      const res = await getImgs(page)
      if (res?.status === 200) {
        const { images, totalPages, currentPage } = res.metadata
        setImages(images)
        setPages(totalPages)
        setcPages(currentPage)
      }
    }
    fetchImages()
  }, [page])

  // Modal handlers
  const handleCreateModalOpen = (type) => {
    if (type === 'upload multiple') {
      setIsUploadMany(true)
      setOpenCreateModal(true)
    }
    else {
      setOpenCreateModal(true)
    }
  };
  const handleCreateModalClose = () => {
    setIsUploadMany(false)
    setOpenCreateModal(false)
  };
  const handleDeleteModalOpen = (image) => {
    setSelectedImage(image);
    setOpenDeleteModal(true);
  };
  const handleDeleteModalClose = () => setOpenDeleteModal(false);

  // Handle image creation
  const handleCreateImage = async (event) => {
    event.preventDefault();
    if (!isUploadMany) {
      const fileInput = event.target.image.files[0];
      if (fileInput) {
        const res = await uploadImageToS3(fileInput)
        if (res?.status === 201) {
          setImages((prevImages) => [res.metadata, ...prevImages]);
          handleCreateModalClose();
        }
      }
    }
    else {
      const fileImages = Array.from(event.target.images.files)
      if (fileImages) {
        const res = await uploadManyImage(fileImages)
        if (res?.status === 201) {
          setImages((prevImages) => [...res.metadata, ...prevImages]);
          handleCreateModalClose();
        }
      }
    }
  };

  // Handle image deletion
  const handleDeleteImage = async () => {
    const res = await deleteImg(selectedImage.media_name)
    if (res.status === 200) {
      setImages(images.filter((img) => img.media_name !== selectedImage.media_name));
      setOpenDeleteModal(false);
    }
  };
  const handleCopy = (url) => {
    navigator.clipboard.writeText(url)
    toast.success('Image url copied to clipboard')
  }
  const handleCheckboxChange = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const handleDeleteMultipleImage = async () => {
    const res = await deleteImg(selectedItems)
    if (res.status === 200) {
      setImages(images.filter((img) => !selectedItems.includes(img.media_name)));
      setOpenDeleteMultipleModal(false);
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
      {/* Create many Button */}
      <Button variant="contained" sx={{ marginLeft: '10px' }} startIcon={<AddIcon />} onClick={() => handleCreateModalOpen('upload multiple')}>
        Upload Many Image
      </Button>
      {/* Delete many Image */}
      <Button variant="contained" sx={{ marginLeft: '10px' }} onClick={() => setOpenDeleteMultipleModal(true)}>
        Delete many Image
      </Button>

      {/* List of Images */}
      <div className="grid grid-cols-12 gap-4 gap-4 mt-6">
        {images?.length === 0 && <Typography>No images uploaded yet.</Typography>}
        {images?.map((image) => (
          <div>
            <input
              type="checkbox"
              id={image.media_name}
              value={image.name}
              checked={selectedItems.includes(image.media_name)}
              onChange={() => handleCheckboxChange(image.media_name)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <div key={image._id} className="relative group">
              <img src={image.media_path} className="w-auto h-auto max-h-40 rounded" />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
                <IconButton color="secondary" onClick={() => handleDeleteModalOpen(image)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
            <input value={image.media_path} hidden />
            <button
              onClick={() => handleCopy(image.media_path)}
              className="px-2 py-1 mt-1 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Copy url
            </button>
          </div>
        ))}
      </div>

      {/* Create Image Modal */}
      <Modal open={openCreateModal} onClose={handleCreateModalClose}>
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
              <form onSubmit={handleCreateImage}>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  name="images"
                  className="block w-full border border-gray-300 rounded p-2"
                  required
                />
                <Button type="submit" sx={{ marginTop: '10px' }} variant="contained" color="primary" className="mt-4">
                  Upload Many Image
                </Button>
              </form>
            </Box>
        }

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
      <Modal open={openDeleteMultipleModal} onClose={() => setOpenDeleteMultipleModal(false)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-lg w-full max-w-md">
          <Typography variant="h6" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography>
            Are you sure you want to delete the image <strong>{selectedImage?.name}</strong>?
          </Typography>
          <div className="flex justify-end space-x-4 mt-4">
            <Button onClick={() => setOpenDeleteMultipleModal(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteMultipleImage}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
      <div className="flex justify-between mt-4">
        <div className="flex gap-2 justify-center mt-4">
          {[...Array(pages)].map((_, index) => {
            const page = index + 1
            const isActive = page === cPages

            return (
              <Link
                key={page}
                to={`/media/${page}`}
                className={`px-4 py-2 border rounded ${isActive ? 'bg-blue-500 text-white' : 'bg-white text-black'
                  }`}
              >
                {page}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}
