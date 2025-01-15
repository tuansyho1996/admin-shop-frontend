import React from "react";
import { Modal, Box, Button } from "@mui/material";

const DeleteConfirmModal = ({ open, handleClose, handleDelete, name }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-category-modal"
      aria-describedby="delete-category-confirmation"
    >
      <Box
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-40 text-center"
      >
        <h2 className="text-xl font-semibold mb-4" id="delete-category-modal">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 mb-6" id="delete-category-confirmation">
          Are you sure you want to delete the category{" "}
          <span className="font-bold text-red-500">{name}</span>?
          This action cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            variant="contained"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            className="text-gray-700 hover:bg-gray-100"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmModal;
