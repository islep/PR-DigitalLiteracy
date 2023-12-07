import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import YouTubeVideoSection from '../Layouts/Main/TechInDailyLife/YouTubeVideoSection';
import FinanceAndManagementIntro from '../Layouts/Main/FinanceAndManagement/FinanceAndManagementIntro';
import { db } from '../firebase/firebase';
import FilterPanel from '../components/FilterPanel';

function FinanceAndManagement() {
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

	const dataFromFinanceAndManagementIntro = (osvalue) => {
		setosValue(osvalue);
	};

	useEffect(() => {
		navigate('/financeAndManagement');
	}, [navigate]);

	return (
		<div>
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
				<FinanceAndManagementIntro
					dataFromFinanceAndManagementIntro={dataFromFinanceAndManagementIntro}
					dataFromFirebase={dataFromFirebase}
				/>
				<YouTubeVideoSection osvalue={osvalue} />
			</div>
		</div>
	);
}

export default FinanceAndManagement;
