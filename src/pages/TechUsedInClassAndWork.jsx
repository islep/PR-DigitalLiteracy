import React, { useEffect } from 'react';
import TechVideos from '../Layouts/Main/TechVideos/index';

function TechUsedInClassAndWork() {
	const introText = 'Search video tutorials for help with technology used in class and Work';
	const initialPageContent = 'class_word';

	useEffect(() => {
		window.scrollTo(0, 0);
	});

	return <TechVideos introText={introText} initialPageContent={initialPageContent} />;
}

export default TechUsedInClassAndWork;
