import React, { useEffect, useState } from 'react';
import { Box, Radio, FormControlLabel, Button, Typography, Grid } from '@mui/material';
import ReactGA from 'react-ga4';
import Results from '../Layouts/Main/quiz/results/index';
import quizData from '../Layouts/Main/quiz/quizData/index';

function Quiz() {
	const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [scores, setScores] = useState(Array(quizData.length).fill(0));
	const [selectedOption, setSelectedOption] = useState(null);
	const [completed, setCompleted] = useState(false);

	const currentCategory = quizData[currentCategoryIndex];
	const currentQuestion = currentCategory.questions[currentQuestionIndex];

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const nextQuestion = () => {
		if (selectedOption === currentQuestion.correctAnswer.toString()) {
			// change here
			setScores((prevScores) => {
				const newScores = [...prevScores];
				newScores[currentCategoryIndex]++;
				return newScores;
			});
		}

		setSelectedOption(null);

		if (currentQuestionIndex < currentCategory.questions.length - 1) {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
		} else if (currentCategoryIndex < quizData.length - 1) {
			setCurrentQuestionIndex(0);
			setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
		} else {
			setCompleted(true);
		}
	};

	useEffect(() => {
		ReactGA.send({
			hitType: 'page_view',
			page_location: window.location.pathname,
		});
	});

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh',
				bgcolor: '#f5f5f5',
			}}
		>
			{!completed ? (
				<>
					<Typography variant="h4" gutterBottom component="div">
						{currentQuestion.question}
					</Typography>
					<Grid container spacing={2} justifyContent="center">
						{currentQuestion.options.map((option) => (
							<Grid
								item
								xs={12}
								sm={6}
								md={3}
								key={option.id}
								sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
							>
								<FormControlLabel
									value={option.id.toString()}
									control={<Radio />}
									label={
										<img
											src={option.src}
											alt={option.alt}
											style={{ width: '100%', height: 'auto', border: '2px solid #ccc' }}
										/>
									}
									onChange={handleOptionChange}
									checked={selectedOption === option.id.toString()}
								/>
							</Grid>
						))}
					</Grid>
					<Box mt={3}>
						<Button variant="contained" onClick={nextQuestion}>
							Next
						</Button>
					</Box>
				</>
			) : (
				<Results data={quizData} scores={scores} />
			)}
		</Box>
	);
}

export default Quiz;
