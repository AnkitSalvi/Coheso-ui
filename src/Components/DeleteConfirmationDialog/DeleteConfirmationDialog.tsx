import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import "./DeleteConfirmationDialog.css";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  requestTypeToDelete: { requestType: string } | null;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  requestTypeToDelete,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirmation-dialog"
    >
      <DialogTitle id="delete-confirmation-dialog" className="dialog-title">
        Delete Request Type
      </DialogTitle>
      <DialogContent className="dialog-content">
        <DialogContentText className="dialog-content-text">
          Are you sure you want to delete the request type "
          {requestTypeToDelete?.requestType}"?
        </DialogContentText>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={onClose} color="primary" className="cancel-button">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" className="delete-button">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
