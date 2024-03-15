import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Avatar, CssBaseline, TextField, Link, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import ReactGA from 'react-ga4';
import Navbar from '../Layouts/Navbar';
import PasswordRules from '../components/PasswordRules';
import { isEmailValid, isPasswordValid } from '../utils';
import { auth, registerWithEmailAndPassword } from '../firebase/firebase';
import { Colors } from '../constants/Colors';

function SignUp() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [user, loading] = useAuthState(auth);
	const [searchParams] = useSearchParams();
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const theme = createTheme();
	const navigate = useNavigate();

	useEffect(() => {
		ReactGA.send({
			hitType: 'page_view',
			page_location: window.location.pathname,
		});
	});

	useEffect(() => {
		if (loading) return;
		if (user) {
			if (searchParams.get('fromPath')) {
				// navigate(searchParams.get("fromPath"));
				navigate({
					pathname: '/UserInformation',
					search: createSearchParams({
						fromPath: searchParams.get('fromPath'),
					}).toString(),
				});
			} else {
				navigate('/UserInformation');
			}
		}
	}, [user, loading, navigate, searchParams]);

	const register = (e) => {
		e.preventDefault();
		if (!firstName || !lastName || !email || !password) {
			alert('Please enter all fields');
		} else if (password.length < 6 || !isPasswordValid(password)) {
			alert(
				'Password must contain at least one uppercase character, one lowercase character and one digit with minimum length of 6 digits',
			);
		} else if (!isEmailValid(email)) {
			alert('Please enter a valid email');
		} else {
			registerWithEmailAndPassword(`${firstName} ${lastName}`, email, password);
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
						<Grid item xs={8}>
							<ThemeProvider theme={theme}>
								<Container component="main" maxWidth="xs">
									<CssBaseline />
									<Box
										sx={{
											marginTop: 3,
											marginBottom: 3,
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
										}}
									>
										<Avatar sx={{ m: 1, bgcolor: Colors.primaryColor }}>
											<LockOutlinedIcon />
										</Avatar>
										<Typography component="h1" variant="h5">
											Create an Account
										</Typography>
										<Box component="form" noValidate sx={{ mt: 3 }}>
											<Grid container spacing={2}>
												<Grid item xs={12} sm={6}>
													<TextField
														autoComplete="given-name"
														name="firstName"
														required
														fullWidth
														id="firstName"
														value={firstName}
														onChange={(e) => setFirstName(e.target.value)}
														label="First Name"
														autoFocus
													/>
												</Grid>
												<Grid item xs={12} sm={6}>
													<TextField
														required
														fullWidth
														id="lastName"
														value={lastName}
														onChange={(e) => setLastName(e.target.value)}
														label="Last Name"
														name="lastName"
														autoComplete="family-name"
													/>
												</Grid>
												<Grid item xs={12}>
													<TextField
														required
														fullWidth
														id="email"
														value={email}
														onChange={(e) => setEmail(e.target.value)}
														label="Email Address"
														name="email"
														autoComplete="email"
													/>
												</Grid>
												<Grid item xs={12}>
													{/* <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                          /> */}

													<FormControl variant="outlined" fullWidth required>
														<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
														<OutlinedInput
															id="outlined-adornment-password"
															type={showPassword ? 'text' : 'password'}
															onChange={(e) => setPassword(e.target.value)}
															endAdornment={
																<InputAdornment position="end">
																	<IconButton
																		aria-label="toggle password visibility"
																		onClick={handleClickShowPassword}
																		onMouseDown={handleMouseDownPassword}
																		edge="end"
																	>
																		{showPassword ? <VisibilityOff /> : <Visibility />}
																	</IconButton>
																</InputAdornment>
															}
															label="Password"
														/>
													</FormControl>
												</Grid>
											</Grid>
											<Button
												type="submit"
												fullWidth
												variant="contained"
												sx={{ mt: 3, mb: 2, bgcolor: Colors.primaryColor }}
												onClick={register}
											>
												Sign Up
											</Button>
											<Grid container justifyContent="flex-end">
												<Grid item>
													<Link href="/login" variant="body2" sx={{ color: Colors.primaryColor }}>
														Already have an account? Sign in
													</Link>
												</Grid>
											</Grid>
										</Box>
									</Box>
								</Container>
							</ThemeProvider>
						</Grid>
						<Grid item xs={4}>
							<Box>
								<PasswordRules />
							</Box>
						</Grid>
					</Grid>
				</Box>
			</div>
		</div>
	);
}

export default SignUp;
