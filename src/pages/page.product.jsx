'use client'
import { useEffect, useState } from 'react';
import { TextField, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { getProduct, createProduct, updateProduct, deleteProduct } from '../services/service.product';
import { getCategories } from '../services/service.category';
import ImagePickerModal from '../components/admin.modal.select.image';

export default function ProductManager() {
  const [products, setProducts] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [categories, setCategories] = useState([])
  const [isModalImagePickerOpen, setModalImagePickerOpen] = useState(false);
  useEffect(() => {
    fetchCategories()
    fetchAllProduct()
  }, [])
  const fetchAllProduct = async () => {
    const data = await getProduct()
    setProducts(data)
  }
  const fetchCategories = async () => {
    const data = await getCategories()
    if (data.status === 200) {
      setCategories(data.metadata)
    }
  }
  // Product form state
  const [form, setForm] = useState({
    product_name: '',
    product_price: '',
    product_description: '',
    product_category_name: '',
    product_images: []
  });

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
    setForm({ name: '', price: '', description: '', category: '', product_images: [] });
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
    setForm({ ...form, product_images: images });;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Product Manager</h1>

      {/* Add Product Button */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Product
      </Button>

      {/* Product List */}
      <div className="mt-4">
        {products.length > 0 ? (
          <ul className="space-y-2">
            {products.map(product => (
              <li key={product._id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <div>
                  <span className="font-semibold">{product.product_name}</span> - ${product.product_price} ({product.product_category})
                  <p>{product.product_description}</p>
                  <div className="grid grid-cols-6 gap-4 p-4">
                    {product.product_images.length > 0 && product.product_images.map((image, index) => (
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
                  <IconButton onClick={() => editProduct(product)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteProduct(product._id)}>
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
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            margin="normal"
            name="product_category_name"
            select
            value={form.product_category_name}
            onChange={handleChange}
          >
            {categories.length > 0 && categories.map((category, inx) => (
              <MenuItem key={inx} value={category.category_name}>
                {category.category_name}
              </MenuItem>
            ))}
          </TextField>
          {/* Image select */}
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
            onClick={() => setModalImagePickerOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Open Image Picker
          </button>
          <ImagePickerModal
            open={isModalImagePickerOpen}
            onClose={() => setModalImagePickerOpen(false)}
            onSelect={handleSelectImages}
            selImages={form.product_images}
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
