import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TechVideos from '../Layouts/Main/TechVideos/index';

function TechSafetyAndPrivacy() {
	const navigate = useNavigate();

	const subtoptics = [];
	const pageValue = "safety_privacy";
	const introText = "Search video tutorials for information on technology safety and privacy";

	useEffect(() => {
		navigate('/techSafetyAndPrivacy');
	}, [navigate]);

	return (
		<TechVideos introText={introText} pageValue={pageValue} subtoptics={subtoptics} />
	);
}

export default TechSafetyAndPrivacy;
