import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import TechUsedInClassAndWordIntro from '../Layouts/Main/TechUsedInClassAndWord/TechUsedInClassAndWordIntro';
import YouTubeVideoSection from '../Layouts/Main/TechInDailyLife/YouTubeVideoSection';
import SubtopicSelection from '../components/Video/SubtopicSelection';
import Breadcrumb from '../components/Video/Breadcrumb';
import Searchbar from '../components/Video/Searchbar';
import { db } from '../firebase/firebase';
import FilterPanel from '../components/FilterPanel';
import { Box } from '@mui/material';

function TechUsedInClassAndWord() {
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

	const dataFromClassAndWordIntro = (osvalue) => {
		setosValue(osvalue);
	};

	useEffect(() => {
		navigate('/techInClassAndWord');
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
				<TechUsedInClassAndWordIntro
					dataFromClassAndWordIntro={dataFromClassAndWordIntro}
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

export default TechUsedInClassAndWord;


/*
<div className="pl-80">

				{dataFromFirebase ? (
					<TechUsedInClassAndWordIntro
						dataFromClassAndWordIntro={dataFromClassAndWordIntro}
						dataFromFirebase={dataFromFirebase}
					/>
				) : (
					<div>
						<CircularProgress />
					</div>
				)}


				{subtopicValue.length > 0 ? (
					(osvalue.length > 0 ? (
						<YouTubeVideoSection osvalue={osvalue}
							subtopicValue={subtopicValue}
							handleResetSubtopic={handleResetSubtopic}
						/>
					)
						: <div>Loading...</div>)
				) : (
					<SubtopicSelector
						dataFromSubtopicSelector={dataFromSubtopicSelector}
						subtopics={subtoptics} />
				)}
</div>
*/