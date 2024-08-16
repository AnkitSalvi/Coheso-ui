import React, { useState } from "react";
import {
  Box,
  IconButton,
  Avatar,
  Badge,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FolderIcon from "@mui/icons-material/Folder";
import GavelIcon from "@mui/icons-material/Gavel";
import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useUser } from "../../Context/UserContext";
import "./Sidebar.css";

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user } = useUser();

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Box className="sidebar-container">
      <Box className="sidebar-profile">
        <Avatar alt="Eleanor Pena" src="path-to-avatar.jpg" />
        <Box className="sidebar-profile-info">
          <Typography variant="body2">{user?.name}</Typography>
          <Typography variant="caption" color="textSecondary">
            General Counsel
          </Typography>
        </Box>
        <IconButton>
          <Badge badgeContent={3} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Box>
      {/* <Box className="sidebar-search">
        <InputBase
          placeholder="Search ⌘+K"
          startAdornment={<SearchIcon />}
          className="sidebar-search-input"
        />
      </Box> */}
      <List className="sidebar-nav">
        <ListItem
          button
          className={`sidebar-navitem ${selectedIndex === 0 ? "selected" : ""}`}
          onClick={() => handleListItemClick(0)}
        >
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Compliance, Regulatory & Data Privacy" />
        </ListItem>
        <ListItem
          button
          className={`sidebar-navitem ${selectedIndex === 1 ? "selected" : ""}`}
          onClick={() => handleListItemClick(1)}
        >
          <ListItemIcon>
            <GavelIcon />
          </ListItemIcon>
          <ListItemText primary="Contracts & Commercial" />
        </ListItem>
        <ListItem
          button
          className={`sidebar-navitem ${selectedIndex === 2 ? "selected" : ""}`}
          onClick={() => handleListItemClick(2)}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Employment Law & HR" />
        </ListItem>
        <ListItem
          button
          className={`sidebar-navitem ${selectedIndex === 3 ? "selected" : ""}`}
          onClick={() => handleListItemClick(3)}
        >
          <ListItemIcon>
            <BusinessCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Litigation & Dispute Resolution" />
        </ListItem>
        <ListItem
          button
          className={`sidebar-navitem ${selectedIndex === 4 ? "selected" : ""}`}
          onClick={() => handleListItemClick(4)}
        >
          <ListItemIcon>
            <BusinessCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Corporate Transactions and M&A" />
        </ListItem>
        <ListItem
          button
          className={`sidebar-navitem ${selectedIndex === 5 ? "selected" : ""}`}
          onClick={() => handleListItemClick(5)}
        >
          <ListItemIcon>
            <ControlPointIcon />
          </ListItemIcon>
          <ListItemText primary="Legato Command Center" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
