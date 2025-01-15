import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { getTopCategories, getCategories, updateCategory, updateTopCategories } from "../services/service.category";
import ImagePickerModal from "../components/admin.modal.select.image";
import DeleteConfirmModal from "../components/modal.confirm.delete";
import { deleteTopCategory } from "../services/service.category";
import { ObjectId } from 'bson';


const TopCategoriesManager = () => {
    const [categories, setCategories] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [allCategories, setAllCategories] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [formCategory, setFormCategory] = useState({
        _id: '',
        top_ct_name: '',
        top_ct_categories: [],
        top_ct_image: [],
    });
    const [modalConfirmDeleteOpen, setModalConfirmDeleteOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [isModalImagePickerOpen, setModalImagePickerOpen] = useState(false)

    useEffect(() => {
        const fetchTopCategories = async () => {
            const topCategories = await getTopCategories()
            setCategories(topCategories)
        }
        const fetchAllCategories = async () => {
            const allCategories = await getCategories()
            setAllCategories(allCategories.metadata)
        }
        fetchTopCategories()
        fetchAllCategories()
    }, [])

    const handleAddCategory = () => {
        const newId = new ObjectId().toString();
        setFormCategory({
            ...formCategory,
            _id: newId,
        })
        setIsEdit(false);
        setOpenDialog(true);
    };
    const handleEditCategory = (id) => {
        setIsEdit(id)
        setOpenDialog(true);
        setFormCategory(categories.find(el => el._id === id))
    };
    const handelCloseDialog = () => {
        setOpenDialog(false);
        setFormCategory({
            _id: '',
            top_ct_name: '',
            top_ct_categories: [],
            top_ct_image: [],
        })
    }
    const handleSaveCategory = async () => {
        const res = await updateTopCategories(formCategory)
        setCategories(res)
        handelCloseDialog()
    };
    const handleChangeEditSelImage = (images) => {
        setFormCategory({
            ...formCategory,
            top_ct_image: images
        })
    }
    const handlePickCategory = (slug) => {
        if (formCategory.top_ct_categories.includes(slug)) {
            setFormCategory({
                ...formCategory,
                top_ct_categories: formCategory.top_ct_categories.filter(el => el !== slug)
            })
        }
        else {
            setFormCategory({
                ...formCategory,
                top_ct_categories: [...formCategory.top_ct_categories, slug]
            })
        }
    }
    const handleOpenModalDeleteCategory = (category) => {
        setModalConfirmDeleteOpen(true)
        setSelectedCategory(category)

    }
    const handleDeleteTopCategory = async () => {
        const res = await deleteTopCategory(selectedCategory._id)
        setCategories(res)
        handelCloseDialog()
        setModalConfirmDeleteOpen(false)
    }
    return (
        <div className="p-6 bg-white shadow rounded w-full">
            <h1 className="text-2xl font-bold mb-4">Manage Top Categories</h1>
            <div className="mb-4 flex justify-between">
                <Button variant="contained" color="primary" onClick={handleAddCategory}>
                    Add Category
                </Button>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Category Name</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Categories</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Image</th>
                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {categories?.map((category, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 text-sm text-gray-900">{category.top_ct_name}</td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                    {
                                        category.top_ct_categories.length > 0 &&
                                        category.top_ct_categories.map((item, index) => (
                                            <button className="border mr-1 p-1 rounded-md" key={index}>
                                                {item}
                                            </button>
                                        ))
                                    }
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900"><img width={100} src={category.top_ct_image[0]} /></td>
                                <td className="px-4 py-2 text-right">
                                    <IconButton onClick={() => handleEditCategory(category._id)} size="small">
                                        <Edit fontSize="small" />
                                    </IconButton>
                                    <IconButton onClick={() => handleOpenModalDeleteCategory(category)} size="small" color="error">
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Dialog for Add/Edit */}
            <Dialog open={openDialog} onClose={handelCloseDialog} fullWidth>
                <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Top category name"
                        fullWidth
                        variant="outlined"
                        value={formCategory.top_ct_name}
                        onChange={(e) => setFormCategory({ ...formCategory, top_ct_name: e.target.value })}
                    />
                    <h3 className="font-bold">Categories:</h3>
                    {
                        allCategories.length > 0 && allCategories.map((el, index) => (
                            <button className={`border  px-4 py-2 m-1 ${formCategory.top_ct_categories.includes(el.category_slug) ? 'border-gray-800' : ''}`} key={index}
                                onClick={() => handlePickCategory(el.category_slug)}>{el.category_name}</button>
                        ))
                    }
                    <h3 className="font-bold">Image:</h3>
                    <div>
                        <div className="flex">
                            {
                                formCategory.top_ct_image.length > 0 &&
                                formCategory.top_ct_image.map((el, index) =>
                                (
                                    <img src={el} width={200} key={index} />
                                )
                                )
                            }
                        </div>
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
                            selImages={formCategory.top_ct_image}
                            onSelect={handleChangeEditSelImage}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSaveCategory} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <DeleteConfirmModal open={modalConfirmDeleteOpen} handleClose={() => setModalConfirmDeleteOpen(false)} name={selectedCategory?.top_ct_name} handleDelete={handleDeleteTopCategory} />
        </div>
    );
};

export default TopCategoriesManager;
