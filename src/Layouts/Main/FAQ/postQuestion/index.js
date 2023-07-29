import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../../firebase/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import { useAuth } from "../../../../firebase/AuthContext";
import { updateData } from "../../../../firebase/firebaseReadWrite";

const PostQuestion = () => {
    const [question, setQuestion] = useState("");
    const { currentUser } = useAuth();
    const handlePostQuestion = async (event) => {
        event.preventDefault();
        if (currentUser !== null) {
            try {
                await db.collection("questions").add({
                    questionText: question,
                    timeStamp: Date.now(),
                    user: currentUser.uid
                });
                setQuestion("");
            } catch (error) {
                console.log("Error adding document", error);
            }
        }
    }
    return (
        <div>
            <form onSubmit={handlePostQuestion}>
                <input
                    type="text"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    placeholder="Ask a question"
                />
                <button type="submit">Post Question</button>
            </form>
        </div>
    )
}
export default PostQuestion;