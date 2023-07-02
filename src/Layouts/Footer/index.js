import React from "react";
import { Box, Typography } from "@mui/material";
import { Colors } from "../../constants/Colors";

const Footer = () => {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: Colors.primaryColor,
          height: "4rem",
          marginTop: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography
          sx={{
            color: Colors.white,
            fontFamily: "Inria Sans",
            textAlign: "center",
            fontSize: { md: "1rem", xs: "0.7rem" }
          }}
        >
          © {new Date().getFullYear()} Project Rebound | All Rights Reserved
        </Typography>
      </Box>
    </div>
  );
};

export default Footer;
