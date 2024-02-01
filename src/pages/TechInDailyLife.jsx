import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import TechInDailyLifeIntro from '../Layouts/Main/TechInDailyLife/TechInDailyLifeintro';
import SubtopicSelection from '../components/Video/SubtopicSelection';
import Searchbar from '../components/Video/Searchbar';
import YouTubeVideoSection from '../Layouts/Main/TechInDailyLife/YouTubeVideoSection';
import { db } from '../firebase/firebase';
import FilterPanel from '../components/FilterPanel';
import { Breadcrumb } from '../components/Video/Breadcrumb';
import { Box } from '@mui/material';

function TechInDailyLife() {
	const [osvalue, setosValue] = useState([]);
	const [dataFromFirebase, setDatafromFirebase] = useState([]);

	// video search constants
	const [subtopicValue, setsubtopicValue] = useState([]);
	const [tags, tagsFromSearchBar] = useState([]);

	// FINAL VALUES (move to constant folder)
	const subtoptics = [];

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, 'youtube-videos'), (querySnapshot) => {
			const videos = querySnapshot.docs.map((doc) => doc.data());
			setDatafromFirebase(Object.values(videos));
		});

		return unsubscribe;
	}, []);

	const dataFromDailyLifeIntro = (osvalue) => {
		setosValue(osvalue);
	};

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
				<TechInDailyLifeIntro
					dataFromDailyLifeIntro={dataFromDailyLifeIntro}
					dataFromFirebase={dataFromFirebase}
				/>

				<Box style={{ margin: 'auto', width: '70%', paddingBottom: '2rem' }}>
					<Searchbar tagsFromSearchBar={tagsFromSearchBar} tags={tags} />
					<Breadcrumb subtopicValue={subtopicValue} handleResetSubtopic={handleResetSubtopic} subtopics={subtoptics} />
				</Box>

				{subtoptics.length == 0 || subtopicValue.length > 0 || tags.length > 0 ? (
					<YouTubeVideoSection
						osvalue={osvalue}
						subtopicValue={subtopicValue}
						handleResetSubtopic={handleResetSubtopic}
						tags={tags}
					/>
				) : (
					<SubtopicSelection
						dataFromSubtopicSelector={dataFromSubtopicSelector}
						subtopics={subtoptics} />
				)}
			</div >
		</>
	);
}

export default TechInDailyLife;