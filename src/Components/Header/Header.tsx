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

const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" className="header-appbar">
      <div className="logo-container">
        <Logo />
      </div>

      <Box className="header-nav">
        <a href="/about" className="header-navlink">
          About Us
        </a>
        <a href="/" className="header-navlink">
          Log out
        </a>
      </Box>
    </AppBar>
  );
};

export default Header;
