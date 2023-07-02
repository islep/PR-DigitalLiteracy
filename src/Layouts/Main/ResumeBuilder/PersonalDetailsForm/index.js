import React, { useEffect, useState, useRef } from "react";
import { Colors } from "../../../../constants/Colors";
import { Box, Grid, TextField, Icon } from "@mui/material";
import { inputStyle } from "../styles";
import { useAuth } from "../../../../firebase/AuthContext";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { updateData } from "../../../../firebase/firebaseReadWrite";
import { clear } from "@testing-library/user-event/dist/clear";

const PersonalDetailsForm = ({ dataFromPersonalInfo, dataFromFirebase }) => {
  const { currentUser } = useAuth();
  const saveTimeoutRef = useRef(null);
  const docRef = currentUser ? doc(db, "users", currentUser.uid) : null;


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [openHelp, setOpenHelp] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    state: state,
    zipCode: zipCode,
    phone: phone,
    email: email
  });
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const dataFromFireBase = docSnap.data().resumeData;
          if (dataFromFireBase && dataFromFireBase.personal_info) {
            setFirstName(dataFromFireBase.personal_info.firstName);
            setLastName(dataFromFireBase.personal_info.lastName);
            setAddress(dataFromFireBase.personal_info.address);
            setCity(dataFromFireBase.personal_info.city);
            setState(dataFromFireBase.personal_info.state);
            setZipCode(dataFromFireBase.personal_info.zipCode);
            setPhone(dataFromFireBase.personal_info.phone);
            setEmail(dataFromFireBase.personal_info.email);
          }
        }
      }
    };
    fetchData();
  }, [currentUser]);

  const saveData = async (field, value) => {
    if (currentUser && docRef) {
      await setDoc(docRef, {
        resumeData: {
          personal_info: {
            [field]: value
          }
        }
      }, { merge: true });
    }
  };
  const handleChange = (field, value) => {
    clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveData(field, value);
    }, 500);
  }
  useEffect(() => {
    return () => {
      clearTimeout(saveTimeoutRef.current);
    }
  }, []);
  const handleBlur = (field, value) => {
    saveData(field, value);
  };



  const showHelpModal = () => {
    const handleClose = () => {
      setOpenHelp(false);
    };

    const sendHelpToDatabase = () => {
      setOpenHelp(false);
      //send Help to Firebase

      updateData(docRef, {
        PersonalDetailsFormHelp: true,
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
    <Box>
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
              Personal Details
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
              Please add your personal details
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
          {/* First Name */}
          <Grid item md={6} sm={6} xs={12}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" }
              }}
              autoComplete="off"
            >
              <TextField
                sx={inputStyle}
                label="First Name"
                variant="filled"
                value={firstName}
                name="firstname"
                InputProps={{
                  disableUnderline: true
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  setFirstName(value);
                  handleChange("firstName", value);
                }}
                onBlur={() => handleBlur("firstName", firstName)}
                focused
              />
            </Box>
          </Grid>

          {/* last name        */}
          <Grid item md={6} sm={6} xs={12}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" }
              }}
              autoComplete="off"
            >
              <TextField
                sx={inputStyle}
                label="Last Name"
                variant="filled"
                value={lastName}
                name="lastName"
                onChange={(e) => {
                  const value = e.target.value;
                  setLastName(value);
                  handleChange("lastName", value);
                }}
                InputProps={{
                  disableUnderline: true
                }}
                onBlur={() => handleBlur("lastName", lastName)}
                focused
              />
            </Box>
          </Grid>

          {/* address row */}
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
                  sx={inputStyle}
                  label="Address"
                  variant="filled"
                  value={address}
                  name="address"
                  onChange={(e) => {
                    const value = e.target.value;
                    setAddress(value);
                    handleChange("address", value);
                  }}
                  onBlur={() => handleBlur("address", address)}
                  focused
                  InputProps={{
                    disableUnderline: true
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          {/* City */}
          <Grid item md={4} sm={4} xs={12}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" }
              }}
              autoComplete="off"
            >
              <TextField
                sx={inputStyle}
                label="City"
                variant="filled"
                value={city}
                name="city"
                onChange={(e) => {
                  const value = e.target.value;
                  setCity(value);
                  handleChange("city", value);
                }}
                onBlur={() => handleBlur("city", city)}
                focused
                InputProps={{
                  disableUnderline: true
                }}
              />
            </Box>
          </Grid>

          {/* State */}
          <Grid item md={4} sm={4} xs={12}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" }
              }}
              autoComplete="off"
            >
              <TextField
                sx={inputStyle}
                label="State"
                variant="filled"
                value={state}
                name="state"
                onChange={(e) => {
                  const value = e.target.value;
                  setState(value);
                  handleChange("state", value);

                }}
                onBlur={() => handleBlur("state", state)}
                focused
                InputProps={{
                  disableUnderline: true
                }}
              />
            </Box>
          </Grid>

          {/* Zip Code */}
          <Grid item md={4} sm={4} xs={12}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" }
              }}
              autoComplete="off"
            >
              <TextField
                sx={inputStyle}
                label="Zip Code"
                variant="filled"
                value={zipCode}
                name="zipCode"
                onChange={(e) => {
                  const value = e.target.value;
                  setZipCode(value);
                  handleChange("zipCode", value);
                }}
                onBlur={() => handleBlur("zipCode", zipCode)}
                focused
                InputProps={{
                  disableUnderline: true
                }}
              />
            </Box>
          </Grid>

          {/* Phone */}

          <Grid item md={6} sm={6} xs={12}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" }
              }}
              autoComplete="off"
            >
              <TextField
                sx={inputStyle}
                label="Phone"
                variant="filled"
                value={phone}
                name="phone"
                onChange={(e) => {
                  const value = e.target.value;
                  setPhone(value);
                  handleChange("phone", value);
                }}
                onBlur={() => handleBlur("phone", phone)}
                focused
                InputProps={{
                  disableUnderline: true
                }}
              />
            </Box>
          </Grid>

          {/* Email */}
          <Grid item md={6} sm={6} xs={12}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" }
              }}
              autoComplete="off"
            >
              <TextField
                sx={inputStyle}
                label="Email"
                variant="filled"
                value={email}
                name="email"
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);
                  handleChange("email", value);
                }}
                onBlur={() => handleBlur("email", email)}
                focused
                InputProps={{
                  disableUnderline: true
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {openHelp ? showHelpModal() : <div />}
    </Box>
  );
};

export default PersonalDetailsForm;
