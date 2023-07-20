import * as React from "react";
import styles from "./index.module.css";
import { Box, Grid, Button } from "@mui/material";
import HomeIntroImage from "../../../../assets/images/tech-meeting-pic.png";
import { Colors } from "../../../../constants/Colors";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-scroll";
import HomeMain from "../HomeMain";
import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const HomeIntro = () => {
  return (
    <Box sx={styles.homeContainer}>
      <Grid container spacing={2}>
        <Grid item md={7} xs={12}>
          <Box sx={{ ...styles.titleContainer, maxWidth: "100%" }}>
            <Box
              sx={{
                marginTop: "2rem",
                textAlign: "left",
                marginLeft: { md: "8rem", sm: "8rem", xs: "1rem" },
                maxWidth: "100%"
              }}
            >
              <Box
                sx={{
                  fontFamily: "Inria Sans",
                  color: Colors.primaryColor,
                  fontWeight: "700",
                  textAlign: "left",
                  fontSize: {
                    md: "2.5rem",
                    sm: "3rem",
                    xs: "2rem"
                  },
                  maxWidth: "100%"
                }}
              >
                Tech is for Everyone!
              </Box>

              <Box
                sx={{
                  fontFamily: "Inria Sans",
                  color: Colors.primaryColor,
                  fontWeight: "700",
                  textAlign: "left",
                  fontSize: { md: "1.5rem", xs: "1.2rem" },
                  maxWidth: "100%",
                  marginBottom: "2rem"
                }}
              >
                Collaborative support to use technology in meeting our goals!
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item md={5} xs={12}>
          <Box
            sx={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              alignItems: "center",
              fontFamily: "Inria Sans",
              color: Colors.primaryColor,
              fontWeight: "700",
              textAlign: "left",
              fontSize: { md: "1.5rem", xs: "1.2rem" },
              maxWidth: "100%",
              marginBottom: "2rem"
            }}
          >
            <Button
              variant="contained"
              sx={{
                marginTop: "3rem",
                marginRight: "13rem",
                backgroundColor: Colors.primaryColor,
                color: Colors.white,
                "&:hover": {
                  backgroundColor: Colors.primaryColorDark
                }
              }}
              onClick={useNavigate('/quiz')}
            >
              Click here to take our quiz!
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};



export default HomeIntro;
