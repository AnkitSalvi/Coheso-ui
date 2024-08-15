import React from "react";
import { Box } from "@mui/material";
import logoImage from "../../Assets/HeaderLogo.avif"; // Update with the actual path to your logo image
import "./Logo.css";

const Logo = () => {
  return (
    <Box
      component="img"
      src={logoImage}
      alt="Coheso Logo"
      className="header-logo"
    />
  );
};

export default Logo;
