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
  const navigate = useNavigate();
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
                maxWidth: "80%"
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
        <Grid item md={12} xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Inria Sans",
              color: Colors.primaryColor,
              fontWeight: "800",
              textAlign: "center",
              fontSize: { md: "1.5rem", xs: "1.2rem" },
              maxWidth: "100%",
              marginBottom: "2rem",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: Colors.primaryColor,
                color: Colors.white,
                "&:hover": {
                  backgroundColor: Colors.primaryColorDark
                }

              }}
              onClick={() => navigate('/quiz')}
            >
              Find your learning pathway!
            </Button>
            <Box
              sx={{
                fontFamily: "Inria Sans",
                color: Colors.primaryColor,
                fontWeight: "700",
                textAlign: "center",
                fontSize: { md: "1.5rem", xs: "1.2rem" },
                marginTop: "1rem"
              }}
            >
              OR
            </Box>
            <Box
              sx={{
                fontFamily: "Inria Sans",
                color: Colors.primaryColor,
                fontWeight: "700",
                textAlign: "center",
                fontSize: { md: "2.5rem", xs: "1.2rem" },
                marginTop: "1rem"
              }}
            >
              Explore All Materials!
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};



export default HomeIntro;
