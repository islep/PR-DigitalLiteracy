import { React, useEffect } from "react";
import { Box, Grid, MenuItem, Select, Divider } from "@mui/material";
import { useState } from "react";
import { Colors } from "../../../../constants/Colors";
import { useAuth } from "../../../../firebase/AuthContext";
import { db } from "../../../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const TechUsedInClassAndWordIntro = ({
  dataFromFirebase,
  dataFromClassAndWordIntro
}) => {
  const { currentUser } = useAuth();
  let [value, setValue] = useState("");
  let [osvalue, setosValue] = useState([]);
  let pageValue = "class_word";
  let docRef;

  if (currentUser !== null) {
    docRef = doc(db, "users", currentUser.uid);
  }

  useEffect(() => {
    console.log("useEffect 2");
    if (currentUser !== null) {
      getDoc(docRef).then((doc) => {
        setValue(doc.data().operating_system_used);
      });
    }
    setValue("All");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("useEffect 3");
    console.log("dataFromFirebase type is ", typeof dataFromFirebase);
    if (Array.isArray(dataFromFirebase)) {
      const transformedData = dataFromFirebase.map((item) => {
        return {
          category: item.category,
          messages: item.messages,
          operating_system: item.operating_system,
          stopTimes: item.stopTimes,
          tags: item.tags,
          url: item.url
        };
      });
      if (value === "All") {
        const os = transformedData.filter(
          (video) => video.category === pageValue
        );
        setosValue(os);
      } else {
        const os = transformedData.filter(
          (video) =>
            video.operating_system === value && video.category === pageValue
        );
        setosValue(os);
      }
    } else {
      console.log("dataFromFirebase is not an array");
    }
    // eslint-disable-next-line
  }, [value, dataFromFirebase]);

  useEffect(() => {
    dataFromClassAndWordIntro(osvalue);
    // eslint-disable-next-line
  }, [osvalue]);

  const filteros = (e) => {
    const keyword = e.target.value;

    if (keyword !== "All") {
      const filterd_os = osvalue.filter((video) => {
        return video.operating_system === keyword;
      });
      setosValue(filterd_os);
    } else {
      if (Array.isArray(dataFromFirebase)) {
        const transformedData = dataFromFirebase.map((item) => {
          return {
            category: item.category,
            messages: item.messages,
            operating_system: item.operating_system,
            stopTimes: item.stopTimes,
            tags: item.tags,
            url: item.url
          };
        });
        setosValue(
          transformedData.filter((video) => video.category === pageValue)
        );
      } else {
        console.log("dataFromFirebase is not an array");
      }
    }
    setValue(keyword);
  };

  console.log("value ", value);
  console.log("osvalue: ", osvalue);

  const twoCalls = (e) => {
    setValue(e.target.value);
    filteros(e);
  };
  return (
    <>
      <Box
        sx={{
          fontFamily: "Inria Sans",
          color: Colors.primaryColor,
          fontWeight: "700",
          textAlign: "right",
          paddingRight: "2rem",
          paddingTop: "1rem",
          fontSize: {
            md: "2.75rem",
            sm: "3rem",
            xs: "2rem"
          }
        }}
      >
        <Select
          value={value}
          onChange={(e) => {
            twoCalls(e);
          }}
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
      </Box>
      <Grid item md={6} xs={12}>
        <Box
          sx={{
            marginTop: { md: "4rem", sm: "2rem", xs: "2rem" },
            textAlign: "center"
          }}
        >
          <Box
            sx={{
              fontFamily: "Inria Sans",
              color: Colors.primaryColor,
              fontWeight: "700",
              textAlign: "center",
              fontSize: {
                md: "2.75rem",
                sm: "3rem",
                xs: "2rem"
              }
            }}
          >
            Search videos tutorials for help with techology used in class and
            Work
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default TechUsedInClassAndWordIntro;
