import { React, useEffect, useState } from 'react';
import { Box, Grid, MenuItem, Select, Divider } from '@mui/material';

import { doc, getDoc } from 'firebase/firestore';
import { Colors } from '../../../constants/Colors';
import { useAuth } from '../../../firebase/AuthContext';
import { db } from '../../../firebase/firebase';

export function Intro({ introText }) {

	return (
		<>
			<Box
				sx={{
					fontFamily: 'Inria Sans',
					color: Colors.primaryColor,
					fontWeight: '700',
					textAlign: 'right',
					paddingRight: '2rem',
					paddingTop: '1rem',
					fontSize: {
						md: '2.75rem',
						sm: '3rem',
						xs: '2rem',
					},
				}}
			>
			</Box>
			<Grid item md={6} xs={12}>
				<Box
					sx={{
						marginTop: { md: '4rem', sm: '2rem', xs: '2rem' },
						textAlign: 'center',
					}}
				>
					<Box
						sx={{
							fontFamily: 'Inria Sans',
							color: Colors.primaryColor,
							fontWeight: '700',
							textAlign: 'center',
							fontSize: {
								md: '2.75rem',
								sm: '3rem',
								xs: '2rem',
							},
						}}
					>
						{introText}
					</Box>
				</Box>
			</Grid>
		</>
	);
}

export default Intro;
