import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import YouTubeVideo from '../Layouts/Main/YouTubeVideo/YouTubeVideo';

function AddYoutubeVideos() {
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser && currentUser.uid === process.env.REACT_APP_ADMIN_UID) {
			navigate('/addYoutubeVideos');
		} else {
			navigate('/home');
		}
	}, [currentUser, navigate]);

	return (
		<div>
			<YouTubeVideo />
		</div>
	);
}

export default AddYoutubeVideos;
