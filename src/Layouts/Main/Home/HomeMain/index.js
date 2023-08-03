import React from "react";
import { Box, Grid } from "@mui/material";
import { Colors } from "../../../../constants/Colors";
import HomeCard from "../../../../components/homeCard";
import cardImage1 from "../../../../assets/images/card-image-1.png";
import cardImage2 from "../../../../assets/images/card-image-2.png";
import cardImage3 from "../../../../assets/images/card-image-3.png";
import cardImage4 from "../../../../assets/images/card-image-4.png";
import cardImage5 from "../../../../assets/images/card-image-5.png";
import cardImage6 from "../../../../assets/images/card-image-6.png";

const cardImageList = [
  cardImage1,
  cardImage2,
  cardImage3,
  cardImage4,
  cardImage5,
  cardImage6
];

const list1 = [
  "Apps for different purposes",
  "Google Search Techniques",
  "Privacy Settings"
];
const list2 = [
  "Microsoft Office Basics",
  "Printing and Scanning",
  "Email and Document Upload"
];
const list3 = ["Phishing and Scams", "Financial Security", "Malware and More"];
const list4 = ["Auto Pay", "Bill Check", "Credit Rating"];
const list5 = ["Job Search", "Identify Your Skills", "Resume Builder"];
const list6 = ["Social Services", "Govt Support", "NGO Support"];
const mainBodyCardLists = [list1, list2, list3, list4, list5, list6];

const cardHeadingList = [
  "Technology Use in Daily Life",
  "Technology use for Class and Work",
  "Technology Safety and Privacy",
  "Financial Well Being and Management",
  "Job Application Support",
  "Accessing Public Services and Resources"
];

const HomeMain = () => {
  return (
    <div id="#homeMain">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "80%",
          marginLeft: { md: "15rem", sm: "8rem", xs: "1rem" },
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 5, sm: 8, md: 12 }}
          justifyContent="center"
          alignItems="center"
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={8} sm={4} md={4} key={index} >
              <HomeCard
                image={cardImageList[index]}
                alt={cardHeadingList[index]}
                heading={cardHeadingList[index]}
                list={mainBodyCardLists[index]}
                index={index}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default HomeMain;


