import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { useAuth } from '../firebase/AuthContext';
import YouTubeVideo from '../Layouts/Main/YouTubeVideo/YouTubeVideo';

function AddYoutubeVideos() {
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser && currentUser.uid === process.env.REACT_APP_ADMIN_UID) {
			navigate('/addYoutubeVideos');
		} else {
			navigate('/');
		}
	}, [currentUser, navigate]);

	useEffect(() => {
		ReactGA.send({
			hitType: 'page_view',
			page_location: window.location.pathname,
		});
	});

	return (
		<div>
			<YouTubeVideo />
		</div>
	);
}

export default AddYoutubeVideos;
