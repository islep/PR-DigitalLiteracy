import React, { useState, useEffect } from "react";
import { Colors } from "../../../../../constants/Colors";
import { Box, Grid } from "@mui/material";
import ProfessionalExperienceForm from "../ProfessionalExperienceForm";
import { db } from "../../../../../firebase/firebase";
import { useAuth } from "../../../../../firebase/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { list_style } from "./styles";

const ProfessionalExperienceBlock = ({
  dataFromProfessionalExperienceInfoProps,
  dataFromFirebase
}) => {
  const { currentUser } = useAuth();
  let docRef;
  if (currentUser !== null) {
    docRef = doc(db, "users", currentUser.uid);
  }
  const [professionalExperienceInfo, setProfessionalExperienceInfo] =
    useState();

  const [experience_list, setExperienceList] = useState([]);

  const dataFromProfessionalExperienceInfo = (professionalExperienceInfo) => {
    setProfessionalExperienceInfo(professionalExperienceInfo);
  };

  useEffect(() => {
    dataFromProfessionalExperienceInfoProps(professionalExperienceInfo);
    if (currentUser !== null) {
      const unsubscribe = onSnapshot(docRef, (doc) => {
        setExperienceList(() => {
          let newList = [];
          if (doc.data() !== undefined) {
            newList = doc.data().skills_list;
            // eslint-disable-next-line
            if (newList !== undefined) {
              // eslint-disable-next-line
              newList.map((e, index) => {
                if (index < newList.length) {
                  experience_list.push(e.name);
                }
              });
            }
          }

          return newList;
        });
      });

      return () => {
        unsubscribe();
      };
    }
    // eslint-disable-next-line
  }, [dataFromProfessionalExperienceInfoProps, professionalExperienceInfo]);

  return (
    <Box
      sx={{
        height: "auto",
        borderRadius: "1rem",
        margin: "auto",
        paddingBottom: "2rem",
        width: "90%"
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={9} sm={9} xs={12} order={{ xs: 2, md: 1, sm: 1 }}>
          <ProfessionalExperienceForm
            dataFromProfessionalExperienceInfo={
              dataFromProfessionalExperienceInfo
            }
            dataFromFirebase={dataFromFirebase}
          />
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
              padding: "0.5rem",
              width: "100%"
            }}
          >
            <Grid container spacing={2} sx={{ margin: "auto" }}>
              {experience_list !== undefined && experience_list.length > 0 ? (
                <Box
                  sx={{
                    fontFamily: "Inria Sans",
                    fontSize: { md: "1.2rem", sm: "1rem", xs: "1rem" },
                    color: Colors.primaryColor,
                    fontWeight: 700
                  }}
                >
                  You had previously listed these skills that you wanted to
                  highlight!
                </Box>
              ) : (
                <Box>
                  <Box
                    sx={{
                      fontFamily: "Inria Sans",
                      fontSize: { md: "1.2rem", sm: "1rem", xs: "1rem" },
                      color: Colors.primaryColor,
                      fontWeight: 700
                    }}
                  >
                    Suggested Skills that you can share with your experience.
                  </Box>
                  <Box style={{ marginTop: "1rem" }}>
                    <Box sx={list_style}>- Communication</Box>
                    <Box sx={list_style}>- Time Management</Box>
                    <Box sx={list_style}>- Counseling</Box>
                    <Box sx={list_style}>- Go Getter</Box>
                  </Box>
                </Box>
              )}

              <Box sx={{ marginTop: "0.5rem" }}>
                {experience_list !== undefined ? (
                  experience_list.map((e, index) => (
                    <Box key={index} sx={list_style}>
                      - {e.name}
                    </Box>
                  ))
                ) : (
                  <Box></Box>
                )}
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfessionalExperienceBlock;
