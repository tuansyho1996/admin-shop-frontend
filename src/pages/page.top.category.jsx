import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { getTopCategories, getCategories, updateCategory, updateTopCategories } from "../services/service.category";

const TopCategoriesManager = () => {
    const [categories, setCategories] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [allCategories, setAllCategories] = useState([])
    useEffect(() => {
        const fetchTopCategories = async () => {
            const topCategories = await getTopCategories()
            console.log(topCategories)
            setCategories(topCategories.categories)
        }
        const fetchAllCategories = async () => {
            const allCategories = await getCategories()
            setAllCategories(allCategories.metadata)
        }
        fetchTopCategories()
        fetchAllCategories()
    }, [])
    const handleOpenModalEditCategory = () => {
        setOpenDialog(true);
    };
    const handleEditCategory = (category) => {
        const isCategory = categories.includes(category)
        if (!isCategory) {
            let copyCategories = [...categories]
            copyCategories.push(category)
            setCategories(copyCategories)
        }
        else {
            let copyCategories = [...categories]
            copyCategories = categories.filter(el => el !== category)
            setCategories(copyCategories)
        }
    };

    const handleSaveCategory = async () => {
        const res = updateTopCategories(categories)
        console.log(res.metadata)
        setOpenDialog(false);
    };

    return (
        <div className="p-6 bg-white shadow rounded w-full">
            <h1 className="text-2xl font-bold mb-4">Manage Top Categories</h1>
            <div className="mb-4 flex justify-between">
                <Button variant="contained" color="primary" onClick={handleOpenModalEditCategory}>
                    Edit Category
                </Button>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Category Name</th>
                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {categories?.map((category, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 text-sm text-gray-900">{category}</td>
                                <td className="px-4 py-2 text-right">
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Dialog for Add/Edit */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
                <DialogTitle>Edit Category </DialogTitle>
                <DialogContent>
                    {
                        allCategories.length > 0 &&
                        allCategories.map((ct, index) => (
                            <button className={`px-4 py-2 border m-1 ${categories.includes(ct.category_name) && 'border-gray-800'}`} key={index}
                                onClick={() => handleEditCategory(ct.category_name)}
                            >{ct.category_name}</button>
                        ))
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSaveCategory} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TopCategoriesManager;
