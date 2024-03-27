import React, { useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
	Box,
	Grid,
	CssBaseline,
	Container,
	Link,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
	Button,
} from '@mui/material';
import { doc } from 'firebase/firestore';
import { useAuth } from '../firebase/AuthContext';

import { Colors } from '../constants/Colors';
import { db } from '../firebase/firebase';
import { updateData } from '../firebase/firebaseReadWrite';

function UserInformation() {
	const { currentUser } = useAuth();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [techComfortLevel, setTechComfortLevel] = useState('');
	const [operatingSystemUsed, setOperatingSystemUsed] = useState('');

	let docRef;
	if (currentUser !== null) {
		docRef = doc(db, 'users', currentUser.uid);
	}

	useEffect(() => {
		if (!currentUser) {
			navigate({
				pathname: '/login',
				search: createSearchParams({
					fromPath: '/userInformation',
				}).toString(),
			});
		}
	}, [currentUser, navigate]);

	const btnContinuePressed = () => {
		const data = {
			tech_comfort_level: techComfortLevel,
			operating_system_used: operatingSystemUsed,
		};

		updateData(docRef, data);

		if (searchParams.get('fromPath')) {
			navigate(searchParams.get('fromPath'));
		} else {
			navigate('/');
		}
	};

	return (
		<div>
			<div style={{ marginTop: '8rem' }}>
				<Box
					sx={{
						backgroundColor: Colors.backgroundColor,
						height: '89%',
						margin: 'auto',
						width: '50%',
						borderRadius: '1rem',
						padding: '1rem',
						boxShadow: 2,
						position: 'relative',
					}}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Container component="main" maxWidth="xs">
								<CssBaseline />
								<Box
									sx={{
										marginTop: 3,
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										marginBottom: 8,
									}}
								>
									<Typography component="h1" variant="h5">
										Help Us Help You!
									</Typography>
									<Typography component="p" variant="p">
										This information will help us cater the website to your device preferences and comfort level.
									</Typography>
									<Box
										component="form"
										// onSubmit={handleSubmit}
										noValidate
										sx={{ mt: 1 }}
									>
										<FormControl fullWidth sx={{ marginTop: '2rem' }}>
											<InputLabel id="demo-simple-select-label">What kind of computer do you use?</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												label=" What kind of computer do you use?"
												onChange={(e) => {
													setOperatingSystemUsed(e.target.value);
												}}
											>
												<MenuItem value="Mac">Mac</MenuItem>
												<MenuItem value="Windows">Windows</MenuItem>
												<MenuItem value="Chromebook">Chromebook</MenuItem>
												<MenuItem value="Linux">Linux</MenuItem>
												<MenuItem value={"Don't Know"}>I Don't Know</MenuItem>
											</Select>
										</FormControl>

										<FormControl fullWidth sx={{ marginTop: '2rem' }}>
											<InputLabel id="demo-simple-select-label">What mobile phone do you use?</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												label="What mobile phone do you use?"
												onChange={(e) => {
													setOperatingSystemUsed(e.target.value);
												}}
											>
												<MenuItem value="Android">Android</MenuItem>
												<MenuItem value="iOS">Apple/iOS</MenuItem>
												<MenuItem value={"Don't Know"}>I Don't Know</MenuItem>
											</Select>
										</FormControl>

										<FormControl fullWidth sx={{ marginTop: '2rem' }}>
											<InputLabel id="demo-simple-select-label">
												How comfortable do you feel with technology?
											</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												label=" How comfortable do you feel with technology?"
												onChange={(e) => {
													setTechComfortLevel(e.target.value);
												}}
											>
												<MenuItem value={"Don't Know"}>Don't Know</MenuItem>
												<MenuItem value="Low">Low</MenuItem>
												<MenuItem value="Medium">Medium</MenuItem>
												<MenuItem value="High">High</MenuItem>
											</Select>
										</FormControl>
										<Button
											fullWidth
											variant="contained"
											onClick={btnContinuePressed}
											sx={{ mt: 3, mb: 2, bgcolor: Colors.primaryColor }}
										>
											Continue
										</Button>
										<Grid container sx={{ marginTop: '1rem' }}>
											<Grid item xs />
											<Grid item>
												<Link
													// href="/signUp"
													variant="body2"
													sx={{ color: Colors.primaryColor }}
													onClick={() => {
														navigate({
															pathname: '/',
															search: createSearchParams({
																fromPath: searchParams.get('fromPath'),
															}).toString(),
														});
													}}
												>
													Skip: I don't want personalised recommendation
												</Link>
											</Grid>
										</Grid>
									</Box>
								</Box>
							</Container>
						</Grid>
					</Grid>
				</Box>
			</div>
		</div>
	);
}

export default UserInformation;
