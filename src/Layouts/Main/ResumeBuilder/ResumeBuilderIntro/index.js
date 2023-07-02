import { Colors } from "../../../../constants/Colors";
import styles from "./index.module.css";
import { Box, Grid } from "@mui/material";
import ResumeBuilderImage from "../../../../assets/images/resume-builder-pic.png";

const ResumeBuilderIntro = () => {
  return (
    <div>
      <div className={styles.homeContainer}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <div className={styles.titleContainer}>
              <Box
                sx={{
                  marginTop: { md: "4rem", sm: "2rem", xs: "2rem" },
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
                      md: "2.75rem",
                      sm: "3rem",
                      xs: "2rem"
                    }
                  }}
                >
                  Follow our steps to get best support with your job
                  application!
                </Box>
              </Box>
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box
              component="img"
              sx={{
                display: { xs: "flex" },
                mr: 1,
                margin: "auto",
                width: { md: "45%", xs: "40%" },
                marginTop: { xs: "2rem" }
              }}
              alt="resume-builder"
              src={ResumeBuilderImage}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ResumeBuilderIntro;
