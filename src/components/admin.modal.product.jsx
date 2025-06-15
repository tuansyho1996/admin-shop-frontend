import { TextField, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { useState } from 'react';
import ImagePickerModal from './admin.modal.select.image';
import { createProduct, updateProduct } from '../services/service.product';
const colors = [
  { code: "bg-[#2C3E50]", hex: "#2C3E50" }, //
  { code: "bg-[#4682B4]", hex: "#4682B4" }, //
  { code: "bg-[#2F4F4F]", hex: "#2F4F4F" },//
  { code: "bg-[#722F37]", hex: "#722F37" },//
  { code: "bg-[#2E4E3F]", hex: "#2E4E3F" },//
  { code: "bg-[#505050]", hex: "#505050" },//
  { code: "bg-[#000000]", hex: "#000000" },
  { code: "bg-[#ffffff]", hex: "#ffffff" },
  { code: "bg-[#D3D3D3]", hex: "#D3D3D3" }, //
  { code: "bg-[#E5E4E2]", hex: "#E5E4E2" }, //
  { code: "bg-[#F7E7CE]", hex: "#F7E7CE" },//
  { code: "bg-[#C4C3D0]", hex: "#C4C3D0" },//
  { code: "bg-[#B0E0E6]", hex: "#B0E0E6" },//
  { code: "bg-[#2A3439]", hex: "#2A3439" },//
  { code: "bg-[#353839]", hex: "#353839" },//

]
const ModalProduct = ({ open, onClose, isEditing, currentProduct, categories, form, setForm, setProducts, products }) => {
  const [isModalImagePickerOpen, setModalImagePickerOpen] = useState(false);
  const [currentTypeSelectImage, setCurrentTypeSelectImage] = useState('main')

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add new product
  const addProduct = async () => {
    if (!form.product_price) {
      if (['unisex', 'hoodie'].every(val => form.product_list_categories.includes(val))) {
        form.product_price = 49.99;
      }
      else if (['unisex', 'zip-hoodie'].every(val => form.product_list_categories.includes(val))) {
        form.product_price = 51.99;
      }
      else if (['unisex', 'hooded-vest'].every(val => form.product_list_categories.includes(val))) {
        form.product_price = 46.99;
      }
      else if (['unisex', 'sweatshirt'].every(val => form.product_list_categories.includes(val))) {
        form.product_price = 46.99;
      }
      else if (['unisex', 'pant'].every(val => form.product_list_categories.includes(val))) {
        form.product_price = 44.99;
      }
      else if (['unisex', 'short-pant'].every(val => form.product_list_categories.includes(val))) {
        form.product_price = 39.99;
      }
      else if (['men', 't-shirt'].every(val => form.product_list_categories.includes(val))) {
        form.product_price = 25.99;
      }
      else if (['women', 't-shirt'].every(val => form.product_list_categories.includes(val))) {
        form.product_price = 25.99;
      }
      else if (['kid', 't-shirt'].every(val => form.product_list_categories.includes(val))) {
        form.product_price = 25.99;
      }
      else if (['kid', 'hoodie'].every(val => form.product_list_categories.includes(val))) {
        form.product_price = 35.99;
      }
      else if (['kid', 'zip-hoodie'].every(val => form.product_list_categories.includes(val))) {
        form.product_price = 37.99;
      }
      else if (['kid', 'pant'].every(val => form.product_list_categories.includes(val))) {
        form.product_price = 34.99;
      }
      else if (['kid', 'sweatshirt'].every(val => form.product_list_categories.includes(val))) {
        form.product_price = 32.99;
      } else {
        return alert('Please select a category or set a price for the product');
      }
    }
    const res = await createProduct(form)
    if (res.status === 201) {
      setProducts([{ ...form, _id: res.metadata._id }, ...products])
      onClose();
    }
  };
  // Update product
  const handleUpdateProduct = async () => {
    const res = await updateProduct(form, currentProduct._id)
    if (res.status === 200) {
      setProducts(products.map(p => (p._id === currentProduct._id ? { ...form, _id: res.metadata._id } : p)));
      onClose();
    }
  };
  const handleSelectImages = (images) => {
    setForm({ ...form, product_images: images })
  };
  const handleSelectColorImages = (images) => {
    setForm({ ...form, product_color_images: images })

  }
  const handleSelectCategory = (ctg) => {
    if (form.product_list_categories.includes(ctg)) {
      setForm({ ...form, product_list_categories: form.product_list_categories.filter((el) => el !== ctg) })
    }
    else {
      setForm({ ...form, product_list_categories: [...form.product_list_categories, ctg] })
    }
  }
  const handleSelectColor = (color) => {
    if (form.product_colors.includes(color)) {
      setForm({ ...form, product_colors: form.product_colors.filter((el) => el !== color) })
    } else {
      setForm({ ...form, product_colors: [...form.product_colors, color] })
    }
  }
  const handleClickPrimaryColor = () => {
    const colors = ['#4682B4', '#722F37', '#ffffff', '#2C3E50', '#2F4F4F', '#2E4E3F', '#505050'];
    setForm({ ...form, product_colors: colors });
  }
  const handleClickLightColor = () => {
    const colors = ['#F7E7CE', '#ffffff', '#B0E0E6', '#C4C3D0', '#D3D3D3', '#E5E4E2'];
    setForm({ ...form, product_colors: colors });
  }
  const handleClickDarkColor = () => {
    const colors = ['#2A3439', '#2F4F4F', '#353839', '#000000',];
    setForm({ ...form, product_colors: colors });
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEditing ? 'Edit Product' : 'Add Product'}</DialogTitle>
      <DialogContent>
        {/* Name Input */}
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="product_name"
          value={form.product_name}
          onChange={handleChange}
        />
        {/* Slug Input */}
        <TextField
          label="Slug"
          variant="outlined"
          fullWidth
          margin="normal"
          name="product_slug"
          value={form.product_slug}
          onChange={handleChange}
        />
        {/* Price Input */}
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          margin="normal"
          name="product_price"
          value={form.product_price}
          onChange={handleChange}
          type="number"
        />
        {/* Description Input */}
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          name="product_description"
          value={form.product_description}
          onChange={handleChange}
          multiline
          rows={4}
        />
        {/* Category Select */}
        <p className='font-bold py-2'>Choose categories</p>
        <ul className='grid grid-cols-3 gap-2 items-center justify-center'>
          {categories.length > 0 && categories.map((category, inx) => (
            <li className={`border-2 cursor-pointer ${form.product_list_categories.includes(category.category_slug) ? 'border-black' : 'border-gray-200'} `} key={inx}
              onClick={() => handleSelectCategory(category.category_slug)}
            >{category.category_slug}</li>
          ))}
        </ul>
        {/* Color Select */}
        <p className='font-bold py-2'>Choose colors</p>
        <ul className='grid grid-cols-6 gap-1 items-center justify-center'>
          <li className='border px-1' onClick={handleClickPrimaryColor}>combo primary</li>
          <li className='border px-1' onClick={handleClickLightColor}>combo light</li>
          <li className='border px-1' onClick={handleClickDarkColor}>combo dark</li>
          {colors.map((color, inx) => (
            <div className='flex flex-col items-center justify-center ' key={inx}>
              <li className={`border-2 cursor-pointer ${form.product_colors.includes(color.hex) ? 'border-black' : 'border-gray-200'} ${color.code} w-16 h-5`}
                onClick={() => handleSelectColor(color.hex)}
              ></li>
              <p className='text-xs'>{color.hex}</p>
            </div>

          ))}
        </ul>

        {/* Image main select */}
        <p className='font-bold py-2'>Choose main photo of the product</p>

        <div className="grid grid-cols-6 gap-4 p-4">
          {form.product_images.length > 0 && form.product_images.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer p-2 border-2 rounded}`}
            >
              <img src={image} className="w-auto h-auto max-h-40 object-cover" />
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setModalImagePickerOpen(true)
            setCurrentTypeSelectImage('main')
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Open Image Main Picker
        </button>
        {/* Image color select */}
        <p className='font-bold py-2'>Choose color image of the product</p>
        <div className="grid grid-cols-6 gap-4 p-4">
          {form.product_color_images.length > 0 && form.product_color_images.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer p-2 border-2 rounded}`}
            >
              <img src={image} className="w-auto h-auto max-h-40 object-cover" />
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setCurrentTypeSelectImage('color')
            setModalImagePickerOpen(true)
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Open Image Color Picker
        </button>
        <ImagePickerModal
          open={isModalImagePickerOpen}
          onClose={() => setModalImagePickerOpen(false)}
          onSelect={currentTypeSelectImage === 'main' ? handleSelectImages : handleSelectColorImages}
          selImages={currentTypeSelectImage === 'main' ? form.product_images : form.product_color_images}
          colors={form.product_colors}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={isEditing ? handleUpdateProduct : addProduct}
          color="primary"
          variant="contained"
        >
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ModalProduct;