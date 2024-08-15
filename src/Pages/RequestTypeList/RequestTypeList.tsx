import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Typography,
  Container,
  Button,
  TextField,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useRequestTypeContext } from "../../Context/RequestTypeContext";
import Header from "../../Components/Header/Header";
import RequestTypeDialog from "../../Components/RequestTypeDialog/RequestTypeDialog";
import {
  addRequestTypeForUser,
  getRequestTypesForUser,
  updateRequestTypeForUser,
  deleteRequestTypeForUser,
} from "../../Common/apiCalls";
import { RequestType } from "../../Context/RequestTypeContext";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
import "./RequestTypeList.css";

// Function to sort request types by createdAt
const sortByCreatedAt = (requestTypes: RequestType[]) => {
  return requestTypes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

const RequestTypeList: React.FC = () => {
  const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
  const [filteredRequestTypes, setFilteredRequestTypes] = useState<
    RequestType[]
  >([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRequestType, setCurrentRequestType] =
    useState<RequestType | null>(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [requestTypeToDelete, setRequestTypeToDelete] =
    useState<RequestType | null>(null);

  const [userId, setUserId] = useState("9398517b-33db-4857-ba9e-cc0eced97e3f");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const { addRequestType } = useRequestTypeContext();

  useEffect(() => {
    getRequestTypesForUser(userId)
      .then((data) => {
        const sortedData = sortByCreatedAt(data);
        setRequestTypes(sortedData);
        setFilteredRequestTypes(sortedData);
      })
      .catch((e) => console.log(e));
  }, [userId]);

  useEffect(() => {
    const filtered = requestTypes.filter((requestType) =>
      requestType.requestType.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const sortedFiltered = sortByCreatedAt(filtered);
    setFilteredRequestTypes(sortedFiltered);
    setCurrentPage(1);
  }, [searchQuery, requestTypes]);

  const handleDialogSubmit = async (values: any) => {
    try {
      if (isEditMode && currentRequestType) {
        await updateRequestTypeForUser(userId, currentRequestType.id, values);
        const updatedRequestTypes = requestTypes.map((requestType) =>
          requestType.id === currentRequestType.id
            ? { ...requestType, ...values }
            : requestType
        );
        const sortedUpdatedRequestTypes = sortByCreatedAt(updatedRequestTypes);
        setRequestTypes(sortedUpdatedRequestTypes);
        toast.success("Request type updated successfully!"); // Success toast
      } else {
        await addRequestTypeForUser(userId, values);
        const newRequestTypes = [...requestTypes, values];
        const sortedNewRequestTypes = sortByCreatedAt(newRequestTypes);
        setRequestTypes(sortedNewRequestTypes);
        toast.success("Request type added successfully!"); // Success toast
      }
      setOpen(false);
      setIsEditMode(false);
      setCurrentRequestType(null);
    } catch (error) {
      toast.error("An error occurred. Please try again."); // Error toast
    }
  };

  const handleEdit = (requestType: RequestType) => {
    setCurrentRequestType(requestType);
    setIsEditMode(true);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (requestTypeToDelete) {
      try {
        await deleteRequestTypeForUser(userId, requestTypeToDelete.id);
        const updatedRequestTypes = requestTypes.filter(
          (requestType) => requestType.id !== requestTypeToDelete.id
        );
        const sortedUpdatedRequestTypes = sortByCreatedAt(updatedRequestTypes);
        setRequestTypes(sortedUpdatedRequestTypes);
        setFilteredRequestTypes(sortedUpdatedRequestTypes);
        setConfirmDeleteOpen(false);
        setRequestTypeToDelete(null);
        toast.success("Request type deleted successfully!"); // Success toast
      } catch (error) {
        toast.error("An error occurred. Please try again."); // Error toast
      }
    }
  };

  const handleDeleteClick = (requestType: RequestType) => {
    setRequestTypeToDelete(requestType);
    setConfirmDeleteOpen(true);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteOpen(false);
    setRequestTypeToDelete(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequestTypes = filteredRequestTypes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" className="request-type-list-container">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsEditMode(false);
            setCurrentRequestType(null);
            setOpen(true);
          }}
        >
          <AddIcon /> Add Request Type
        </Button>

        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Search Request Types"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <RequestTypeDialog
          open={open}
          onClose={() => setOpen(false)}
          initialRequestType={currentRequestType?.requestType || ""}
          initialPurpose={currentRequestType?.purpose || ""}
          initialRequestTypeOwner={currentRequestType?.requestTypeOwner || ""}
          initialInformationToCollect={
            currentRequestType?.informationToCollect || []
          }
          onSubmit={handleDialogSubmit}
        />
        <List>
          {currentRequestTypes.map((requestType) => (
            <ListItem key={requestType.id} className="list-item">
              <Card key={requestType.id} className="request-type-card">
                <CardContent>
                  <Typography variant="h6" component="div">
                    {requestType.requestType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {requestType.purpose}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEdit(requestType)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteClick(requestType)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </ListItem>
          ))}
        </List>

        <Pagination
          count={Math.ceil(filteredRequestTypes.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          className="pagination"
        />

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={confirmDeleteOpen}
          onClose={handleCancelDelete}
          aria-labelledby="delete-confirmation-dialog"
        >
          <DialogTitle id="delete-confirmation-dialog">
            Delete Request Type
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the request type "
              {requestTypeToDelete?.requestType}"?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      {/* Toast container */}
      <ToastContainer />
    </>
  );
};

export default RequestTypeList;
