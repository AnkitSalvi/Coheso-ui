import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import Logo from "../Logo/Logo";
import "./Header.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

const Header = () => {
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useUser();

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/"); // Redirect to login page or another route after logging out
  };
  return (
    <AppBar position="static" className="header-appbar">
      <div className="logo-container">
        <Logo />
      </div>

      <Box className="header-nav">
        <a href="https://www.coheso.ai/" className="header-navlink">
          About Us
        </a>
        {isAuthenticated && (
          <a href="/" className="header-navlink" onClick={handleLogout}>
            Log out
          </a>
        )}
      </Box>
    </AppBar>
  );
};

export default Header;
