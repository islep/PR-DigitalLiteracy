import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import TechSafetyAndPrivacyIntro from '../Layouts/Main/TechSafetyAndPrivacy/TechSafetyAndPrivacyIntro';
import YouTubeVideoSection from '../Layouts/Main/TechInDailyLife/YouTubeVideoSection';
import SubtopicSelection from '../components/SubtopicSelection';
import Breadcrumb from '../components/Breadcrumb';
import Searchbar from '../components/Searchbar';
import { db } from '../firebase/firebase';
import FilterPanel from '../components/FilterPanel';
import { Box } from '@mui/material';

function TechSafetyAndPrivacy() {
	const navigate = useNavigate();
	const [osvalue, setosValue] = useState([]);
	const [dataFromFirebase, setDatafromFirebase] = useState([]);
	const docRef = collection(db, 'youtube-videos');

	// video search constants
	const [subtopicValue, setsubtopicValue] = useState([]);
	const [tags, tagsFromSearchBar] = useState([]);

	// FINAL VALUES (move to constant folder)
	const subtoptics = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6'];

	useEffect(() => {
		console.log('useEffect 1');
		const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
			const videos = querySnapshot.docs.map((doc) => doc.data());
			setDatafromFirebase(Object.values(videos));
		});

		return unsubscribe;
		// eslint-disable-next-line
	}, []);

	const dataFromSafetyAndPrivacyIntro = (osvalue) => {
		setosValue(osvalue);
	};

	useEffect(() => {
		navigate('/techSafetyAndPrivacy');
	}, [navigate]);

	const dataFromSubtopicSelector = (subtopicValue) => {
		setsubtopicValue(subtopicValue);
	};

	const handleResetSubtopic = () => {
		setsubtopicValue([]);
	};

	return (
		<>
			<FilterPanel
				filterGroups={[
					{
						subheading: 'Device Type',
						filters: ['Mobile - iOS', 'Mobile - Android', 'Desktop - Windows', 'Desktop - Mac', 'Desktop - Linux'],
					},
					{
						subheading: 'Content Type',
						filters: ['Daily Life', 'Finance', 'Safety Privacy'],
					},
				]}
			/>

			<div className="md:pl-80">
				<TechSafetyAndPrivacyIntro
					dataFromSafetyAndPrivacyIntro={dataFromSafetyAndPrivacyIntro}
					dataFromFirebase={dataFromFirebase}
				/>

				<Box style={{ margin: 'auto', width: '70%' }}>
					<Searchbar tagsFromSearchBar={tagsFromSearchBar} tags={tags} />
					<Breadcrumb subtopicValue={subtopicValue} handleResetSubtopic={handleResetSubtopic} />
				</Box>

				{subtopicValue.length > 0 || tags.length > 0 ? (
					<YouTubeVideoSection
						osvalue={osvalue}
						subtopicValue={subtopicValue}
						tags={tags}
					/>
				) : (
					<SubtopicSelection
						dataFromSubtopicSelector={dataFromSubtopicSelector}
						subtopics={subtoptics} />
				)}
			</div>
		</>
	);
}

export default TechSafetyAndPrivacy;
