import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TechVideos from '../Layouts/Main/TechVideos/index';

function TechUsedInClassAndWork() {
	const navigate = useNavigate();

	const introText = "Search video tutorials for help with technology used in class and Work";
	const initialPageContent = "class_word";

	useEffect(() => {
		navigate('/techInClassAndWork');
	}, [navigate]);

	return (
		<TechVideos introText={introText} initialPageContent={initialPageContent} />
	);
}

export default TechUsedInClassAndWork;