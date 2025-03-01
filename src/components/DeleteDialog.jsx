import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

const DeleteDialog = ({ open, title, content, confirmText, cancelText, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      {/* Title */}
      <DialogTitle>{title}</DialogTitle>

      {/* Content */}
      <DialogContent>
        <Typography>{content}</Typography>
      </DialogContent>

      {/* Buttons */}
      <DialogActions>
        <Button onClick={onCancel} color="secondary" variant="outlined">
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
