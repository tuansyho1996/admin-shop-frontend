'use client'
import { useEffect, useState } from 'react';
import { TextField, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { getProduct, createProduct, updateProduct, deleteProduct } from '../services/service.product';
import { getCategories } from '../services/service.category';
import ImagePickerModal from '../components/admin.modal.select.image';

const colors = [
  { code: "bg-[#333333]", hex: "#333333" },
  { code: "bg-[#2C3E50]", hex: "#2C3E50" },
  { code: "bg-[#3B5323]", hex: "#3B5323" },
  { code: "bg-[#4682B4]", hex: "#4682B4" },
  { code: "bg-[#2F4F4F]", hex: "#2F4F4F" },
  { code: "bg-[#8A3324]", hex: "#8A3324" },
  { code: "bg-[#722F37]", hex: "#722F37" },
  { code: "bg-[#2E4E3F]", hex: "#2E4E3F" },
  { code: "bg-[#2A3439]", hex: "#2A3439" },
  { code: "bg-[#505050]", hex: "#505050" },
  { code: "bg-[#000000]", hex: "#000000" },
  { code: "bg-[#ffffff]", hex: "#ffffff" },

]

export default function ProductManager() {
  const [products, setProducts] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [categories, setCategories] = useState([])
  const [isModalImagePickerOpen, setModalImagePickerOpen] = useState(false);
  const [currentTypeSelectImage, setCurrentTypeSelectImage] = useState('main')
  // Product form state
  const [form, setForm] = useState({
    product_name: '',
    product_price: '',
    product_description: '',
    product_list_categories: [],
    product_images: [],
    product_colors: [],
    product_color_images: []
  });
  useEffect(() => {
    fetchCategories()
    fetchAllProduct()
  }, [])
  useEffect(() => {
    if (form?.product_images.length > 0) {
      const copyProductColorImages = [...form.product_color_images]
      copyProductColorImages[0] = form.product_images[0]
      setForm({ ...form, product_color_images: copyProductColorImages })
    }
    else {
      if (form.product_color_images.length > 0) {
        const copyProductColorImages = [...form.product_color_images]
        copyProductColorImages.shift()
        setForm({ ...form, product_color_images: copyProductColorImages })
      }
    }
  }, [form.product_images])
  const fetchAllProduct = async () => {
    const data = await getProduct()
    setProducts(data)
  }
  const fetchCategories = async () => {
    const data = await getCategories()
    if (data?.status === 200) {
      setCategories(data.metadata)
    }
  }


  // Handle modal open/close
  const handleOpen = () => {
    setOpenModal(true)
  };
  const handleClose = () => {
    setOpenModal(false);
    resetForm();
  };

  // Reset form state
  const resetForm = () => {
    setForm({ product_name: '', product_price: '', product_description: '', product_list_categories: [], product_images: [], product_colors: [], product_color_images: [] });
    setIsEditing(false);
    setCurrentProduct(null);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add new product
  const addProduct = async () => {
    const res = await createProduct(form)
    if (res.status === 201) {
      setProducts([...products, { ...form, _id: res.metadata._id }])
      handleClose();
    }
  };

  // Edit existing product
  const editProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setForm(product);
    handleOpen();
  };

  // Update product
  const handleUpdateProduct = async () => {
    const res = await updateProduct(form, currentProduct._id)
    if (res.status === 200) {
      setProducts(products.map(p => (p._id === currentProduct._id ? { ...form, _id: res.metadata._id } : p)));
      handleClose();
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    const res = await deleteProduct(id)
    if (res.status === 200) {
      setProducts(products.filter(p => p._id !== id))
      handleClose();
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
  console.log(form.product_color_images)
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Product Manager</h1>

      {/* Add Product Button */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Product
      </Button>

      {/* Product List */}
      <div className="mt-4">
        {products?.length > 0 ? (
          <ul className="space-y-2">
            {products?.map(product => (
              <li key={product._id} className="flex justify-between items-center p-2 rounded">
                <div>
                  <span className="font-semibold">{product.product_name}</span> - ${product.product_price}
                  <p>{product.product_description}</p>
                  <div className="grid grid-cols-6 gap-4 p-4">
                    {product.product_images.length > 0 && product.product_images?.map((image, index) => (
                      <div
                        key={index}
                        className={`cursor-pointer p-2 border-2 rounded}`}
                      >
                        <img src={image} className="w-auto h-auto max-h-40 object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-x-2">
                  <IconButton onClick={() => editProduct(product)} color='primary'>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteProduct(product._id)} color='error'>
                    <Delete />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products available</p>
        )}
      </div>

      {/* Product Modal */}
      <Dialog open={openModal} onClose={handleClose}>
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
            {colors.map((color, inx) => (
              <div className='flex flex-col items-center justify-center '>
                <li className={`border-2 cursor-pointer ${form.product_colors.includes(color.hex) ? 'border-black' : 'border-gray-200'} ${color.code} w-16 h-5`} key={inx}
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
          <Button onClick={handleClose} color="secondary">
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
    </div>
  );
}
