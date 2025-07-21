'use client'
import { useEffect, useState } from 'react';
import { TextField, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Modal } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { getProduct, createProduct, updateProduct, deleteProduct, getProductShop } from '../services/service.product';
import { getCategories } from '../services/service.category';
import ModalProduct from '../components/admin.modal.product';
import ModalAddProductsAllCategories from '../components/admin.modal.add.product.all.categories';


export default function ProductManager() {
  const [products, setProducts] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isModalAddProductsAll, setIsModalAddProductsAll] = useState(false);

  // Product form state
  const [form, setForm] = useState({
    product_name: '',
    product_slug: '',
    product_price: '',
    product_description: '',
    product_list_categories: [],
    product_images: [],
    product_colors: [],
    product_color_images: []
  });
  useEffect(() => {
    fetchCategories()
  }, [])
  useEffect(() => {
    fetchAllProduct()
  }, [page])
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
    const { products, totalPage } = await getProductShop(page)
    setProducts(products)
    setTotalPage(totalPage)
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
    setForm({ product_name: '', product_slug: '', product_price: '', product_description: '', product_list_categories: [], product_images: [], product_colors: [], product_color_images: [] });
    setIsEditing(false);
    setCurrentProduct(null);
  };

  // // Handle form field changes
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm({ ...form, [name]: value });
  // };

  // // Add new product
  // const addProduct = async () => {
  //   const res = await createProduct(form)
  //   if (res.status === 201) {
  //     setProducts([{ ...form, _id: res.metadata._id }, ...products])
  //     handleClose();
  //   }
  // };

  // Edit existing product
  const editProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setForm(product);
    handleOpen();
  };
  // // Update product
  // const handleUpdateProduct = async () => {
  //   const res = await updateProduct(form, currentProduct._id)
  //   if (res.status === 200) {
  //     setProducts(products.map(p => (p._id === currentProduct._id ? { ...form, _id: res.metadata._id } : p)));
  //     handleClose();
  //   }
  // };

  // Delete product
  const handleDeleteProduct = async (id) => {
    const res = await deleteProduct(id)
    if (res.status === 200) {
      setProducts(products.filter(p => p._id !== id))
      handleClose();
    }
  };
  // const handleSelectImages = (images) => {
  //   setForm({ ...form, product_images: images })
  // };
  // const handleSelectColorImages = (images) => {
  //   setForm({ ...form, product_color_images: images })

  // }
  // const handleSelectCategory = (ctg) => {
  //   if (form.product_list_categories.includes(ctg)) {
  //     setForm({ ...form, product_list_categories: form.product_list_categories.filter((el) => el !== ctg) })
  //   }
  //   else {
  //     setForm({ ...form, product_list_categories: [...form.product_list_categories, ctg] })
  //   }
  // }
  // const handleSelectColor = (color) => {
  //   if (form.product_colors.includes(color)) {
  //     setForm({ ...form, product_colors: form.product_colors.filter((el) => el !== color) })
  //   } else {
  //     setForm({ ...form, product_colors: [...form.product_colors, color] })
  //   }
  // }
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Product Manager</h1>

      {/* Add Product Button */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Product
      </Button>
      <Button onClick={() => setIsModalAddProductsAll(true)} variant="contained" color="secondary" sx={{ marginLeft: '10px' }} >
        Add Products For All Categories
      </Button>

      {/* Product List */}
      <div className="mt-4">
        {totalPage > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPage }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => {
                  setPage(i + 1);
                  const section = document.getElementById("new-products");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-4 py-2 rounded ${page === i + 1
                  ? `bg-black text-white`
                  : "hover:bg-gray-300"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
        {products?.length > 0 ? (
          <ul className="space-y-2">
            {products?.map(product => (
              <li key={product._id} className="flex justify-between items-center p-2 rounded">
                <div>
                  <span className="font-semibold">{product.product_name}</span>
                  <p>${product.product_price}</p>
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
        {totalPage > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPage }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => {
                  setPage(i + 1);
                  const section = document.getElementById("new-products");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-4 py-2 rounded ${page === i + 1
                  ? `bg-black text-white`
                  : "hover:bg-gray-300"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ModalProduct
        open={openModal}
        onClose={handleClose}
        form={form}
        setForm={setForm}
        isEditing={isEditing}
        currentProduct={currentProduct}
        categories={categories}
        setProducts={setProducts}
        products={products}
      />
      <ModalAddProductsAllCategories
        isOpen={isModalAddProductsAll}
        onClose={() => setIsModalAddProductsAll(false)}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
}
