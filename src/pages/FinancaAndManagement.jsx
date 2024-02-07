import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TechVideos from '../Layouts/Main/TechVideos/index';

function FinanceAndManagement() {
	const navigate = useNavigate();

	const subtoptics = ['Using & Managing credit and debit cards', 'Maintaining Credit score', 'Bank Accounts', 'Savings & Interest', 'Financial scams', 'Investments & risks'];
	const introText = "Search videos tutorials for help with financial well being and management";
	const pageValue = "finance";

	useEffect(() => {
		navigate('/financeAndManagement');
	}, [navigate]);

	return (
		<TechVideos introText={introText} pageValue={pageValue} subtoptics={subtoptics} />
	);
}

export default FinanceAndManagement;
