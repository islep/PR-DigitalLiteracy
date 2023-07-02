import React, { useState, useEffect } from "react";

import { Box, Grid } from "@mui/material";
import ReferencesForm from "./ReferencesForm";

const References = ({ dataFromFirebase, dataFromReferencesInfoProps }) => {
  const [referenceInfo, setReferenceInfo] = useState();

  const datafromReferencesInfo = (referenceInfo) => {
    setReferenceInfo(referenceInfo);
  };

  useEffect(() => {
    dataFromReferencesInfoProps(referenceInfo);
    // eslint-disable-next-line
  }, [datafromReferencesInfo, dataFromReferencesInfoProps]);

  return (
    <>
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
          <Grid item md={12} sm={12} xs={12}>
            <ReferencesForm
              datafromReferencesInfo={datafromReferencesInfo}
              dataFromFirebase={dataFromFirebase}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default References;
