import React from "react";
import { Box, Grid } from "@mui/material";
import { Colors } from "../../constants/Colors";

const PasswordRules = () => {
  const password_rules_list = [
    "one uppercase character",
    "one lowercase character",
    "one numeric character",
    "six characters in length"
  ];
  return (
    <Box
      sx={{
        backgroundColor: Colors.white,
        height: "45%",
        margin: "auto",
        top: "30%",
        width: "30%",
        position: "absolute",
        borderRadius: "1rem",
        padding: "1rem",
        boxShadow: 2,
        verticalAlign: "middle"
      }}
    >
      <Grid container spacing={2} sx={{ margin: "auto" }}>
        <Box
          sx={{
            fontFamily: "Inria Sans",
            fontSize: { md: "1rem", sm: "1rem", xs: "1.2rem" },
            color: Colors.primaryColor,
            fontWeight: 700,
            marginTop: 2
          }}
        >
          Password must contain atleast:
        </Box>
        <Box sx={{ marginTop: "0.5rem" }}>
          {password_rules_list.map((e) => (
            <Box
              sx={{
                fontFamily: "Inria Sans",
                color: Colors.primaryColor,
                marginBottom: "0.5",
                fontSize: { md: "1rem", sm: "1rem", xs: "1.1rem" }
              }}
            >
              - {e}
            </Box>
          ))}
        </Box>
      </Grid>
    </Box>
  );
};

export default PasswordRules;
