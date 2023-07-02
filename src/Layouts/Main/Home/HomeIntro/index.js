import * as React from "react";
import styles from "./index.module.css";
import { Box, Grid, Button } from "@mui/material";
import HomeIntroImage from "../../../../assets/images/tech-meeting-pic.png";
import { Colors } from "../../../../constants/Colors";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-scroll";
import HomeMain from "../HomeMain";
import { Home } from "@mui/icons-material";
const HomeIntro = () => {
  return (
    <Box sx={styles.homeContainer}>
      <Grid container spacing={2}>
        <Grid item md={7} xs={12}>
          <Box sx={styles.titleContainer} sx={{ maxWidth: "100%" }}>
            <Box
              sx={{
                marginTop: "2rem",
                textAlign: "center",
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
        {/* <Grid item md={5} xs={12}>
          <Box
            component="img"
            sx={{
              display: { xs: "flex" },
              mr: 1,
              margin: "auto",
              width: { md: "60%", xs: "50%" }, // Reduced the width here

              marginTop: { xs: "2rem" }
            }}
            alt="project-rebound-logo"
            src={HomeIntroImage}
          />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default HomeIntro;
