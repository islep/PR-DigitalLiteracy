import React, { useState, useEffect, useRef } from "react";
import { Colors } from "../../../../constants/Colors";
import {
  Box,
  Grid,
  TextField,
  Icon
} from "@mui/material";
import { multiLineInputStyle } from "../styles";
import { useAuth } from "../../../../firebase/AuthContext";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Timestamp, doc, setDoc, getDoc } from "firebase/firestore"; // Added setDoc here
import { db } from "../../../../firebase/firebase";
import { updateData } from "../../../../firebase/firebaseReadWrite";
const ObjectiveForm = ({ dataFromObjective, dataFromFirebase }) => {
  const { currentUser } = useAuth();
  const [objective, setObjective] = useState("");
  const [openHelp, setOpenHelp] = useState(false);
  const [debouncedObjective, setDebouncedObjective] = useState(objective);
  //throttle
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const dataFromFirebase = docSnap.data().resumeData;
          if (dataFromFirebase && dataFromFirebase.objective && !objective) {
            setObjective(dataFromFirebase.objective);
          }
        }
      }
    };

    fetchData();
  }, [currentUser]);

  const saveData = async (value) => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      await setDoc(docRef, { resumeData: { objective: value } });
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setObjective(value);
    clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveData(value);
    }, 1000);
  };
  useEffect(() => {
    setDebouncedObjective(objective);
  }, [objective]);

  useEffect(() => {
    return () => {
      clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  const showHelpModal = () => {
    const handleClose = () => {
      setOpenHelp(false);
    };

    const sendHelpToDatabase = () => {
      const docRef = doc(db, "users", currentUser.uid);
      setOpenHelp(false);

      updateData(docRef, {
        ObjectiveFormHelp: true,
        lastHelpRequestDate: Timestamp.fromDate(new Date())
      });
    };
    return (
      <Dialog
        open={openHelp}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Call for Help?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            We are sorry you are having trouble in filling the form. Would you
            like Project Rebound Staff to assist you?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No, Thank You</Button>
          <Button onClick={sendHelpToDatabase} autoFocus>
            Yes, Please
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: Colors.backgroundColor,
        height: "auto",
        borderRadius: "1rem",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        margin: "auto",
        paddingBottom: "2rem",
        width: "90%"
      }}
    >
      {/* Heading row */}
      <Grid container spacing={2} sx={{ margin: "auto", width: "97%" }}>
        {/* Heading Text */}
        <Grid item md={8} xs={8}>
          <Box
            sx={{
              fontWeight: "700",
              fontSize: { md: "1.3rem", sm: "1rem", xs: "1.2rem" },
              color: Colors.primaryColor
            }}
          >
            Objective
          </Box>
          <Box
            sx={{
              fontSize: {
                md: "1rem",
                sm: "0.8rem",
                xs: "0.8rem",
                fontFamily: "Inria Sans",
                color: Colors.primaryColor
              }
            }}
          >
            Give an objective or summary for your choice. Please feel free to
            skip this section
          </Box>
        </Grid>
        {/* Help Button */}
        <Grid item md={4} xs={4}>
          <Box
            sx={{
              float: "right",
              display: "flex",
              bgcolor: { md: Colors.white, sm: Colors.white, xs: "None" },
              paddingRight: { md: "1.2rem", sm: "1rem", xs: "0.5rem" },
              paddingLeft: { md: "1.2rem", sm: "1rem", xs: "0.5rem" },
              marginRight: "0.5rem",
              cursor: "pointer"
            }}
            onClick={() => {
              setOpenHelp(true);
            }}
          >
            <Box
              sx={{
                display: { md: "flex", sm: "flex", xs: "None" },
                borderRadius: "0.1rem",
                fontSize: { md: "1rem", sm: "0.7rem", xs: "0.7rem" },
                color: Colors.primaryColor,
                fontWeight: "700"
              }}
            >
              <p>Need Help</p>
            </Box>
            <Box
              sx={{
                color: Colors.primaryColor,
                marginTop: { md: "0.85rem", sm: "0.5rem", xs: "0 " },
                marginLeft: "0.5rem"
              }}
            >
              <Icon>help_circle</Icon>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{ margin: "auto", width: "97%", paddingRight: "0.5rem" }}
      >
        {/* Description row */}
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" }
              }}
              autoComplete="off"
            >
              <TextField
                sx={multiLineInputStyle}
                InputProps={{
                  disableUnderline: true
                }}
                label="Objective / Summary"
                variant="standard"
                multiline
                disabled={false}
                value={objective}
                name="description"
                onChange={(e) => {
                  handleChange(e);
                }}
                rows={4}
              />
            </Box>
          </Grid>
        </Grid>

        {/* This is the isSkipped row */}
        {/* <Grid item xs={12}>
          <FormControlLabel
            sx={inputStyle}
            checked={isSkipped}
            control={<Checkbox sx={inputStyle} />}
            label="Skip Objective"
            onChange={() => {
              setSkipped(!isSkipped);
            }}
          />
        </Grid> */}
      </Grid>
      {openHelp ? showHelpModal() : <div />}
    </Box>
  );
};

export default ObjectiveForm;
