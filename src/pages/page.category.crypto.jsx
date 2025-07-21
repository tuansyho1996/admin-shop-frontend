'use client'
import { useEffect, useState } from 'react';
import { TextField, Button, IconButton, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { createCategory, getCategories, updateCategory, deleteCategory, getCryptoCategories } from '../services/service.category';
import ImagePickerModal from '../components/admin.modal.select.image';

const CategoriesCrypto = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        category_name: '',
        category_slug: '',
        category_level: 0,
        category_description: '',
        category_parent: '',
        category_image: []
    });
    const [editIndex, setEditIndex] = useState(null);
    const [editCategory, setEditCategory] = useState({
        category_name: '',
        category_slug: '',
        category_level: 0,
        category_description: '',
        category_parent: '',
        category_image: []
    });
    const [isModalImagePickerOpen, setModalImagePickerOpen] = useState(false)

    const handleChangeNewSelImage = (images) => {
        setNewCategory({
            ...newCategory,
            category_image: images
        })
    }
    const handleChangeEditSelImage = (images) => {
        setEditCategory({
            ...editCategory,
            category_image: images
        })
    }
    // Add a new category
    const addCategory = async () => {
        if (newCategory.category_name && newCategory.category_description) {
            const res = await createCategory(newCategory)
            if (res.status === 201) {
                setCategories([{ ...res.metadata, category_parent: newCategory.category_parent }, ...categories]);
                setNewCategory({ category_name: '', category_description: '', category_parent: '', category_slug: '', category_image: [] });
            }
        }
    };


    // Delete a category
    const handleDeleteCategory = async (index) => {
        const res = await deleteCategory(categories[index]._id)
        if (res.status === 200) {
            const updatedCategories = categories.filter((_, i) => i !== index);
            setCategories(updatedCategories);
        }
    };

    // Start editing a category
    const startEditCategory = (index) => {
        setEditIndex(index);
        setEditCategory(categories[index]);
    };

    // Update an existing category
    const handleUpdateCategory = async () => {
        const res = await updateCategory(editCategory, categories[editIndex]._id)
        if (res.status === 200) {
            const updatedCategories = [...categories];
            updatedCategories[editIndex] = { ...res.metadata, category_parent: editCategory.category_parent };
            setCategories(updatedCategories);
            setEditIndex(null)
            setEditCategory({ category_name: '', category_description: '', category_parent: '', category_slug: '' });
        }
    };

    useEffect(() => {
        fetchCategories()
    }, [])
    const fetchCategories = async () => {
        const res = await getCryptoCategories()
        if (res.status === 200) {
            setCategories(res.metadata)
        }
    }
    return (
        <div className="p-8 w-full">
            <h1 className="text-2xl font-bold mb-4">Category Manager</h1>
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Name */}
                <TextField
                    label="Category Name"
                    value={newCategory.category_name}
                    onChange={(e) => setNewCategory({ ...newCategory, category_name: e.target.value })}
                    variant="outlined"
                />
                {/* Slug */}
                <TextField
                    label="Category Slug"
                    value={newCategory.category_slug}
                    onChange={(e) => setNewCategory({ ...newCategory, category_slug: e.target.value })}
                    variant="outlined"
                />
                <TextField
                    label="Category level"
                    value={newCategory.category_level}
                    onChange={(e) => setNewCategory({ ...newCategory, category_level: e.target.value })}
                    variant="outlined"
                />

                {/* Parent Category */}
                <FormControl fullWidth>
                    <InputLabel>Parent Category</InputLabel>
                    <Select
                        value={newCategory.category_parent}
                        onChange={(e) => {
                            setNewCategory({ ...newCategory, category_parent: e.target.value })
                        }}
                    >
                        <MenuItem value="">None</MenuItem>
                        {categories.map((cat, idx) => (
                            <MenuItem key={idx} value={cat.category_slug}>
                                {cat.category_slug}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            {/* Description */}

            <TextField
                label="Description"
                value={newCategory.category_description}
                onChange={(e) => setNewCategory({ ...newCategory, category_description: e.target.value })}
                variant="outlined"
                multiline
                rows={4}
                className='w-full !mb-4'
            />
            {
                newCategory.category_image.length > 0 &&
                newCategory.category_image.map((el, index) =>
                (
                    <>
                        <img src={el} width={200} key={index} />
                    </>
                )
                )
            }
            <button
                onClick={() => {
                    setModalImagePickerOpen(true)
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Open Image Picker
            </button>
            <ImagePickerModal
                open={isModalImagePickerOpen}
                onClose={() => setModalImagePickerOpen(false)}
                selImages={newCategory.category_image}
                onSelect={handleChangeNewSelImage}
            />
            <Button variant="contained" onClick={addCategory} className="" sx={{ marginLeft: '10px' }}>
                Add Category
            </Button>

            {/* List of CategoriesCrypto */}
            {categories.map((category, index) => (
                <div key={index} className="p-4 mt-4 w-full border border-gray-200">
                    {editIndex === index ? (
                        <div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full">
                                {/* Edit Name */}
                                <TextField
                                    label="Category Name"
                                    value={editCategory.category_name}
                                    onChange={(e) => setEditCategory({ ...editCategory, category_name: e.target.value })}
                                    variant="outlined"
                                />
                                {/* Edit slug */}
                                <TextField
                                    label="Category Slug"
                                    value={editCategory.category_slug}
                                    onChange={(e) => setEditCategory({ ...editCategory, category_slug: e.target.value })}
                                    variant="outlined"
                                />
                                <TextField
                                    label="Category Level"
                                    value={editCategory.category_level}
                                    onChange={(e) => setEditCategory({ ...editCategory, category_level: e.target.value })}
                                    variant="outlined"
                                />
                                {/* Edit Parent Category */}
                                <FormControl fullWidth>
                                    <InputLabel>Parent Category</InputLabel>
                                    <Select
                                        value={editCategory.category_parent}
                                        onChange={(e) => setEditCategory({ ...editCategory, category_parent: e.target.value })}
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        {categories.filter(cat => cat._id !== category._id).map((cat, idx) => (
                                            <MenuItem key={idx} value={cat.category_slug}>
                                                {cat.category_slug}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {/* Edit Description */}
                            </div>
                            <TextField
                                label="Description"
                                value={editCategory.category_description}
                                onChange={(e) => setEditCategory({ ...editCategory, category_description: e.target.value })}
                                variant="outlined"
                                multiline
                                rows={4}
                                className='w-full !my-4'
                            />
                            <div>
                                {
                                    editCategory.category_image.length > 0 &&
                                    editCategory.category_image.map((el, index) =>
                                    (
                                        <>
                                            <img src={el} width={200} key={index} />
                                        </>
                                    )
                                    )
                                }
                                <button
                                    onClick={() => {
                                        setModalImagePickerOpen(true)
                                    }}
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 my-2"
                                >
                                    Open Edit Image Picker
                                </button>
                                <ImagePickerModal
                                    open={isModalImagePickerOpen}
                                    onClose={() => setModalImagePickerOpen(false)}
                                    selImages={editCategory.category_image}
                                    onSelect={handleChangeEditSelImage}
                                />
                            </div>
                            <div className='flex gap-2  '>
                                <Button variant="contained" onClick={handleUpdateCategory}>
                                    Update
                                </Button>
                                <Button variant="contained" color='error' onClick={() => setEditIndex(null)}>
                                    Cancel
                                </Button>
                            </div>
                        </div>

                    ) : (
                        <div className="w-full flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-lg uppercase">{category.category_name}</h3>
                                <p>slug: {category.category_slug}</p>
                                <p>Description: {category.category_description}</p>
                                {category.category_parent && <p className="">Parent: {category.category_parent}</p>}
                                {
                                    category.category_image.length > 0 &&
                                    category.category_image.map((el, index) =>
                                    (
                                        <>
                                            <img src={el} width={200} key={index} />
                                        </>
                                    )
                                    )
                                }
                            </div>
                            <div className="flex space-x-2">
                                <IconButton onClick={() => startEditCategory(index)}>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteCategory(index)}>
                                    <Delete />
                                </IconButton>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CategoriesCrypto;
