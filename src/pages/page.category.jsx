'use client'
import { useEffect, useState } from 'react';
import { TextField, Button, IconButton, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../services/service.category';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    category_name: '',
    category_description: '',
    category_parent: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editCategory, setEditCategory] = useState({
    category_name: '',
    category_description: '',
    category_parent: '',
  });

  // Add a new category
  const addCategory = async () => {
    if (newCategory.category_name && newCategory.category_description) {
      const res = await createCategory(newCategory)
      if (res.status === 201) {
        setCategories([...categories, { ...res.metadata, category_parent: newCategory.category_parent }]);
        setNewCategory({ category_name: '', category_description: '', category_parent: '' });
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
      setEditIndex(null);
      setEditCategory({ category_name: '', category_description: '', category_parent: '' });
    }
  };

  useEffect(() => {
    fetchCategories()
  }, [])
  const fetchCategories = async () => {
    const res = await getCategories()
    if (res.status === 200) {
      setCategories(res.metadata)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Category Manager</h1>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Name */}
        <TextField
          label="Category Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, category_name: e.target.value })}
          variant="outlined"
        />
        {/* Description */}
        <TextField
          label="Description"
          value={newCategory.description}
          onChange={(e) => setNewCategory({ ...newCategory, category_description: e.target.value })}
          variant="outlined"
        />
        {/* Parent Category */}
        <FormControl fullWidth>
          <InputLabel>Parent Category</InputLabel>
          <Select
            value={newCategory.parent}
            onChange={(e) => {
              setNewCategory({ ...newCategory, category_parent: e.target.value })
            }}
          >
            <MenuItem value="">None</MenuItem>
            {categories.map((cat, idx) => (
              <MenuItem key={idx} value={cat.category_name}>
                {cat.category_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button variant="contained" onClick={addCategory} className="mt-4">
        Add Category
      </Button>

      {/* List of Categories */}
      {categories.map((category, index) => (
        <Paper key={index} className="p-4 mt-4 flex justify-between items-center">
          {editIndex === index ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 w-full">
              {/* Edit Name */}
              <TextField
                label="Category Name"
                value={editCategory.category_name}
                onChange={(e) => setEditCategory({ ...editCategory, category_name: e.target.value })}
                variant="outlined"
              />
              {/* Edit Description */}
              <TextField
                label="Description"
                value={editCategory.category_description}
                onChange={(e) => setEditCategory({ ...editCategory, category_description: e.target.value })}
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
                    <MenuItem key={idx} value={cat.category_name}>
                      {cat.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" onClick={handleUpdateCategory}>
                Update
              </Button>
              <Button variant="contained" color='error' onClick={() => setEditIndex(null)}>
                Cancel
              </Button>
            </div>
          ) : (
            <div className="w-full flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{category.category_name}</h3>
                <p>Description: {category.category_description}</p>
                {category.category_parent && <p className="text-gray-600">Parent: {category.category_parent}</p>}
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
        </Paper>
      ))}
    </div>
  );
};

export default Categories;
