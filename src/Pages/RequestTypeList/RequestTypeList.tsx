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
  InputAdornment,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useRequestTypeContext } from "../../Context/RequestTypeContext";
import Header from "../../Components/Header/Header";
import RequestTypeDialog from "../../Components/RequestTypeDialog/RequestTypeDialog";
import Sidebar from "../../Components/Sidebar/Sidebar";
import {
  addRequestTypeForUser,
  getRequestTypesForUser,
  updateRequestTypeForUser,
  deleteRequestTypeForUser,
} from "../../Common/apiCalls";
import RequestTypeCard from "../../Components/RequestTypeCard/RequestTypeCard";
import { RequestType } from "../../Context/RequestTypeContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../Context/UserContext";
import DeleteConfirmationDialog from "../../Components/DeleteConfirmationDialog/DeleteConfirmationDialog";

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

  const { user } = useUser();
  // TODO: Fetch the userId from auth context
  const [userId, setUserId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id);
    }
  }, [user]);

  useEffect(() => {

    if (userId) {
      getRequestTypesForUser(userId)
        .then((data) => {
          const sortedData = sortByCreatedAt(data);
          setRequestTypes(sortedData);
          setFilteredRequestTypes(sortedData);
        })
        .catch((e) => console.log(e));
    }
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
        toast.success("Request type updated successfully!");
      } else {
        await addRequestTypeForUser(userId, values);
        const newRequestTypes = [...requestTypes, values];
        const sortedNewRequestTypes = sortByCreatedAt(newRequestTypes);
        setRequestTypes(sortedNewRequestTypes);
        toast.success("Request type added successfully!");
      }
      setOpen(false);
      setIsEditMode(false);
      setCurrentRequestType(null);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
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
        toast.success("Request type deleted successfully!");
      } catch (error) {
        toast.error("An error occurred. Please try again.");
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
      <Container className="request-type-list-parent-container">
        <Sidebar />
        <Container maxWidth="md" className="request-type-list-container">
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Search Request Types"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            className="search-textfield"
          />

          <Button
            variant="contained"
            color="primary"
            className="add-request-type-button"
            onClick={() => {
              setIsEditMode(false);
              setCurrentRequestType(null);
              setOpen(true);
            }}
          >
            <AddIcon /> Add Request Type
          </Button>

          <RequestTypeDialog
            open={open}
            onClose={() => setOpen(false)}
            initialRequestType={currentRequestType?.requestType || ""}
            initialPurpose={currentRequestType?.purpose || ""}
            initialRequestTypeOwner={currentRequestType?.requestTypeOwner || ""}
            requestId={currentRequestType?.id || ""}
            initialInformationToCollect={
              currentRequestType?.informationToCollect || []
            }
            onSubmit={handleDialogSubmit}
          />
          {currentRequestTypes.length > 0 ? (
            <List className="card-list">
              {currentRequestTypes.map((requestType) => (
                <RequestTypeCard
                  requestType={requestType}
                  handleEdit={handleEdit}
                  handleDeleteClick={handleDeleteClick}
                />
              ))}
            </List>
          ) : (
            <Container className="no-content-container">
              <img
                src="https://cdn.dribbble.com/users/683081/screenshots/2728654/media/d6f3cc39f60fcd48bc2236264b4748b9.png"
                alt="No Request Types"
                className="no-content-image"
              />
              <Typography variant="h6" className="no-content-text">
                Try adding some!!
              </Typography>
            </Container>
          )}

          <Pagination
            count={Math.ceil(filteredRequestTypes.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            className="pagination"
          />

          <DeleteConfirmationDialog
            open={confirmDeleteOpen}
            onClose={handleCancelDelete}
            onConfirm={handleDelete}
            requestTypeToDelete={requestTypeToDelete}
          />
        </Container>
      </Container>
      <ToastContainer />
    </>
  );
};

export default RequestTypeList;
