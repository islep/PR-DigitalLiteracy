import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { useAuth } from '../../../../firebase/AuthContext';
import { updateData } from '../../../../firebase/firebaseReadWrite';

function Results({ data, scores }) {
	const { currentUser } = useAuth();
	let docRef;
	if (currentUser !== null) {
		docRef = doc(db, 'users', currentUser.uid);
	}
	const [result, setResult] = useState({
		ios: scores[0],
		android: scores[1],
		windows: scores[2],
	});
	useEffect(() => {
		const saveData = async () => {
			await updateData(docRef, { result });
		};
		saveData();
	}, [scores, currentUser]);
	const navigate = useNavigate();

	const handleButtonClick = () => {
		navigate('/');
	};

	return (
		<Box height="calc(100vh - 100px)" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
			<Box mb={4}>
				<Typography variant="h3">Results</Typography>
			</Box>
			{data.map((category, index) => (
				<Grid container justifyContent="center" key={index}>
					<Box display="flex" alignItems="center" minWidth={200} marginRight={3}>
						<Typography variant="h5">{category.category}</Typography>
					</Box>
					<Typography variant="h6">
						{scores[index]} / {category.questions.length}
					</Typography>
				</Grid>
			))}
			<Box mt={3} display="flex" justifyContent="center">
				<Button variant="contained" onClick={handleButtonClick}>
					Start Learning!
				</Button>
			</Box>
		</Box>
	);
}

Results.propTypes = {
	data: PropTypes.array.isRequired,
	scores: PropTypes.array.isRequired,
};

export default Results;
