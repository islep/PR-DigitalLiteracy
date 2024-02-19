import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TechVideos from '../Layouts/Main/TechVideos/index';

function TechSafetyAndPrivacy() {
	const navigate = useNavigate();

	const initialPageContent = "safety_privacy";
	const introText = "Search video tutorials for information on technology safety and privacy";

	useEffect(() => {
		window.scrollTo(0, 0);
	});

	useEffect(() => {
		navigate('/techSafetyAndPrivacy');
	}, [navigate]);

	return (
		<TechVideos introText={introText} initialPageContent={initialPageContent} />
	);
}

export default TechSafetyAndPrivacy;
