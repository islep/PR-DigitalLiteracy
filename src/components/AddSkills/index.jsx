import React, { useEffect, useState } from 'react';
import { Box, TextField, Grid, Fab, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { doc, onSnapshot } from 'firebase/firestore';
import { Colors } from '../../constants/Colors';
import { updateData } from '../../firebase/firebaseReadWrite';
import { useAuth } from '../../firebase/AuthContext';

import { db } from '../../firebase/firebase';

let nextId = 0;

function AddSkills() {
	const [item, setItem] = useState('');
	const [inputList, setInputList] = useState([]);
	// eslint-disable-next-line
	const [firebaseList, setFirebaseList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [count, setCount] = useState(0);

	const { currentUser } = useAuth();
	let docRef;
	if (currentUser !== null) {
		docRef = doc(db, 'users', currentUser.uid);
	}

	const onAddBtnClick = () => {
		if (item !== '') {
			setInputList([...inputList, { id: nextId++, name: item }]);
		}
		setItem('');
		setCount(count + 1);
	};

	const onCloseBtnClick = (id) => {
		setInputList(inputList.filter((a) => a.id !== id));
		setCount(count + 1);
	};

	const updateListToFirebase = () => {
		const docData = {
			skills_list: inputList,
		};

		updateData(docRef, docData);
	};

	useEffect(() => {
		if (currentUser) {
			if (count < 1) {
				const unsubscribe = onSnapshot(docRef, (doc) => {
					setLoading(false);
					setFirebaseList(() => {
						let newList = [];
						if (doc.data() !== undefined && doc.data().skills_list !== null && doc.data().skills_list !== undefined) {
							newList = doc.data().skills_list;
							// eslint-disable-next-line
							if (newList) {
								// eslint-disable-next-line
								newList.map((e) => {
									if (nextId < newList.length) {
										inputList.push({ id: nextId++, name: e.name });
									}
								});
							}
						}

						return newList;
					});
				});

				return () => {
					unsubscribe();
				};
			}
			updateListToFirebase();
		}
		// eslint-disable-next-line
	}, [count]);

	return (
		<Box>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Box sx={{ display: 'flex' }}>
						<TextField
							id="standard-basic"
							variant="standard"
							value={item}
							placeholder="Press Enter or Return to Add Skill"
							onChange={(e) => setItem(e.target.value)}
							sx={{ width: '90%', marginTop: '1rem' }}
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									onAddBtnClick();
								}
							}}
						/>
						<Fab
							size="medium"
							aria-label="add"
							sx={{
								backgroundColor: Colors.white,
								color: Colors.primaryColor,
								marginTop: '1rem',
								marginLeft: '1rem',
								marginBottom: '1rem',
								'&:hover': {
									backgroundColor: Colors.white,
								},
							}}
							onClick={onAddBtnClick}
						>
							<AddIcon />
						</Fab>
					</Box>
					<Box sx={{ height: '13rem', overflowY: 'auto' }}>
						{loading ? (
							<Box>Data Loading...</Box>
						) : (
							inputList.map((e, index) => (
								<Box sx={{ display: 'flex' }} key={e.id}>
									<Grid container spacing={2}>
										<Grid item xs={10}>
											<Typography
												sx={{
													fontFamily: 'Inria Sans',
													fontSize: '1.3rem',
													fontColor: Colors.primaryColor,
												}}
											>
												{e.name}
											</Typography>
										</Grid>
										<Grid item xs={1}>
											<Box
												sx={{ padding: '0.5rem' }}
												onClick={() => {
													onCloseBtnClick(e.id);
												}}
											>
												<CloseIcon
													sx={{
														color: Colors.primaryColor,
														height: '1.4rem',
													}}
												/>
											</Box>
										</Grid>
									</Grid>
								</Box>
							))
						)}
					</Box>
				</Grid>
			</Grid>

			<Box
				sx={{
					position: 'absolute',
					bottom: 0,
					right: 0,
					padding: '1rem',
					marginBottom: '4rem',
				}}
			/>
		</Box>
	);
}

export default AddSkills;
