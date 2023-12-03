import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import Swal from 'sweetalert2';
import './message.css';

function YoutubeEmbed({ embedId, stopTimes, messages }) {
	console.log('Rendering YoutubeEmbed...');
	const playerRef = useRef(null);
	const [pauseTimes, setPauseTimes] = useState(stopTimes);
	const pauseIndexRef = useRef(0);
	// const [isLoading, setIsLoading] = useState(true);

	console.log('pauseTimes: ', stopTimes);
	console.log('messages: ', messages);
	console.log('pauseIndexRef.current', pauseIndexRef.current);
	console.log('embedId', embedId);

	useEffect(() => {
		setPauseTimes(stopTimes);
	}, [stopTimes]);

	// eslint-disable-next-line
	function onStateChange(event) {
		const player = playerRef.current?.internalPlayer;

		if (event.data === window.YT.PlayerState.PLAYING) {
			// eslint-disable-next-line
			const currentTime = player.getCurrentTime();
			if (pauseTimes[pauseIndexRef.current] === undefined) {
				pauseIndexRef.current = 0;
			}
		}
	}

	const restartVideoFrom = (lastPauseIndex) => {
		const player = playerRef.current?.internalPlayer;
		console.log('lastPauseTime in restartVideoFrom: ', lastPauseIndex);
		pauseVideo();
		if (lastPauseIndex === 0) {
			restartVideo();
		} else {
			pauseIndexRef.current -= 1;
			player?.seekTo(pauseTimes[pauseIndexRef.current - 1]);
		}
		player?.playVideo();
	};

	const showResumeMessage = () => {
		console.log('In show message, ', pauseIndexRef.current);
		const message = messages[pauseIndexRef.current];
		if (message !== undefined) {
			Swal.fire({
				text: message,
				showCancelButton: true,
				cancelButtonText: 'Restart from the beginning',
				showDenyButton: true,
				denyButtonText: 'Restart last segment',
				showConfirmButton: true,
				confirmButtonText: 'Doing ok. Carry on.',
				customClass: {
					confirmButton: 'swal-button-color swal2-styled',
					cancelButton: 'swal-button-color swal2-styled',
					denyButton: 'swal-button-color swal2-styled',
					actions: 'swal-right-corner',
					popup: 'my-popup-class',
				},
				reverseButtons: true,
				buttonsStyling: false,
				width: '60rem',
				padding: '3rem',
				allowOutsideClick: false,
			}).then((result) => {
				if (result.isDismissed) {
					restartVideo();
				} else if (result.isConfirmed) {
					playVideo();
				} else if (result.isDenied) {
					if (pauseIndexRef.current !== undefined) {
						const lastPauseTime = pauseIndexRef.current - 1;
						console.log('lastPauseTime: ', lastPauseTime);
						restartVideoFrom(lastPauseTime);
					}
				}
			});
		}
	};

	useEffect(() => {
		console.log('pauseImes in useEffect: ', pauseTimes);
		if (playerRef.current && playerRef.current.internalPlayer) {
			if (pauseTimes !== undefined && pauseTimes.length > 0) {
				console.log('Adding event listener');
				playerRef.current?.internalPlayer?.addEventListener('onStateChange', onStateChange);
				return () => {
					console.log('Removing event listener');
					// eslint-disable-next-line
					playerRef.current?.internalPlayer?.removeEventListener('onStateChange', onStateChange);
				};
			}
		}
	}, [pauseTimes, playerRef, onStateChange]);

	const checkTime = async () => {
		if (playerRef.current && playerRef.current.internalPlayer) {
			const currentTime = await playerRef.current.internalPlayer.getCurrentTime();
			const nextPauseTime = pauseTimes[pauseIndexRef.current];

			if (currentTime > nextPauseTime && Math.abs(currentTime - nextPauseTime) < 0.1) {
				pauseVideo();
				showResumeMessage();
				pauseIndexRef.current += 1;
			}
		}
	};

	useEffect(() => {
		let intervalId = null;
		if (pauseTimes !== undefined) {
			if (pauseTimes.length > 0) {
				intervalId = setInterval(checkTime, 100);
			}
		}

		return () => {
			clearInterval(intervalId);
		};
		// eslint-disable-next-line
	}, [pauseTimes, playerRef]);

	function pauseVideo() {
		if (playerRef.current && playerRef.current.internalPlayer) {
			playerRef.current.internalPlayer.pauseVideo();
		}
	}

	function playVideo() {
		if (playerRef.current && playerRef.current.internalPlayer) {
			playerRef.current?.internalPlayer?.playVideo();
		}
	}

	function onReady(event) {
		if (playerRef.current && playerRef.current.internalPlayer) {
			event.target.pauseVideo();
			// setIsLoading(false);
		}
	}

	function restartVideo() {
		if (playerRef.current && playerRef.current.internalPlayer) {
			const player = playerRef.current?.internalPlayer;
			player?.pauseVideo();
			player?.seekTo(0);
			pauseIndexRef.current = 0;
			player?.playVideo();
		}
	}

	console.log('playerRef: ', playerRef);

	const opts = {
		height: '480',
		width: '853',
		playerVars: {
			autoplay: 0,
		},
	};

	console.log('Rendering YoutubeEmbed...');
	try {
		return (
			<div className="video-responsive">
				<YouTube videoId={embedId} opts={opts} onReady={onReady} ref={playerRef} />
			</div>
		);
	} catch (err) {
		console.log('Error initializing YouTube player', err);
		return null;
	}
}

YoutubeEmbed.propTypes = {
	embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
