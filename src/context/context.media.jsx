'use client'
import { getImgs } from '../services/service.media';
import { createContext, useState, useContext, useEffect } from 'react';

const ImageContext = createContext();

export const useImageContext = () => {
  return useContext(ImageContext);
};


export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages()
  }, [])
  const fetchImages = async () => {
    const res = await getImgs()
    if (res.status === 200) {
      setImages(res.metadata)
    }
  }
  return (
    <ImageContext.Provider value={{ images, setImages }}>
      {children}
    </ImageContext.Provider>
  );
};
