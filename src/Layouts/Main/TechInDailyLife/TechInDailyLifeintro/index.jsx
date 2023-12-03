import React, { useEffect, useState } from 'react';
import { Box, Grid, MenuItem, Select, Divider } from '@mui/material';
import { Colors } from '../../../../constants/Colors';
import { useAuth } from '../../../../firebase/AuthContext';

export function TechInDailyLifeIntro({ dataFromFirebase, dataFromDailyLifeIntro }) {
	const [value, setValue] = useState('All');
	const [osvalue, setosValue] = useState([]);

	const pageValue = 'daily_life';

	useEffect(() => {
		console.log('useEffect for setting osvalue based on dataFromFirebase and value');
		if (Array.isArray(dataFromFirebase) && dataFromFirebase.length > 0) {
			const transformedData = dataFromFirebase.map((item) => ({
				category: item.category,
				messages: item.messages,
				operating_system: item.operating_system,
				stopTimes: item.stopTimes,
				tags: item.tags,
				url: item.url,
			}));
			if (value === 'All') {
				const os = transformedData.filter((video) => video.category === pageValue);
				setosValue(os);
			} else {
				const os = transformedData.filter((video) => video.operating_system === value && video.category === pageValue);
				setosValue(os);
			}
		} else {
			console.log('dataFromFirebase is empty or not an array');
		}
	}, [value, dataFromFirebase]);

	useEffect(() => {
		console.log('useEffect for sending osvalue to dataFromDailyLifeIntro');
		dataFromDailyLifeIntro(osvalue);
	}, [osvalue]);

	const filteros = (e) => {
		setValue(e.target.value);
	};

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
				<Select value={value} onChange={filteros}>
					<MenuItem disabled>Mobile Devices</MenuItem>
					<MenuItem value="iOS">iOS</MenuItem>
					<MenuItem value="Android">Android</MenuItem>
					<Divider />
					<MenuItem disabled>PC</MenuItem>
					<MenuItem value="Windows">Windows</MenuItem>
					<MenuItem value="Mac">Mac</MenuItem>
					<MenuItem value="Linux">Linux</MenuItem>
					<Divider />
					<MenuItem value="All">All</MenuItem>
				</Select>
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
							fontSize: {
								md: '2.75rem',
								sm: '3rem',
								xs: '2rem',
							},
						}}
					>
						Search video tutorials for help with technology used in daily life
					</Box>
				</Box>
			</Grid>
		</>
	);
}

export default TechInDailyLifeIntro;
