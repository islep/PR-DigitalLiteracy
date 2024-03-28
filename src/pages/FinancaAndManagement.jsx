import React, { useEffect } from 'react';
import TechVideos from '../Layouts/Main/TechVideos/index';

function FinanceAndManagement() {
	const introText = 'Search videos tutorials for help with financial well being and management';
	const initialPageContent = 'finance';

	useEffect(() => {
		window.scrollTo(0, 0);
	});

	return <TechVideos introText={introText} initialPageContent={initialPageContent} />;
}

export default FinanceAndManagement;
