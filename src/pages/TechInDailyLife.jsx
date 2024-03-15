import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import TechVideos from '../Layouts/Main/TechVideos/index';

function TechInDailyLife() {
	const initialPageContent = 'daily_life';
	const introText = 'Search video tutorials for help with technology used in daily life';

	useEffect(() => {
		window.scrollTo(0, 0);
	});

	useEffect(() => {
		ReactGA.send({
			hitType: 'page_view',
			page_location: window.location.pathname,
		});
	});

	return <TechVideos introText={introText} initialPageContent={initialPageContent} />;
}

export default TechInDailyLife;
