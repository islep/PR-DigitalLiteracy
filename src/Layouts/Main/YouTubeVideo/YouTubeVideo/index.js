import React, { useState, useEffect } from "react";
import { addVideoData } from "../../../../firebase/firebaseReadWrite";
import { Colors } from "../../../../constants/Colors";
import { inputStyle, multiLineInputStyle } from "../../ResumeBuilder/styles.js";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Divider
} from "@mui/material";
import YouTube from "react-youtube";
import { TagsInput } from "react-tag-input-component";
import "./styles.css";
import Swal from "sweetalert2";

const YouTubeVideo = () => {
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [operating_system, setOs] = useState("");
  const [category, setCategory] = useState("");
  const [videoId, setVideoId] = useState("");
  const [opts, setOpts] = useState({});

  const [count, setCount] = useState(0);

  const handleUrlChange = (e) => {
    const newurl = e.target.value;
    setUrl(newurl);
    setVideoId(getVideoId(newurl));
  };

  const getVideoId = (url) => {
    const videoIdRegex =
      /(?:(?:https?:\/\/)?(?:www\.)?)?youtu(?:\.be\/|be.com\/(?:watch\?(?:.*&)?v=|(?:embed|v)\/))([\w'-]+)/i;
    const match = url.match(videoIdRegex);
    if (match) {
      return match[1];
    } else {
      setVideoId("");
      setUrl("");
      Swal.fire({
        width: "30rem",
        height: "20rem",
        icon: "error",
        title: "Oops...",
        text: '"Please enter a valid YouTube video URL."'
      });
    }
  };

  useEffect(() => {
    setOpts({
      height: "390",
      width: "640",
      playerVars: {
        autoplay: 0
      }
    });
  }, []);

  const [messages, setMessage] = useState([
    {
      messages: ""
    }
  ]);
  const [stopTimes, setStopTimes] = useState([
    {
      stopTimes: ""
    }
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVideoId("");

    // eslint-disable-next-line
    const urlRegex = /^(https?:\/\/)/i;

    try {
      await addVideoData("youtube-videos", {
        url,
        tags,
        operating_system,
        category,
        stopTimes: stopTimes,
        messages: messages
      });
      setUrl("");
      setTags([]);
      setOs("");
      setCategory("");
      setStopTimes([]);
      setMessage([]);
      Swal.fire({
        width: "30rem",
        height: "10rem",
        text: "Video added successfully!",
        icon: "success"
      });
    } catch (e) {
      console.log("Error adding video:", e);
    }
  };

  const onAddBtnClick = () => {
    let newField = {
      messages: "",
      stopTimes: ""
    };

    setMessage([...messages, newField]);
    setStopTimes([...stopTimes, newField]);
  };

  const remove = (index) => {
    let messagedata = [...messages];
    messagedata.splice(index, 1);
    setMessage(messagedata);
    let stopdata = [...stopTimes];
    stopdata.splice(index, 1);
    setStopTimes(stopdata);
    setCount(count + 1);
  };

  const convertToSeconds = (time) => {
    const [minutes, seconds] = time.split(":").map((num) => parseInt(num));
    return minutes * 60 + seconds;
  };

  const handleChange = (index, event) => {
    const stopTime = [...stopTimes];
    const message = [...messages];
    if (event.target.name === "stopTimes") {
      stopTime[index] = convertToSeconds(event.target.value);
    } else if (event.target.name === "messages") {
      message[index] = event.target.value;
    }
    setStopTimes(stopTime);
    setMessage(message);
    setCount(count + 1);
  };

  const messageInput = messages.map((input, index) => {
    return (
      <Box key={index}>
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
              Segment #{index + 1}
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
                remove(index);
              }}
            >
              - Remove Segment
            </Box>
          </Grid>
        </Grid>

        <Grid
          key={index}
          id={`experience-form-${index}`}
          container
          spacing={2}
          sx={{ margin: "auto", width: "97%", paddingRight: "0.5rem" }}
        >
          <Grid
            container
            spacing={2}
            sx={{ margin: "auto", width: "97%", paddingRight: "0.5rem" }}
          >
            <Grid item>
              <Box
                sx={{
                  marginTop: "1.2rem",
                  color: Colors.primaryColor,
                  fontSize: "1rem",
                  fontFamily: "Inria Sans",
                  fontWeight: "700",
                  marginLeft: "0.5rem"
                }}
              >
                Stop Times:
              </Box>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "100%" }
                }}
                autoComplete="off"
              >
                <TextField
                  value={input.stopTime}
                  borderRadius=".375rem"
                  sx={inputStyle}
                  variant="filled"
                  placeholder="Specify pause times for video in format min:sec, e.g. 0:30"
                  focused
                  onChange={(e) => {
                    handleChange(index, e);
                  }}
                  name="stopTimes"
                  InputProps={{
                    disableUnderline: true
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Description row */}
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Grid item>
                <Box
                  sx={{
                    marginTop: "1.2rem",
                    color: Colors.primaryColor,
                    fontSize: "1.1rem",
                    fontFamily: "Inria Sans",
                    fontWeight: "700",
                    marginLeft: "0.5rem",
                    marginBottom: "0.5rem"
                  }}
                >
                  Confirmation Message:
                </Box>
              </Grid>
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
                  variant="standard"
                  multiline
                  value={input.messages}
                  name="messages"
                  onChange={(e) => {
                    handleChange(index, e);
                  }}
                  rows={5}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  });

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem"
          }}
        >
          {videoId && (
            <YouTube videoId={videoId} opts={opts} sx={{ margin: "auto" }} />
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: Colors.backgroundColor,
            height: "auto",
            borderRadius: "1rem",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            margin: "auto",
            marginTop: "2rem",
            paddingBottom: "2rem",
            width: "90%"
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ margin: "auto", width: "97%", paddingRight: "0.5rem" }}
          >
            <Grid item xs={1.6}>
              <Box
                sx={{
                  marginTop: "1.2rem",
                  color: Colors.primaryColor,
                  fontSize: "1rem",
                  fontFamily: "Inria Sans",
                  fontWeight: "700",
                  marginLeft: "0.5rem"
                }}
              >
                Youtube Link:
              </Box>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "100%", paddingBottom: "1rem" }
                }}
                autoComplete="off"
              >
                <TextField
                  sx={inputStyle}
                  variant="filled"
                  value={url}
                  placeholder="Input Youtube Video Url"
                  InputProps={{
                    disableUnderline: true
                  }}
                  onChange={handleUrlChange}
                  //onChange={(e) => setUrl(e.target.value)}
                  focused
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ margin: "auto", width: "97%", paddingRight: "0.5rem" }}
          >
            <Grid item xs={1.6}>
              <Box
                sx={{
                  marginTop: "1.2rem",
                  color: Colors.primaryColor,
                  fontSize: "1rem",
                  fontFamily: "Inria Sans",
                  fontWeight: "700",
                  marginLeft: "0.5rem"
                }}
              >
                Tags:
              </Box>
            </Grid>

            <Grid item md={6} sm={6} xs={12}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "auto", padding: "1rem" }
                }}
                autoComplete="off"
              >
                <TagsInput
                  InputProps={{
                    disableUnderline: true
                  }}
                  type="text"
                  variant="standard"
                  id="search"
                  value={tags}
                  separators={["Enter"]}
                  onChange={setTags}
                  placeHolder="To add tags, input the desired word and press Enter"
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ margin: "auto", width: "97%", paddingRight: "0.5rem" }}
          >
            <Grid item xs={1.6}>
              <Box
                sx={{
                  marginTop: "2rem",
                  color: Colors.primaryColor,
                  fontSize: "1rem",
                  fontFamily: "Inria Sans",
                  fontWeight: "700",
                  marginLeft: "0.5rem"
                }}
              >
                Operating System:
              </Box>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "100%" }
                }}
                autoComplete="off"
              >
                <FormControl fullWidth sx={{ marginTop: "1rem" }}>
                  <InputLabel id="demo-simple-select-label">
                    What kind of device is this for?
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label=" What kind of device is this for?"
                    onChange={(e) => setOs(e.target.value)}
                    value={operating_system}
                  >
                    <MenuItem disabled={true}>Mobile Devices</MenuItem>
                    <MenuItem value={"iOS"}>iOS</MenuItem>
                    <MenuItem value={"Android"}>Android</MenuItem>
                    <Divider />
                    <MenuItem disabled={true}>PC</MenuItem>
                    <MenuItem value={"Windows"}>Windows</MenuItem>
                    <MenuItem value={"Mac"}>Mac</MenuItem>
                    <MenuItem value={"Linux"}>Linux</MenuItem>
                    <Divider />
                    <MenuItem value={"All"}>All</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ margin: "auto", width: "97%", paddingRight: "0.5rem" }}
          >
            <Grid item xs={1.6}>
              <Box
                sx={{
                  marginTop: "2rem",
                  color: Colors.primaryColor,
                  fontSize: "1rem",
                  fontFamily: "Inria Sans",
                  fontWeight: "700",
                  marginLeft: "0.5rem"
                }}
              >
                Video Category:
              </Box>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "100%" }
                }}
                autoComplete="off"
              >
                <FormControl fullWidth sx={{ marginTop: "1rem" }}>
                  <InputLabel id="demo-simple-select-label">
                    What category is this video for?
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label=" What category is this video for?"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <MenuItem value="daily_life">
                      Technology Use in Daily Life
                    </MenuItem>
                    <MenuItem value="safety_privacy">
                      Technology Safety and Privacy
                    </MenuItem>
                    <MenuItem value="class_word">
                      Technology use for Class and Word
                    </MenuItem>
                    <MenuItem value="finance">
                      Financial Well Being and Management
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
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
        {messageInput}
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
              + Add a Segment
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          height: "auto",
          margin: "auto",
          paddingBottom: "2rem",
          width: "90%"
        }}
      >
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 3, mb: 2, bgcolor: Colors.primaryColor }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default YouTubeVideo;
