
import { React, useEffect, useState } from 'react';
import { Box, Grid, MenuItem, Select, Divider } from '@mui/material';

import { doc, getDoc } from 'firebase/firestore';
import { Colors } from '../../../constants/Colors';
import { useAuth } from '../../../firebase/AuthContext';
import { db } from '../../../firebase/firebase';

export function FirebaseRetrieveVideos({ dataFromFirebase, dataFromIntro }) {

	const { currentUser } = useAuth();
	const [value, setValue] = useState('');
	const [osvalue, setosValue] = useState([]);
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
				key: item.url,
			}));
			setosValue(transformedData);
		} else {
			console.log('dataFromFirebase is not an array');
		}
		// eslint-disable-next-line
	}, [value, dataFromFirebase]);

	useEffect(() => {
		dataFromIntro(osvalue);
		// eslint-disable-next-line
	}, [osvalue]);
}

export default FirebaseRetrieveVideos;
