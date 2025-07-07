import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getImgs } from '../services/service.media';

export default function ImagePickerModal({ open, onClose, onSelect, selImages = [], colors = [] }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([])
  const [cPage, setCPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
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
  }
    , [cPage, open]);
  useEffect(() => {
    // fetchImages()
    setSelectedImages(selImages)
  }, [selImages])
  const fetchImages = async () => {
    const res = await getImgs(cPage)
    const { images, totalPages } = res.metadata
    setImages(images)
    setTotalPages(totalPages)
  }

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
        <ul className='sticky top-0 z-10 bg-white grid grid-cols-12 gap-1 items-center justify-center'>
          {colors.length > 0 && colors.map((color, inx) => (
            <div className='flex flex-col items-center' key={inx}>
              <li className={`border-2 cursor-pointer border-gray-200 bg-[${color}] w-8 h-5`}></li>
              <p className='text-xs'>{color}</p>
            </div>

          ))}
        </ul>
        <div className="grid grid-cols-6 gap-4 p-4">
          {images.length > 0 && images?.map((image, index) => (
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
        <div className="flex justify-between mt-4">
          <div className="flex gap-2 justify-center mt-4">
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1
              const isActive = page === cPage

              return (
                <button
                  key={page}
                  onClick={() => {
                    setCPage(page)
                  }}
                  className={`px-4 py-2 border rounded ${isActive ? 'bg-blue-500 text-white' : 'bg-white text-black'
                    }`}
                >
                  {page}
                </button>
              )
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
