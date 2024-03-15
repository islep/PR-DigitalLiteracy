import React, { useEffect, useState } from 'react';
import { doc, collection, getDocs, Timestamp, addDoc, updateDoc } from 'firebase/firestore';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Button, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactGA from 'react-ga4';
import { db } from '../firebase/firebase';
import Navbar from '../Layouts/Navbar';
import QuestionBox from '../Layouts/Main/FAQ/QuestionBox';
import { useAuth } from '../firebase/AuthContext';

import getUserData from '../components/getUserData';

function QuestionsPage() {
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getDocs(collection(db, 'questions'));
			setQuestions(data.docs.map((d) => ({ ...d.data(), id: d.id })));
		};
		fetchData();
	}, []);

	useEffect(() => {
		ReactGA.send({
			hitType: 'page_view',
			page_location: window.location.pathname,
		});
	});

	return (
		<div className="px-4 md:px-64">
			<h1 className="text-2xl text-center font-bold p-12">
				Scroll through the questions that fellow community members have previously asked.
			</h1>
			<NewQuestion />
			{questions.map((q) => (
				<QuestionBox
					key={q.id}
					title={q.questionTitle}
					postedBy={q.userName}
					postedOn={q.timeStamp}
					url={`/questions/${q.id}`}
				/>
			))}
		</div>
	);
}

const NewQuestion = () => {
	const [questionTitle, setQuestionTitle] = useState('');
	const [questionText, setQuestionText] = useState('');
	const { currentUser } = useAuth();
	const [isExpanded, setIsExpanded] = useState(false);

	const handleSubmit = async () => {
		console.log('HANDLE SUBMIT');
		if (currentUser !== null) {
			try {
				const collectionRef = collection(db, 'questions');
				if (questionTitle === '' || questionText === '') {
					alert('Please fill out all fields');
				} else {
					const userData = await getUserData(currentUser.uid);
					const docData = {
						timeStamp: Timestamp.fromDate(new Date()),
						questionTitle,
						questionText,
						userName: userData.name,
					};
					const docRef = await addDoc(collectionRef, docData);
					await updateDoc(doc(db, 'questions', docRef.id), {
						qid: docRef.id,
					});
					window.location.reload();
				}
			} catch (err) {
				alert(err.message);
			}
		}
	};

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<h2 className="text-xl">Post a new question</h2>
			</AccordionSummary>
			<AccordionDetails>
				<TextField
					fullWidth
					id="question-title"
					label="Question Title"
					value={questionTitle}
					onChange={(e) => setQuestionTitle(e.target.value)}
					margin="normal"
				/>
				<br />
				<TextField
					fullWidth
					id="question-text"
					label="Question Text"
					value={questionText}
					onChange={(e) => setQuestionText(e.target.value)}
					multiline
					rows={4}
				/>
				<div className="flex justify-end mt-4">
					<Button variant="contained" onClick={handleSubmit}>
						Submit
					</Button>
				</div>
			</AccordionDetails>
		</Accordion>
	);
};
export default QuestionsPage;
