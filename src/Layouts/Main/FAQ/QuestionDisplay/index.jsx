import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, IconButton, TextField, Modal } from '@mui/material';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { Colors } from '../../../../constants/Colors';
import NavBar from '../../../Navbar/index';
import { useAuth } from '../../../../firebase/AuthContext';

import getUserData from '../../../../components/getUserData';

function QuestionDisplay() {
	const { questionId } = useParams();
	const [question, setQuestion] = useState(null);
	const [open, setOpen] = useState(false);
	const [answerText, setAnswerText] = useState('');
	const { currentUser } = useAuth();

	useEffect(() => {
		const getQuestion = async () => {
			const docRef = doc(db, 'questions', questionId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setQuestion(docSnap.data());
			} else {
				console.log('No such document!');
			}
		};
		getQuestion();
	}, [questionId]);
	const handleSubmit = async () => {
		if (currentUser !== null && answerText !== '') {
			try {
				const userData = await getUserData(currentUser.uid);
				const answerData = {
					timeStamp: Timestamp.fromDate(new Date()),
					answerText,
					userName: userData.name,
				};
				await updateDoc(doc(db, 'questions', questionId), {
					answers: arrayUnion(answerData),
				});
				setAnswerText('');
				setOpen(false);
				window.location.reload();
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert('Please fill out all fields');
		}
	};
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const ModalBody = (
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
			<h2 id="modal-title">Post an Answer</h2>
			<br />
			<TextField
				fullWidth
				id="question-text"
				label="Question Text"
				value={answerText}
				onChange={(e) => setAnswerText(e.target.value)}
				multiline
				rows={4}
			/>
			<Button onClick={handleSubmit}>Submit</Button>
		</Box>
	);

	return (
		<>
			{question && (
				<Box
					sx={{
						marginTop: '2rem',
						marginLeft: { md: '8rem', sm: '8rem', xs: '1rem' },
						maxWidth: '100%',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '90%', // Makes boxes take full width of the container
						}}
					>
						<Box
							sx={{
								border: `1px solid ${Colors.primaryColor}`,
								boxShadow: '0 0 10px rgba(0,0,0,0.1)',
								padding: '1rem',
								margin: '1rem 0',
								borderRadius: '5px',
							}}
						>
							<Typography
								sx={{
									fontFamily: 'Inria Sans',
									color: Colors.primaryColor,
									fontWeight: '700',
									fontSize: { md: '1.5rem', xs: '1.2rem' },
								}}
							>
								{question.questionTitle}
							</Typography>
							<Typography
								sx={{
									fontFamily: 'Inria Sans',
									color: Colors.primaryColor,
									fontWeight: '400',
									fontSize: { md: '1rem', xs: '1.2rem' },
								}}
							>
								Posted on:{' '}
								{question.timeStamp ? question.timeStamp.toDate().toLocaleDateString() : 'Error date not found'}
							</Typography>
							<Typography
								sx={{
									fontFamily: 'Inria Sans',
									color: Colors.primaryColor,
									fontWeight: '600',
									fontSize: { md: '1rem', xs: '1.2rem' },
									marginBottom: '1rem',
								}}
							>
								By: {question.userName}
							</Typography>
							<Typography
								sx={{
									fontFamily: 'Inria Sans',
									color: Colors.primaryColor,
									fontWeight: '700',
									fontSize: { md: '1.5rem', xs: '1.2rem' },
									marginBottom: '1rem',
								}}
							>
								{question.questionText}
							</Typography>
							<Button
								onClick={handleOpen}
								variant="contained"
								sx={{
									backgroundColor: Colors.primaryColor,
									color: Colors.white,
									'&:hover': {
										backgroundColor: Colors.primaryColorDark,
									},
								}}
							>
								Add an answer to this question
							</Button>
							<Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
								{ModalBody}
							</Modal>
						</Box>
						<Box
							sx={{
								fontFamily: 'Inria Sans',
								color: Colors.primaryColor,
								fontWeight: '700',
								textAlign: 'left',
								fontSize: {
									md: '2.5rem',
									sm: '3rem',
									xs: '2rem',
								},
								maxWidth: '100%',
							}}
						>
							Answers
						</Box>
						<Box>
							{question.answers &&
								question.answers.length !== 0 &&
								question.answers.map((answer, index) => (
									<Box
										key={index}
										sx={{
											boxShadow: '0 0 10px rgba(0,0,0,0.1)',
											padding: '1rem',
											margin: '1rem 0',
											borderRadius: '5px',
											backgroundColor: 'lightgrey',
										}}
									>
										<Typography
											sx={{
												fontFamily: 'Inria Sans',
												color: Colors.primaryColor,
												fontWeight: '600',
												fontSize: { md: '1rem', xs: '1.2rem' },
											}}
										>
											Answer by: {answer.userName}
										</Typography>
										<Typography
											sx={{
												fontFamily: 'Inria Sans',
												color: Colors.primaryColor,
												fontWeight: '400',
												fontSize: { md: '1rem', xs: '1.2rem' },
											}}
										>
											Posted on: {answer.timeStamp.toDate().toLocaleString()}
										</Typography>
										<Typography
											sx={{
												fontFamily: 'Inria Sans',
												color: Colors.primaryColor,
												fontWeight: '400',
												fontSize: { md: '1.5rem', xs: '1.2rem' },
												marginBottom: '1rem',
											}}
										>
											{answer.answerText}
										</Typography>
									</Box>
								))}
						</Box>
					</Box>
				</Box>
			)}
		</>
	);
}

export default QuestionDisplay;
