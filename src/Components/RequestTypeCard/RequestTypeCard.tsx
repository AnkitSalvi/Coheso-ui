import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  CardActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUser } from "../../Context/UserContext";
import "./RequestTypeCard.css";

interface RequestTypeCardProps {
  requestType: {
    id: string;
    requestType: string;
    purpose: string;
    createdAt: string;
  };
  handleEdit: (requestType: any) => void;
  handleDeleteClick: (requestType: any) => void;
}

const RequestTypeCard: React.FC<RequestTypeCardProps> = ({
  requestType,
  handleEdit,
  handleDeleteClick,
}) => {
  const { user } = useUser();
  return (
    <Card key={requestType.id} className="request-type-card">
      <CardContent>
        <Box className="card-header">
          <Typography variant="h6" component="div">
            {requestType.requestType}
          </Typography>
          <Typography variant="caption" className="request-date">
            {new Date(requestType.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        </Box>

        <Box className="requestor-info">
          <img
            src="https://cdn.dribbble.com/users/683081/screenshots/2728654/media/d6f3cc39f60fcd48bc2236264b4748b9.png"
            alt="Requestor"
            className="requestor-avatar"
          />
          <Box>
            <Typography variant="body2" className="requestor-name">
              {user?.email}
            </Typography>
          </Box>
        </Box>

        <Box className="card-details">
          <Box className="purpose">
            <Typography variant="body2">Purpose</Typography>
            <Typography variant="h6" className="truncate-text">
              {requestType.purpose}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => handleEdit(requestType)}
          className="action-icon"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleDeleteClick(requestType)}
          className="action-icon"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RequestTypeCard;
