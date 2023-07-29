import React, { useEffect, useState } from 'react';
import { db } from "../firebase/firebase";
import PostQuestion from '../Layouts/Main/FAQ/postQuestion';
import Navbar from '../Layouts/Navbar';
import { doc, getDocs, collection, } from 'firebase/firestore';
import { Box, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Colors } from "../constants/Colors"
import styles from "../Layouts/Main/Home/HomeIntro/index.module.css";
const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      setQuestions(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Box sx={styles.homeContainer}>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <Box sx={{ ...styles.titleContainer, maxWidth: "100%" }}>
              <Box
                sx={{
                  marginTop: "2rem",
                  textAlign: "left",
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
                  Questions
                </Box>

                <Box
                  sx={{
                    fontFamily: "Inria Sans",
                    color: Colors.primaryColor,
                    fontWeight: "700",
                    textAlign: "left",
                    fontSize: { md: "1.5rem", xs: "1.2rem" },
                    maxWidth: "100%",
                    marginBottom: "2rem"
                  }}
                >
                  Don't see your question? <Button onClick={() => navigate('/postQuestion')}>Post it here!</Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Inria Sans",
                color: Colors.primaryColor,
                fontWeight: "700",
                textAlign: "left",
                fontSize: { md: "1.5rem", xs: "1.2rem" },
                maxWidth: "100%",
                marginBottom: "2rem"
              }}
            >
              {questions.map((question, index) => (
                <Box key={index}>
                  <h2>{question.questionTitle}</h2>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default QuestionsPage;