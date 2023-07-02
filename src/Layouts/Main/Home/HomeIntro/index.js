import * as React from "react";
import styles from "./index.module.css";
import { Box, Grid, Button } from "@mui/material";
import HomeIntroImage from "../../../../assets/images/tech-meeting-pic.png";
import { Colors } from "../../../../constants/Colors";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-scroll";

const HomeIntro = () => {
  return (
    <Box sx={styles.homeContainer}>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Box sx={styles.titleContainer}>
            <Box
              sx={{
                marginTop: "2rem",
                textAlign: "center",
                marginLeft: { md: "8rem", sm: "8rem", xs: "1rem" }
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
                  }
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
                  fontSize: { md: "1.5rem", xs: "1.2rem" }
                }}
              >
                Powerful. Convenient. Accessible.
              </Box>

              <Box
                sx={{
                  marginTop: "5rem",
                  fontFamily: "Inria Sans",
                  color: Colors.primaryColor,
                  textAlign: "left",
                  fontSize: { md: "1.5rem", xs: "1.2rem" }
                }}
              >
                Collaborative support to use technology in meeting our goals!
              </Box>
            </Box>

            <Link to="#homeMain" smooth={true}>
              <Button
                sx={{
                  marginTop: "5rem",
                  fontFamily: "Inria Sans",
                  color: Colors.white,
                  backgroundColor: Colors.primaryColor,
                  fontSize: { md: "1.5rem", xs: "1.2rem" },
                  marginLeft: { md: "8rem", sm: "8rem", xs: "1rem" },
                  "&:hover": {
                    backgroundColor: Colors.primaryColorLight,
                    boxShadow: "5rem",
                    transition: "0.2s"
                  }
                }}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Explore
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box
            component="img"
            sx={{
              display: { xs: "flex" },
              mr: 1,
              margin: "auto",
              width: { md: "70%", xs: "50%" },

              marginTop: { xs: "2rem" }
            }}
            alt="project-rebound-logo"
            src={HomeIntroImage}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeIntro;
