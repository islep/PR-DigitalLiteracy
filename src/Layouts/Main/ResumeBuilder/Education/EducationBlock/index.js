import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { Colors } from "../../../../../constants/Colors";
import { formBackground } from "../../styles";
import EducationForm from "../EducationForm";

const EducationBlock = ({
  dataFromEducationInfoFromProps,
  dataFromFirebase
}) => {
  const education_list = [
    "High School",
    "GED",
    "College (Courses)",
    "Vocational Training"
  ];
  const [educationInfo, setEducationInfo] = useState();
  const [loading, setLoading] = useState(true);

  const dataFromEducationInfo = (educationInfo) => {
    setEducationInfo(educationInfo);
  };

  useEffect(() => {
    dataFromEducationInfoFromProps(educationInfo);
    // eslint-disable-next-line
  }, [dataFromEducationInfoFromProps, educationInfo]);

  return (
    <div>
      <Box sx={formBackground}>
        <Grid container spacing={2}>
          <Grid item sm={9} xs={12} order={{ xs: 2, md: 1, sm: 1 }}>
            <Box>
              <EducationForm
                dataFromEducationInfo={dataFromEducationInfo}
                dataFromFirebase={educationInfo}
              />
            </Box>
          </Grid>

          <Grid item sm={3} xs={12} order={{ xs: 1, md: 2, sm: 2 }}>
            {/* Notes Block */}
            <Box
              sx={{
                backgroundColor: Colors.backgroundColor,
                height: "auto",
                borderRadius: "1rem",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                margin: "auto",
                padding: "0.5rem"
              }}
            >
              <Grid container spacing={2} sx={{ margin: "auto" }}>
                <Box
                  sx={{
                    fontFamily: "Inria Sans",
                    fontSize: { md: "1.3rem", sm: "1rem", xs: "1.2rem" },
                    color: Colors.primaryColor,
                    fontWeight: 700
                  }}
                >
                  Remember to list your different degrees!
                </Box>
                <Box sx={{ marginTop: "0.5rem" }}>
                  {education_list.map((e, index) => (
                    <Box
                      sx={{
                        marginLeft: {
                          md: "0.5rem",
                          sm: "0.5rem",
                          xs: "1.1rem"
                        },
                        fontFamily: "Inria Sans",
                        color: Colors.primaryColor,
                        marginBottom: "0.5",
                        fontSize: { md: "1.1rem", sm: "1rem", xs: "1.1rem" }
                      }}
                      key={`education-list-${index}`}
                    >
                      - {e}
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EducationBlock;
