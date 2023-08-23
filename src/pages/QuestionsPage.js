import React, { useEffect, useState } from 'react';
import { db, } from "../firebase/firebase";
import Navbar from '../Layouts/Navbar';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { Box, Grid, Button, TextField, Modal, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Colors } from "../constants/Colors"
import styles from "../Layouts/Main/Home/HomeIntro/index.module.css";
import QuestionBox from "../Layouts/Main/FAQ/QuestionBox";
import { useAuth } from "../firebase/AuthContext";
import _uniqueId from 'lodash/uniqueId';
import { Timestamp } from 'firebase/firestore';
import { addData } from "../firebase/firebaseReadWrite";
import { addDoc, updateDoc } from "firebase/firestore";
import getUserData from "../../src/components/getUserData"
const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, "questions"));
      setQuestions(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handleSubmit = async () => {
    console.log("HANDLE SUBMIT")
    if (currentUser !== null) {
      try {
        const collectionRef = collection(db, "questions");
        if (questionTitle === "" || questionText === "") {
          alert("Please fill out all fields");
          return;
        } else {
          const userData = await getUserData(currentUser.uid);
          const docData = {
            timeStamp: Timestamp.fromDate(new Date()),
            questionTitle: questionTitle,
            questionText: questionText,
            userName: userData.name,
          };
          const docRef = await addDoc(collectionRef, docData);
          await updateDoc(doc(db, "questions", docRef.id), {
            qid: docRef.id
          });
          window.location.reload();

        }

      } catch (err) {
        alert(err.message);
      }
    }
  }

  const body = (
    <Box
      sx={{
        position: 'absolute',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <IconButton
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
        onClick={handleClose}
      >
        x
      </IconButton>
      <h2 id="modal-title">Post a Question</h2>
      <TextField
        fullWidth
        id="question-title"
        label="Question Title"
        value={questionTitle}
        onChange={e => setQuestionTitle(e.target.value)}
        margin="normal"
      />
      <br></br>
      <TextField
        fullWidth
        id="question-text"
        label="Question Text"
        value={questionText}
        onChange={e => setQuestionText(e.target.value)}
        multiline
        rows={4}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
  return (
    <Box sx={styles.questionsContainer}>
      <Navbar />
      <Box
        sx={{
          marginTop: "2rem",
          marginLeft: { md: "8rem", sm: "8rem", xs: "1rem" },
          maxWidth: "100%"
        }}
      >
        <Box
          sx={{
            fontFamily: "Inria Sans",
            color: Colors.primaryColor,
            fontWeight: "700",
            textAlign: "left",
            fontSize: {
              md: "2.5rem",
              sm: "3rem",
              xs: "2rem"
            },
            maxWidth: "100%"
          }}
        >
          Scroll through the questions that fellow community members have previously asked.
        </Box>
        <Box
          sx={{
            fontFamily: "Inria Sans",
            color: Colors.primaryColor,
            fontWeight: "200",
            textAlign: "left",
            fontSize: {
              md: "1.5rem",
              sm: "3rem",
              xs: "2rem"
            },
            maxWidth: "100%"
          }}
        >
          Don't see your question?
          <Button
            variant="contained"
            onClick={() => handleOpen()}
            sx={{
              marginLeft: "1rem",
              backgroundColor: Colors.primaryColor,
              color: Colors.white,
              "&:hover": {
                backgroundColor: Colors.primaryColorDark
              },
            }}
          >
            Post a question
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
          >
            {body}
          </Modal>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '90%', // Makes boxes take full width of the container
          }}
        >
          {questions.map((question, index) => (
            <QuestionBox key={index} question={question} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
export default QuestionsPage;