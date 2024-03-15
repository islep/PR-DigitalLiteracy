import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import TechVideos from '../Layouts/Main/TechVideos/index';

function TechSafetyAndPrivacy() {
	const initialPageContent = 'safety_privacy';
	const introText = 'Search video tutorials for information on technology safety and privacy';

	useEffect(() => {
		window.scrollTo(0, 0);
	});

	useEffect(() => {
		ReactGA.send({
			hitType: 'page_view',
			page_location: window.location.pathname,
		});
	}, []);

	return <TechVideos introText={introText} initialPageContent={initialPageContent} />;
}

export default TechSafetyAndPrivacy;
