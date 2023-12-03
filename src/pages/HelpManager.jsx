import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useAuth } from '../firebase/AuthContext';
import Navbar from '../Layouts/Navbar';
import { Colors } from '../constants/Colors';
import Help from '../Layouts/Main/Help';

function HelpManager() {
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser && currentUser.uid === 'h9IvP69YaPfmcNFiqx78VUnwJ0v2') {
			navigate('/helpManager');
		} else {
			navigate('/home');
		}
	}, [currentUser, navigate]);

	return (
		<div>
			<Navbar />
			<Help />

			<div style={{ position: 'relative' }}>
				<Box
					sx={{
						backgroundColor: Colors.primaryColor,
						height: '4rem',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'absolute',
						marginTop: '45vh',
						width: '100%',
					}}
				>
					<Typography
						sx={{
							color: Colors.white,
							fontFamily: 'Inria Sans',
							textAlign: 'center',
							marginTop: '1rem',
							fontSize: { md: '1rem', xs: '0.7rem' },
						}}
					>
						© {new Date().getFullYear()} Project Rebound | All Rights Reserved
					</Typography>
				</Box>
			</div>
		</div>
	);
}

export default HelpManager;
