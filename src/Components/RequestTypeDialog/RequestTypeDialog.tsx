// src/components/RequestTypeDialog.tsx

import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import * as yup from "yup";
import "./RequestTypeDialog.css";

interface RequestTypeDialogProps {
  open: boolean;
  onClose: () => void;
  initialRequestType: string;
  initialPurpose: string;
  initialRequestTypeOwner: string;
  requestId: string;
  initialInformationToCollect: Array<{
    label: string;
    type: string;
    required: boolean;
  }>;
  onSubmit: (values: any) => void;
}

const validationSchema = yup.object({
  requestType: yup.string().required("Request type is required"),
  purpose: yup.string().required("Purpose is required"),
  requestTypeOwner: yup
    .string()
    .email("Enter a valid email")
    .required("Request Type Owner is required"),
});

const RequestTypeDialog: React.FC<RequestTypeDialogProps> = ({
  open,
  onClose,
  initialRequestType,
  initialPurpose,
  requestId,
  initialRequestTypeOwner,
  initialInformationToCollect,
  onSubmit,
}) => {
  const formik = useFormik({
    initialValues: {
      requestType: initialRequestType,
      purpose: initialPurpose,
      requestTypeOwner: initialRequestTypeOwner,
      informationToCollect: initialInformationToCollect,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit({
        id: requestId || uuidv4(),
        ...values,
        createdAt: new Date().toISOString(),
      });
      onClose();
      formik.resetForm();
    },
  });

  const handleAddField = () => {
    formik.setFieldValue("informationToCollect", [
      ...formik.values.informationToCollect,
      { label: "", type: "text", required: false },
    ]);
  };

  const handleFieldChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const newFields = [...formik.values.informationToCollect];
    newFields[index] = { ...newFields[index], [field]: value };
    formik.setFieldValue("informationToCollect", newFields);
  };

  const handleRemoveField = (index: number) => {
    const newFields = formik.values.informationToCollect.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("informationToCollect", newFields);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="dialog-title">Add New Request Type</DialogTitle>
      <DialogContent className="dialog-content">
        <Card className="form-card">
          <CardContent className="card-content">
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="requestType"
                name="requestType"
                label="Request Type"
                value={formik.values.requestType}
                onChange={formik.handleChange}
                error={
                  formik.touched.requestType &&
                  Boolean(formik.errors.requestType)
                }
                helperText={
                  formik.touched.requestType && formik.errors.requestType
                }
                margin="dense"
                className="text-field"
              />
              <TextField
                fullWidth
                id="purpose"
                name="purpose"
                label="Purpose"
                multiline
                rows={4}
                value={formik.values.purpose}
                onChange={formik.handleChange}
                error={formik.touched.purpose && Boolean(formik.errors.purpose)}
                helperText={formik.touched.purpose && formik.errors.purpose}
                margin="dense"
                className="text-field"
              />
              <TextField
                fullWidth
                id="requestTypeOwner"
                name="requestTypeOwner"
                label="Request Type Owner (Email)"
                value={formik.values.requestTypeOwner}
                onChange={formik.handleChange}
                error={
                  formik.touched.requestTypeOwner &&
                  Boolean(formik.errors.requestTypeOwner)
                }
                helperText={
                  formik.touched.requestTypeOwner &&
                  formik.errors.requestTypeOwner
                }
                margin="dense"
                className="text-field"
              />
              <Grid container spacing={2} className="custom-field-container">
                {formik.values.informationToCollect.map((field, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={3} className="grid-item">
                      <TextField
                        label="Label"
                        value={field.label}
                        onChange={(e) =>
                          handleFieldChange(index, "label", e.target.value)
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3} className="grid-item">
                      <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                          value={field.type}
                          onChange={(e) =>
                            handleFieldChange(
                              index,
                              "type",
                              e.target.value as string
                            )
                          }
                        >
                          <MenuItem value="text">Text</MenuItem>
                          <MenuItem value="number">Number</MenuItem>
                          <MenuItem value="date">Date</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3} className="grid-item">
                      <FormControl fullWidth>
                        <InputLabel>Required</InputLabel>
                        <Select
                          value={field.required ? "yes" : "no"}
                          onChange={(e) =>
                            handleFieldChange(
                              index,
                              "required",
                              e.target.value === "yes"
                            )
                          }
                        >
                          <MenuItem value="yes">Yes</MenuItem>
                          <MenuItem value="no">No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3} className="grid-item">
                      <IconButton
                        color="secondary"
                        onClick={() => handleRemoveField(index)}
                        className="icon-button"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
              <Button
                onClick={handleAddField}
                startIcon={<AddIcon />}
                className="add-field-button"
              >
                Add Field
              </Button>
              <DialogActions>
                <Button onClick={onClose} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default RequestTypeDialog;
