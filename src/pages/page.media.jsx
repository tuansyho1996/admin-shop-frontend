'use client'
import React, { useEffect, useState, useRef } from 'react';
import { Modal, Box, Button, Typography, IconButton } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { uploadImageToS3, getImgs, deleteImg, uploadManyImage, deleteMultipleImages } from '../services/service.media';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ModalUpload from '../components/media/media.modal.upload';

export default function Media() {
  const deleteRef = useRef(null);

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

  const [isSelecting, setIsSelecting] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  const selectImagesInArea = () => {
    const selectionRect = {
      left: Math.min(startPos.x, currentPos.x),
      top: Math.min(startPos.y, currentPos.y),
      right: Math.max(startPos.x, currentPos.x),
      bottom: Math.max(startPos.y, currentPos.y),
    };

    const selected = [];

    imageRefs.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const overlap =
        rect.left < selectionRect.right &&
        rect.right > selectionRect.left &&
        rect.top < selectionRect.bottom &&
        rect.bottom > selectionRect.top;

      if (overlap) {
        selected.push(images[index].media_name);
      }
    });

    // Set selected checkboxes
    setSelectedItems((prev) => [...new Set([...prev, ...selected])]);
  };


  useEffect(() => {
    if (openDeleteModal) {
      const handleKeyDown = (e) => {
        if (e.key === 'Enter' && deleteRef.current) {
          e.preventDefault();
          deleteRef.current.click(); // Gọi submit trên form
        }
      };

      if (open) {
        window.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [openDeleteModal]);

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
    const res = await deleteMultipleImages(selectedItems)
    if (res.status === 200) {
      setImages(images.filter((img) => !selectedItems.includes(img.media_name)));
      setOpenDeleteMultipleModal(false);
    }
  };
  return (
    <div className="m-10 p-6">
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
      <div
        onMouseDown={(e) => {
          setIsSelecting(true);
          setStartPos({ x: e.clientX, y: e.clientY });
          setCurrentPos({ x: e.clientX, y: e.clientY });
        }}
        onMouseMove={(e) => {
          if (isSelecting) setCurrentPos({ x: e.clientX, y: e.clientY });
        }}
        onMouseUp={() => {
          setIsSelecting(false);
          selectImagesInArea();
        }}
        className="relative"
      >
        {/* Selection Box */}
        {isSelecting && (
          <div
            className="absolute border-2 border-blue-400 bg-blue-200 bg-opacity-30 pointer-events-none z-50"
            style={{
              left: Math.min(startPos.x, currentPos.x),
              top: Math.min(startPos.y, currentPos.y),
              width: Math.abs(startPos.x - currentPos.x),
              height: Math.abs(startPos.y - currentPos.y),
            }}
          />
        )}

        {/* Grid of Images */}
        <div className="grid grid-cols-12 gap-4 mt-6">
          {images?.length === 0 && <Typography>No images uploaded yet.</Typography>}
          {images?.map((image, index) => (
            <div key={index} ref={(el) => (imageRefs.current[index] = el)}>
              <input
                type="checkbox"
                id={image.media_name}
                checked={selectedItems.includes(image.media_name)}
                onChange={() => handleCheckboxChange(image.media_name)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
              />
              <div className="relative group">
                <img src={image.media_path} className="w-auto h-auto max-h-40 rounded" />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
                  <IconButton color="secondary" onClick={() => handleDeleteModalOpen(image)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
              <button
                onClick={() => handleCopy(image.media_name)}
                className="px-2 py-1 mt-1 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Copy url
              </button>
            </div>
          ))}
        </div>
      </div>



      {/* Create Image Modal */}

      <ModalUpload
        open={openCreateModal}
        onClose={handleCreateModalClose}
        isUploadMany={isUploadMany}
        setImages={setImages}
      />

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
              ref={deleteRef}
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
