import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import TechInDailyLifeIntro from '../Layouts/Main/TechInDailyLife/TechInDailyLifeintro';
import YouTubeVideoSection from '../Layouts/Main/TechInDailyLife/YouTubeVideoSection';
import { db } from '../firebase/firebase';
import FilterPanel from '../components/FilterPanel';

function TechInDailyLife() {
	const [osvalue, setosValue] = useState([]);
	const [dataFromFirebase, setDatafromFirebase] = useState([]);

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
				{dataFromFirebase ? (
					<TechInDailyLifeIntro dataFromDailyLifeIntro={dataFromDailyLifeIntro} dataFromFirebase={dataFromFirebase} />
				) : (
					<div>
						<CircularProgress />
					</div>
				)}
				{osvalue.length > 0 ? <YouTubeVideoSection osvalue={osvalue} /> : <div>Loading...</div>}
			</div>
		</>
	);
}

export default TechInDailyLife;
