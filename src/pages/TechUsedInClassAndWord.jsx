import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import TechUsedInClassAndWordIntro from '../Layouts/Main/TechUsedInClassAndWord/TechUsedInClassAndWordIntro';
import YouTubeVideoSection from '../Layouts/Main/TechInDailyLife/YouTubeVideoSection';
import { db } from '../firebase/firebase';
import FilterPanel from '../components/FilterPanel';

function TechUsedInClassAndWord() {
	const navigate = useNavigate();
	const [osvalue, setosValue] = useState('');
	const [dataFromFirebase, setDatafromFirebase] = useState([]);
	const docRef = collection(db, 'youtube-videos');

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
			<div className="pl-80">
				<TechUsedInClassAndWordIntro
					dataFromClassAndWordIntro={dataFromClassAndWordIntro}
					dataFromFirebase={dataFromFirebase}
				/>
				<YouTubeVideoSection osvalue={osvalue} />
			</div>
		</>
	);
}

export default TechUsedInClassAndWord;
