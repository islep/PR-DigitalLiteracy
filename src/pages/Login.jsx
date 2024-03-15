import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Avatar, CssBaseline, TextField, Link, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import ReactGA from 'react-ga4';
import { Colors } from '../constants/Colors';
import { auth, logInWithEmailAndPassword } from '../firebase/firebase';
import { isEmailValid, isPasswordValid } from '../utils';
import Navbar from '../Layouts/Navbar';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, loading] = useAuthState(auth);

	const [searchParams] = useSearchParams();

	const navigate = useNavigate();

	// TODO: sign up -> to add demographic info form (Device, level of comfort with those devices) -> this should be optional

	useEffect(() => {
		window.scrollTo(0, 0);
	});

	useEffect(() => {
		ReactGA.send({
			hitType: 'page_view',
			page_location: window.location.pathname,
		});
	});

	useEffect(() => {
		if (loading) {
			// maybe trigger a loading screen
			return;
		}
		if (user) {
			if (searchParams.get('fromPath')) {
				navigate(searchParams.get('fromPath'));
			} else {
				navigate('/');
			}
		}
	}, [user, loading, navigate, searchParams]);

	const onBtnPressed = (e) => {
		e.preventDefault();
		if (!isEmailValid(email)) {
			alert('Please enter a valid email');
		} else if (!isPasswordValid) {
			alert('Your password is invalid');
		} else {
			logInWithEmailAndPassword(email, password);
		}
	};

	return (
		<div>
			<Navbar />
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
									<Avatar sx={{ m: 1, bgcolor: Colors.primaryColor }}>
										<LockOutlinedIcon />
									</Avatar>
									<Typography component="h1" variant="h5">
										Sign in
									</Typography>
									<Box
										component="form"
										// onSubmit={handleSubmit}
										noValidate
										sx={{ mt: 1 }}
									>
										<TextField
											margin="normal"
											required
											fullWidth
											id="email"
											label="Email Address"
											name="email"
											autoComplete="email"
											autoFocus
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
										<TextField
											margin="normal"
											required
											fullWidth
											name="password"
											label="Password"
											type="password"
											id="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											autoComplete="current-password"
										/>

										<Button
											type="submit"
											fullWidth
											variant="contained"
											sx={{ mt: 3, mb: 2, bgcolor: Colors.primaryColor }}
											onClick={onBtnPressed}
										>
											Sign In
										</Button>
										<Grid container sx={{ marginTop: '1rem' }}>
											<Grid item xs>
												<Link href="/forgotPassword" variant="body2" sx={{ color: Colors.primaryColor }}>
													Forgot password?
												</Link>
											</Grid>
											<Grid item>
												<Link
													variant="body2"
													sx={{ color: Colors.primaryColor, cursor: 'pointer' }}
													onClick={() => {
														navigate({
															pathname: '/signup',
															search: createSearchParams({
																fromPath: searchParams.get('fromPath'),
															}).toString(),
														});
													}}
												>
													Don't have an account? Sign Up
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

export default Login;
