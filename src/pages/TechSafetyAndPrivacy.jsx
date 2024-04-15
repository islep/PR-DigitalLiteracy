import React, { useEffect } from 'react';
import TechVideos from '../Layouts/Main/TechVideos/index';

function TechSafetyAndPrivacy() {
	const initialPageContent = 'safety_privacy';
	const introText = 'Search video tutorials for information on technology safety and privacy';

	useEffect(() => {
		window.scrollTo(0, 0);
	});

	return <TechVideos introText={introText} initialPageContent={initialPageContent} />;
}

export default TechSafetyAndPrivacy;
