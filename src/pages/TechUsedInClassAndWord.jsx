import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TechVideos from '../Layouts/Main/TechVideos/index';

function TechUsedInClassAndWord() {
	const navigate = useNavigate();

	const subtoptics = [];
	const introText = "Search video tutorials for help with technology used in class and Work";
	const pageValue = "class_word";

	useEffect(() => {
		navigate('/techInClassAndWord');
	}, [navigate]);

	return (
		<TechVideos introText={introText} pageValue={pageValue} subtoptics={subtoptics} />
	);
}

export default TechUsedInClassAndWord;