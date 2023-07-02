import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Modal, Box } from "@mui/material/";
import { Colors } from "../../constants/Colors";
import JobApplicationModal from "../JobApplicationModal";

import { useNavigate } from "react-router-dom";
//import Link from "@mui/material/";

const HomeCard = (props) => {
  const navigate = useNavigate();
  const [isJobApplicationModalOpen, setJobApplicationModalOpen] =
    useState(false);

  const [isComingSoon, setComingSoon] = useState(false);

  const cardClicked = () => {
    if (props.index === 0) {
      navigate("/techInDailyLife");
    } else if (props.index === 1) {
      navigate("/techInClassAndWord");
    } else if (props.index === 2) {
      navigate("/techSafetyAndPrivacy");
    } else if (props.index === 3) {
      navigate("/financeAndManagement");
    } else if (props.index === 4) {
      setJobApplicationModalOpen(true);
    } else if (props.index === 5) {
      window.open("https://www.findhelp.org");
    } else {
      //put coming soon
      setComingSoon(true);
    }
  };

  const openJobApplicationModal = () => {
    const handleClose = () => setJobApplicationModalOpen(false);

    return (
      <Modal
        open={isJobApplicationModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        <JobApplicationModal />
      </Modal>
    );
  };

  const showModalForComingSoon = () => {
    const handleComingSoonClose = () => setComingSoon(false);

    return (
      <Modal
        open={isComingSoon}
        onClose={handleComingSoonClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        <Box
          sx={{
            margin: "auto",
            width: { md: "30%", sm: "30%", xs: "50%" },
            mt: 10,
            bgcolor: Colors.primaryColor,
            borderRadius: "0.5rem",
            boxShadow: 24,
            p: 4
          }}
        >
          <Box sx={{ color: Colors.white, textAlign: "center" }}>
            This module is under construction. Hold on tight!
          </Box>
        </Box>
      </Modal>
    );
  };

  return (
    <Box>
      <Box>
        <Card
          sx={{
            maxWidth: 345,
            background: Colors.backgroundColor,
            cursor: "pointer"
          }}
          onClick={cardClicked}
        >
          <CardMedia
            component="img"
            sx={{
              height: "130px",
              margin: "auto",
              marginBottom: "2rem",
              marginTop: "2rem"
            }}
            image={props.image}
            alt={props.alt}
          />
          <CardContent
            sx={{
              background: Colors.white,
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
              backgroundColor: Colors.white
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                color: Colors.primaryColor,
                fontWeight: "700",
                fontFamily: "Inria Sans",
                fontSize: "1rem"
              }}
            >
              {props.heading}
            </Typography>

            {props.list.map((e, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  color: Colors.primaryColor,
                  fontFamily: "Inria Sans",
                  fontSize: "1rem"
                }}
              >
                - {e}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </Box>
      <div>{openJobApplicationModal()}</div>
      <div>{showModalForComingSoon()}</div>
    </Box>
  );
};

export default HomeCard;
