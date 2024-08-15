import React from "react";
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
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FolderIcon from "@mui/icons-material/Folder";
import GavelIcon from "@mui/icons-material/Gavel";
import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <Box className="sidebar-container">
      <Box className="sidebar-logo">
        <img
          src="path-to-your-logo.png"
          alt="Coheso Logo"
          className="sidebar-logo-image"
        />
        <Typography variant="h6" className="sidebar-title">
          Coheso
        </Typography>
      </Box>
      <Box className="sidebar-search">
        <InputBase
          placeholder="Search ⌘+K"
          startAdornment={<SearchIcon />}
          className="sidebar-search-input"
        />
      </Box>
      <List className="sidebar-nav">
        <ListItem button className="sidebar-navitem selected">
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Compliance, Regulatory & Data Privacy" />
        </ListItem>
        <ListItem button className="sidebar-navitem">
          <ListItemIcon>
            <GavelIcon />
          </ListItemIcon>
          <ListItemText primary="Contracts & Commercial" />
        </ListItem>
        <ListItem button className="sidebar-navitem">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Employment Law & HR" />
        </ListItem>
        <ListItem button className="sidebar-navitem">
          <ListItemIcon>
            <BusinessCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Litigation & Dispute Resolution" />
        </ListItem>
        <ListItem button className="sidebar-navitem">
          <ListItemIcon>
            <BusinessCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Corporate Transactions and M&A" />
        </ListItem>
        <ListItem button className="sidebar-navitem">
          <ListItemIcon>
            <ControlPointIcon />
          </ListItemIcon>
          <ListItemText primary="Legato Command Center" />
        </ListItem>
      </List>
      <Box className="sidebar-profile">
        <Avatar alt="Eleanor Pena" src="path-to-avatar.jpg" />
        <Box className="sidebar-profile-info">
          <Typography variant="body2">Eleanor Pena</Typography>
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
    </Box>
  );
};

export default Sidebar;
