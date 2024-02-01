import { React, useEffect, useState } from 'react';
import { Box, Grid, MenuItem, Select, Divider } from '@mui/material';

import { doc, getDoc } from 'firebase/firestore';
import { Colors } from '../../../../constants/Colors';
import { useAuth } from '../../../../firebase/AuthContext';
import { db } from '../../../../firebase/firebase';

export function FinanceAndManagementIntro({ dataFromFirebase, dataFromFinanceAndManagementIntro }) {
	const { currentUser } = useAuth();
	const [value, setValue] = useState('');
	const [osvalue, setosValue] = useState([]);
	const pageValue = 'finance';
	let docRef;

	if (currentUser !== null) {
		docRef = doc(db, 'users', currentUser.uid);
	}

	useEffect(() => {
		console.log('useEffect 2');
		if (currentUser !== null) {
			getDoc(docRef).then((doc) => {
				setValue(doc.data().operating_system_used);
			});
		}
		setValue('All');
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		console.log('useEffect 3');
		console.log('dataFromFirebase type is ', typeof dataFromFirebase);
		if (Array.isArray(dataFromFirebase)) {
			const transformedData = dataFromFirebase.map((item) => ({
				category: item.category,
				messages: item.messages,
				operating_system: item.operating_system,
				stopTimes: item.stopTimes,
				tags: item.tags,
				url: item.url,
				subtopic: item.subtopic,
			}));
			if (value === 'All') {
				const os = transformedData.filter((video) => video.category === pageValue);
				setosValue(os);
			} else {
				const os = transformedData.filter((video) => video.operating_system === value && video.category === pageValue);
				setosValue(os);
			}
		} else {
			console.log('dataFromFirebase is not an array');
		}
		// eslint-disable-next-line
	}, [value, dataFromFirebase]);

	useEffect(() => {
		dataFromFinanceAndManagementIntro(osvalue);
		// eslint-disable-next-line
	}, [osvalue]);

	const filteros = (e) => {
		const keyword = e.target.value;

		if (keyword !== 'All') {
			const filterd_os = osvalue.filter((video) => video.operating_system === keyword);
			setosValue(filterd_os);
		} else if (Array.isArray(dataFromFirebase)) {
			const transformedData = dataFromFirebase.map((item) => ({
				category: item.category,
				messages: item.messages,
				operating_system: item.operating_system,
				stopTimes: item.stopTimes,
				tags: item.tags,
				url: item.url,
				subtopic: item.subtopic,
			}));
			setosValue(transformedData.filter((video) => video.category === pageValue));
		} else {
			console.log('dataFromFirebase is not an array');
		}
		setValue(keyword);
	};

	console.log('value ', value);
	console.log('osvalue: ', osvalue);
	const twoCalls = (e) => {
		setValue(e.target.value);
		filteros(e);
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
				<Select
					value={value}
					onChange={(e) => {
						twoCalls(e);
					}}
				>
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
							textAlign: 'center',
							fontSize: {
								md: '2.75rem',
								sm: '3rem',
								xs: '2rem',
							},
						}}
					>
						Search videos tutorials for help with financial well being and management
					</Box>
				</Box>
			</Grid>
		</>
	);
}

export default FinanceAndManagementIntro;
