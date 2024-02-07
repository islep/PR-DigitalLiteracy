import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TechVideos from '../Layouts/Main/TechVideos/index';

function TechInDailyLife() {
	const navigate = useNavigate();

	const subtoptics = [];
	const pageValue = "daily_life";
	const introText = "Search video tutorials for help with technology used in daily life";

	useEffect(() => {
		navigate('/techInDailyLife');
	}, [navigate]);

	return (
		<TechVideos introText={introText} pageValue={pageValue} subtoptics={subtoptics} />
	);
}

export default TechInDailyLife;