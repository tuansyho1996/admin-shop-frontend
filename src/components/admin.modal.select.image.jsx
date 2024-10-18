import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useImageContext } from '../context/context.media';
import { getImgs } from '../services/service.media';

export default function ImagePickerModal({ open, onClose, onSelect, selImages }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([])
  const handleSelectImage = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((img) => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleConfirmSelection = () => {
    onSelect(selectedImages);
    onClose();
  };
  useEffect(() => {
    fetchImages()
    setSelectedImages(selImages)
  }, [])
  const fetchImages = async () => {
    const res = await getImgs()
    setImages(res.metadata)
  }


  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="flex justify-between items-center">
        Select Images
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-6 gap-4 p-4">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => handleSelectImage(image.media_path)}
              className={`cursor-pointer p-2 border-2 rounded ${selectedImages.includes(image.media_path) ? 'border-blue-500' : 'border-gray-300'
                }`}
            >
              <img src={image.media_path} className="w-auto h-auto max-h-40 object-cover" />
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleConfirmSelection}
          >
            Confirm Selection
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
