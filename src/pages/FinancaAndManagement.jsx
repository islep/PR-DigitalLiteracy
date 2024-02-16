import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TechVideos from '../Layouts/Main/TechVideos/index';

function FinanceAndManagement() {
	const navigate = useNavigate();

	const introText = "Search videos tutorials for help with financial well being and management";
	const initialPageContent = "finance";

	useEffect(() => {
		navigate('/financeAndManagement');
	}, [navigate]);

	return (
		<TechVideos introText={introText} initialPageContent={initialPageContent} />
	);
}

export default FinanceAndManagement;
