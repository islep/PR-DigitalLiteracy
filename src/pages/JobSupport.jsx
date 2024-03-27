import React, { useEffect } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import JobSupportIntro from '../Layouts/Main/JobSupport/JobSupportIntro';
import ResumeSection from '../Layouts/Main/JobSupport/ResumeSection';
import { useAuth } from '../firebase/AuthContext';

function JobSupport() {
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		console.log('current user ', currentUser);
		if (currentUser) {
			navigate('/jobSupport');
		} else {
			navigate({
				pathname: '/login',
				search: createSearchParams({ fromPath: '/jobSupport' }).toString(),
			});
		}
	}, [currentUser, navigate]);

	return (
		<div>
			<JobSupportIntro />
			<ResumeSection />
		</div>
	);
}

export default JobSupport;
