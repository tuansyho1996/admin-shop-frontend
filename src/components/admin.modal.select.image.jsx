import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useImageContext } from '../context/context.media';
import { getImgs } from '../services/service.media';

export default function ImagePickerModal({ open, onClose, onSelect, selImages = [], colors = [] }) {
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
  const handleClearSelection = () => {
    setSelectedImages([]);
  }

  useEffect(() => {
    fetchImages()
    setSelectedImages(selImages)
  }, [selImages])
  const fetchImages = async () => {
    const res = await getImgs()
    setImages(res.metadata)
  }

  console.log(colors)
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="flex justify-between items-center">
        Select Images
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <div className="flex justify-end mt-4 mx-auto">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleConfirmSelection}
        >
          Confirm Selection
        </button>
      </div>
      <div className="flex justify-end mt-4 mx-auto">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleClearSelection}
        >
          Clear
        </button>
      </div>
      <DialogContent>
        <p className='font-bold py-2'>Choose colors</p>
        <ul className='grid grid-cols-12 gap-1 items-center justify-center'>
          {colors.length > 0 && colors.map((color, inx) => (
            <div className='flex flex-col items-center' key={inx}>
              <li className={`border-2 cursor-pointer border-gray-200 bg-[${color}] w-8 h-5`}></li>
              <p className='text-xs'>{color}</p>
            </div>

          ))}
        </ul>
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

      </DialogContent>
    </Dialog>
  );
}
