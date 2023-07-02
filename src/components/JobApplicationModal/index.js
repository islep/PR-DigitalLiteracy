import React from "react";
import { Box, Grid } from "@mui/material";
import { Colors } from "../../constants/Colors";
import { useNavigate } from "react-router-dom";
import listIcon1 from "../../assets/images/home-dialog-list-icon-1.png";
import listIcon2 from "../../assets/images/home-dialog-list-icon-2.png";
import listIcon3 from "../../assets/images/home-dialog-list-icon-3.png";

const BackgroundStyle = {
  margin: "auto",
  width: { md: "30%", sm: "30%", xs: "50%" },
  mt: 10,
  bgcolor: Colors.primaryColor,
  borderRadius: "0.5rem",
  boxShadow: 24,
  p: 4
};

const innerComponentStyle = {
  width: { md: "95%", xs: "100%" },
  margin: "auto",
  height: { md: 100, sm: 60, xs: 60 },
  bgcolor: Colors.white,
  marginBottom: { md: "1rem", sm: "0.5rem", xs: "0.5rem" },
  borderRadius: "1rem",
  cursor: "pointer"
};

const DialogElement = (props) => {
  let navigate = useNavigate();
  return (
    <div>
      <Box
        sx={{ margin: "auto", width: "90%" }}
        onClick={() => {
          if (props.index === "1") {
            navigate("/jobSupport");
          } else if (props.index === "2") {
            navigate("/resumeBuilder");
          }
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ margin: "auto" }}>
              <Box
                component="img"
                sx={{
                  display: "flex",
                  mr: 1,
                  width: { md: "6rem", sm: "3rem", xs: "3rem" },
                  marginBottom: "1rem",
                  maxHeight: { md: "auto", sm: "4rem", xs: "2rem" },
                  marginTop: { md: "0.5rem" }
                }}
                alt="project-rebound-logo"
                src={props.image}
              />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box
              component="p"
              sx={{
                fontFamily: "Inria Sans",
                fontSize: { md: "1rem", sm: "0.75rem", xs: "0.5rem" },
                color: Colors.primaryColor,
                display: "flex",
                marginBottom: { md: "0.75rem", xs: "0.4rem" },
                marginTop: "-0.1rem",
                marginLeft: { md: "1.5rem", xs: "0.2rem" }
              }}
            >
              {props.heading}
            </Box>
            <Box
              component="p"
              sx={{
                fontFamily: "Inria Sans",
                fontSize: { md: "0.70rem", sm: "0.5rem", xs: "0.25rem" },
                color: Colors.primaryColor,
                display: "flex",
                marginTop: "-0.2rem",
                marginLeft: { md: "1.5rem", xs: "0.2rem" }
              }}
            >
              {props.desc}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

const JobApplicationModal = () => {
  return (
    <Box sx={BackgroundStyle}>
      <div style={{ marginTop: "2rem" }}>
        <Box sx={innerComponentStyle}>
          <DialogElement
            image={listIcon1}
            heading="Search For a Job"
            desc="Identify your skills using our smart skill identification tool!"
            index="1"
          />
        </Box>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Box sx={innerComponentStyle}>
          <DialogElement
            image={listIcon2}
            heading="Build Your Resume"
            desc="Use our Q&A Prompts to build a professional resume with

your skills."
            index="2"
          />
        </Box>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <Box sx={innerComponentStyle}>
          <DialogElement
            image={listIcon3}
            heading="Ask for Help"
            desc="Post a question to seek help from our community!"
            index="3"
          />
        </Box>
      </div>
    </Box>
  );
};

export default JobApplicationModal;
