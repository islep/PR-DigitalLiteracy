import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Icon,
  TextField,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { Colors } from "../../../../../constants/Colors";
import {
  inputStyle,
  educationFormContainer,
  educationFormSubtitle,
  educationFormTitle,
  helpButtonContainer
} from "../../styles";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useAuth } from "../../../../../firebase/AuthContext";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";
import { updateData } from "../../../../../firebase/firebaseReadWrite";
import dayjs from 'dayjs';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EducationForm = ({ dataFromEducationInfo, dataFromFirebase }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  let docRef;
  if (currentUser !== null) {
    // console.log("uid ", currentUser.uid);
    docRef = doc(db, "users", currentUser.uid);
  }

  const [inputList, setInputList] = useState([
    {
      schoolName: "",
      startDate: "",
      endDate: "",
      schoolLocation: "",
      degree: "",
      fieldOfStudy: "",
      currentlyEnrolled: false
    }
  ]);

  const [count, setCount] = useState(0);

  const date_options = {
    year: "numeric",
    month: "short"
  };
  const [openHelp, setOpenHelp] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from Firebase...");
      try {
        console.log("Current user:", currentUser);
        if (currentUser !== null) {
          console.log(dataFromFirebase);
          if (dataFromFirebase) {
            console.log("Data from Firebase:", dataFromFirebase);
            const educationInfoFromFirebase = dataFromFirebase.education_info;
            if (educationInfoFromFirebase) {
              console.log("Data from Firebase:", educationInfoFromFirebase);
              const updatedInputList = educationInfoFromFirebase.map((item) => ({
                ...item,
                startDate: item.startDate ? item.startDate.toDate() : null,
                endDate: item.endDate ? item.endDate.toDate() : null
              }));
              setInputList(updatedInputList);
              console.log("Updated state:", updatedInputList);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch data from Firebase:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataFromFirebase, currentUser]);

  // eslint-disable-next-line

  const showHelpModal = () => {
    const handleClose = () => {
      setOpenHelp(false);
    };

    const sendHelpToDatabase = () => {
      setOpenHelp(false);
      //send Help to Firebase

      updateData(docRef, {
        EducationFormHelp: true,
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

  const onAddBtnClick = () => {
    let newField = {
      schoolName: "",
      startDate: "",
      endDate: "",
      schoolLocation: "",
      degree: "",
      fieldOfStudy: "",
      currentlyEnrolled: false
    };

    setInputList([...inputList, newField]);
  };

  const removeEducationBtnClick = (index) => {
    let data = [...inputList];
    data.splice(index, 1);
    setInputList(data);
    setCount(count + 1);
  };

  const handleFormChange = async (index, value, name) => {
    try {
      const data = [...inputList];

      if (name === "currentlyEnrolled") {
        data[index].endDate = value ? null : data[index].endDate;
        data[index].currentlyEnrolled = value;
      } else if (name === "startDate" || name === "endDate") {
        if (value === null) {
          data[index][name] = null;
        } else {
          data[index][name] = value.valueOf();
        }
      } else {
        data[index][name] = value;
      }

      setInputList(data);

      // Autosave to Firebase
      if (currentUser) {
        setLoading(true);
        const updatedData = {
          education_info: data.map((item) => {
            const { startDate, endDate, ...rest } = item;
            return {
              ...rest,
              startDate: startDate ? Timestamp.fromMillis(startDate) : null,
              endDate: endDate ? Timestamp.fromMillis(endDate) : null
            };
          })
        };
        await updateDoc(docRef, updatedData);
        console.log("Data saved to Firebase:", updatedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error in handleFormChange:", error);
    }
  };


  const educationFormFunction = inputList.map((input, index) => {
    return (
      <Box key={index}>
        {index === 0 ? (
          <div></div>
        ) : (
          <Grid
            container
            spacing={2}
            sx={{
              margin: "auto",
              width: "97%",
              paddingRight: "0.5rem",
              marginTop: "1rem"
            }}
          >
            <Grid item md={6} sm={6} xs={12} order={{ xs: 1 }}>
              <Box
                sx={{
                  width: "97%",
                  margin: "auto",
                  color: Colors.primaryColor,
                  fontWeight: "700"
                }}
              >
                Education #{index + 1}
              </Box>
            </Grid>

            <Grid item md={6} sm={6} xs={12} order={{ xs: 1 }}>
              <Box
                sx={{
                  color: Colors.primaryColor,
                  fontSize: { sm: "1rem", xs: "0.8rem" },
                  textAlign: "right",
                  paddingRight: "1rem",
                  cursor: "pointer"
                }}
                onClick={() => {
                  removeEducationBtnClick(index);
                }}
              >
                - Remove Education
              </Box>
            </Grid>
          </Grid>
        )}
        <Grid
          key={index}
          id={`education-form-${index}`}
          container
          spacing={2}
          sx={{ margin: "auto", width: "97%", paddingRight: "0.5rem" }}
        >
          {/* School Name */}
          <Grid item md={6} sm={6} xs={12} order={{ xs: 1 }}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" }
              }}
              id={`schoolName-${index}`}
            >
              <TextField
                sx={inputStyle}
                label="School Name"
                variant="filled"
                value={input.schoolName}
                name="schoolName"
                focused
                onChange={(e) => {
                  handleFormChange(index, e.target.value, "schoolName");
                }}
                InputProps={{
                  disableUnderline: true
                }}
              />
            </Box>
          </Grid>

          {/* Start Date*/}
          {/* Start Date*/}
          <Grid item md={6} sm={6} xs={12} order={{ xs: 2 }}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" }
              }}
              autoComplete="off"
              id={`startDate-${index}`}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Box
                    sx={{
                      marginTop: "1rem",
                      color: Colors.primaryColor,
                      fontSize: "1rem",
                      fontFamily: "Inria Sans",
                      fontWeight: "700",
                      marginLeft: "0.5rem"
                    }}
                  >
                    Start Date
                  </Box>
                </Grid>
                <Grid item xs={9}>
                  <ReactDatePicker
                    selected={input.startDate}
                    onChange={(date) => handleFormChange(index, date, "startDate")}
                    dateFormat="MMMM-yyyy"
                    showMonthYearPicker
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* End Date*/}
          <Grid item md={6} sm={6} xs={12} order={{ xs: 4 }}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" }
              }}
              autoComplete="off"
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Box
                    sx={{
                      marginTop: "1rem",
                      color: Colors.primaryColor,
                      fontSize: "1rem",
                      fontFamily: "Inria Sans",
                      fontWeight: "700",
                      marginLeft: "0.5rem"
                    }}
                  >
                    End Date
                  </Box>
                </Grid>
                <Grid item xs={9}>
                  {input.currentlyEnrolled ?
                    <div style={{ height: '54px' }} /> : // Adjust the height as needed
                    <ReactDatePicker
                      selected={input.endDate}
                      onChange={(date) => handleFormChange(index, date, "endDate")}
                      dateFormat="MMMM-yyyy"
                      showMonthYearPicker
                    />
                  }
                </Grid>
              </Grid>
            </Box>
          </Grid>
          {/* School Location */}
          <Grid item md={6} sm={6} xs={12} order={{ xs: 3 }}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" }
              }}
              autoComplete="off"
            >
              <TextField
                sx={inputStyle}
                label="School Location"
                variant="filled"
                value={input.schoolLocation}
                focused
                name="schoolLocation"
                onChange={(e) => {
                  handleFormChange(index, e.target.value, "schoolLocation");
                }}
                id={`schoolLocation-${index}`}
                InputProps={{
                  disableUnderline: true
                }}
              />
            </Box>
          </Grid>

          {/* Empty Space */}
          <Grid item md={6} sm={6} xs={12} order={{ xs: 5 }}></Grid>

          {/* Degree*/}
          <Grid item md={6} sm={6} xs={12} order={{ xs: 6 }}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" }
              }}
              autoComplete="off"
            >
              <TextField
                sx={inputStyle}
                label="Degree"
                focused
                variant="filled"
                value={input.degree}
                name="degree"
                onChange={(e) => {
                  handleFormChange(index, e.target.value, "degree");
                }}
                id={`fieldOfStudy-${index}`}
                InputProps={{
                  disableUnderline: true
                }}
              />
            </Box>
          </Grid>

          {/* Degree */}
          <Grid item md={6} sm={6} xs={12} order={{ xs: 5 }}>
            <Box
              component="form"
              sx={{
                marginLeft: "0.5rem",
                "& > :not(style)": { width: "100%" }
              }}
              autoComplete="off"
            >
              <FormControlLabel
                sx={inputStyle}
                control={
                  <Checkbox
                    sx={inputStyle}
                    name="currentlyEnrolled"
                    checked={
                      input.currentlyEnrolled !== null &&
                        input.currentlyEnrolled !== undefined
                        ? input.currentlyEnrolled
                        : false
                    }
                    onChange={(e) => {
                      handleFormChange(index, e.target.checked, "currentlyEnrolled");
                    }}
                  />
                }
                label="I am currently enrolled here"
              />
            </Box>
          </Grid>

          {/* Field of Study */}
          <Grid item md={6} sm={6} xs={12} order={{ xs: 6 }}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" }
              }}
              autoComplete="off"
            >
              <TextField
                sx={inputStyle}
                label="Field Of Study"
                focused
                variant="filled"
                value={input.fieldOfStudy}
                name="fieldOfStudy"
                onChange={(e) => {
                  handleFormChange(index, e.target.value, "fieldOfStudy");
                }}
                id={`fieldOfStudy-${index}`}
                InputProps={{
                  disableUnderline: true
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  });
  if (loading) {
    return <p>Loading...</p>
  } else {
    return (

      <Box sx={educationFormContainer}>
        <Grid container spacing={2} sx={{ margin: "auto", width: "97%" }}>
          {/* Heading Row */}

          <Grid item md={8} xs={8}>
            <Box sx={educationFormTitle}>Education/School</Box>
            <Box sx={educationFormSubtitle}>
              You can add relevant courses, bootcamps or programs that you are
              enrolled in.
            </Box>
          </Grid>

          {/* Help Button */}
          <Grid item md={4} xs={4}>
            <Box
              sx={helpButtonContainer}
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

        {educationFormFunction}

        {/* Button to add another block */}
        <Grid container spacing={2} sx={{ margin: "auto", width: "97%" }}>
          <Grid item md={6} xs={3}></Grid>
          <Grid item md={6} xs={9}>
            <Box
              sx={{
                color: Colors.primaryColor,
                fontSize: { sm: "1rem", xs: "0.8rem" },
                textAlign: "end",
                marginTop: "1rem",
                paddingRight: "1rem",
                cursor: "pointer"
              }}
              onClick={onAddBtnClick}
            >
              + Add Another Education
            </Box>
          </Grid>
        </Grid>
        {openHelp ? showHelpModal() : <div />}
      </Box>
    );
  }
};

export default EducationForm;