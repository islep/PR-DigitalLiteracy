import React, { useState, useEffect, useRef } from 'react';//temp added useRef remove if removed
import { addVideoData } from '../../../../firebase/firebaseReadWrite';
import { Colors } from '../../../../constants/Colors';
import { inputStyle, multiLineInputStyle } from '../../ResumeBuilder/styles.js';
import {
	Box,
	Grid,
	FormControl,
	FormControlLabel,
	Checkbox,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Button,
	Divider,
} from '@mui/material';
import YouTube from 'react-youtube';
import { TagsInput } from 'react-tag-input-component';
import './styles.css';
import Swal from 'sweetalert2';
import { filter } from 'lodash';

function YouTubeVideo() {
	const [url, setUrl] = useState('');
	const [tags, setTags] = useState([]);
	const [operating_system, setOs] = useState('');
	const [category, setCategory] = useState('');
	const [videoId, setVideoId] = useState('');
	const [opts, setOpts] = useState({});

	const [count, setCount] = useState(0); // as far as i can tell this variable does like actually nothing?

	// adding for checkbox
	const [isChecked, setIsChecked] = useState(false);
	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const [isChapter, setIsChapter] = useState(false);

	const handleUrlChange = async (e) => {
		const newurl = e.target.value;
		setUrl(newurl);
		setVideoId(getVideoId(newurl));

		// here check if can have default checkbox (later might be good idea to consolidate this so we dont have to make fetch calls twice)
		// first is check if chapters
		try {
			const response = await fetch(
				`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${getVideoId(newurl)}&key=${
					process.env.REACT_APP_YOUTUBE_API_KEY
				}`,
			);
			const data = await response.json();
			const video = data.items[0];

			const desc = video.snippet.description;
			const lines = desc.split('\n');
			const filteredLines = lines.filter((line) => /^\s*\d+:\d+/.test(line));

			// if there are chapter then make isChapter true which will unhide the checkbox
			if (filteredLines.length > 0) {
				//alert("HAS CHAPTERS");
				setIsChapter(true);
			} else {
				//alert("Thinks has no chapters?");
				setIsChapter(false);
			}
		} catch {}
	};

	const getVideoId = (url) => {
		const videoIdRegex =
			/(?:(?:https?:\/\/)?(?:www\.)?)?youtu(?:\.be\/|be.com\/(?:watch\?(?:.*&)?v=|(?:embed|v)\/))([\w'-]+)/i;
		const match = url.match(videoIdRegex);
		if (match && match[1]) {
			return match[1];
		}
		setVideoId('');
		setUrl('');
		Swal.fire({
			width: '30rem',
			height: '20rem',
			icon: 'error',
			title: 'Oops...',
			text: '"Please enter a valid YouTube video URL."',
		});
	};

	useEffect(() => {
		setOpts({
			height: '390',
			width: '640',
			playerVars: {
				autoplay: 0,
			},
		});
	}, []);

	const [messages, setMessage] = useState([
		{
			messages: '',
		},
	]);
	const [stopTimes, setStopTimes] = useState([
		{
			stopTimes: '',
		},
	]);

	{
		/* changing for if box is checked */
	}
	const handleSubmit = async (e) => {
		
		if (isChecked) {
			// alert("CHECKED");
			e.preventDefault();
			setVideoId('');

			const urlRegex = /^(https?:\/\/)/i;

			try {
				const response = await fetch(
					`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${getVideoId(url)}&key=${
						process.env.REACT_APP_YOUTUBE_API_KEY
					}`,
				);
				const data = await response.json();
				const video = data.items[0];

				const desc = video.snippet.description;
				// filter the description for the timestamps
				const lines = desc.split('\n');
				const filteredLines = lines.filter((line) => /^\s*\d+:\d+/.test(line));
				const updatedStopTimes = filteredLines.map((line) => convertToSeconds(line.split(' ')[0]));
				updatedStopTimes.shift();
				const updatedMessages = filteredLines.map(() => 'Are you following along so far?');

				setStopTimes(updatedStopTimes);
				setMessage(updatedMessages);

				try {
					await addVideoData('youtube-videos', {
						url: url,
						tags: tags,
						operating_system: operating_system,
						category: category,
						stopTimes: updatedStopTimes,
						messages: updatedMessages,
					});
					
					setUrl('');
					setTags([]);
					setOs('');
					setCategory('');
					setStopTimes([{ stopTimes: '' }]);
					setMessage([{ message: '' }]);
					// set checked to false
					setIsChecked(false);
					setIsChapter(false);
					console.log("isChecked: " + isChecked + "\nisChapter: " + isChapter);
	
					Swal.fire({
						width: '30rem',
						//height: '10rem',
						text: 'Video added successfully!',
						icon: 'success',
					});
				} catch (e) {
					console.log('Error adding video:', e);
				}
			} catch (e) {
				alert(e);
			}
		} else {
			e.preventDefault();
			setVideoId('');

			// eslint-disable-next-line
			const urlRegex = /^(https?:\/\/)/i;

			try {
				await addVideoData('youtube-videos', {
					url: url,
					tags: tags,
					operating_system: operating_system,
					category: category,
					stopTimes: stopTimes,
					messages: messages,
				});
				
				setUrl('');
				setTags([]);
				setOs('');
				setCategory('');
				setStopTimes([{ stopTimes: '' }]);
				setMessage([{ message: '' }]);

				setIsChecked(false);
				setIsChapter(false);

				const textField = document.getElementById(`stopTimeTextField_0`);
				if (textField) {
					textField.value = '';
				}
				const textField2 = document.getElementById(`confirmationTextField_0`);
				if (textField2) {
					textField2.value = '';
				}

				Swal.fire({
					width: '30rem',
					//height: '10rem',
					text: 'Video added successfully!',
					icon: 'success',
				});
			} catch (e) {
				console.log('Error adding video:', e);
			}
		}
	};

	const playerRef = useRef(null);
	const handleClickTime = async (index) => {
		if (playerRef.current) {
			const currentTime = await playerRef.current.internalPlayer.getCurrentTime();
			const formattedTime = `${Math.floor(currentTime / 60)}:${(currentTime % 60).toFixed(0).padStart(2, '0')}`;
			const reverseIndex = (messages.length - index - 1);
			stopTimes[reverseIndex] =  convertToSeconds(formattedTime);

			// Assuming you have the id stored in a variable called textFieldId
			const textField = document.getElementById(`stopTimeTextField_${(reverseIndex)}`);
			if (textField) {
				textField.value = formattedTime;
			}
		}
		
	  };

	// doest work yet
	const videoTime = (e) => {
		if (e.data === window.YT.PlayerState.PAUSED) {
			const currentTime = e.target.getCurrentTime();
			const formattedTime = `${Math.floor(currentTime / 60)}:${(currentTime % 60).toFixed(0).padStart(2, '0')}`;
			//alert(formattedTime);
		}
	};

	// doesnt work yet
	const handleSeek = (e) => {
		const currentTime = e.target.getCurrentTime();
		const formattedTime = `${Math.floor(currentTime / 60)}:${(currentTime % 60).toFixed(0).padStart(2, '0')}`;
		//alert(formattedTime);
	};

	const onAddBtnClick = () => {
		const newField = {
			messages: '',
			stopTimes: '',
		};
		//You have to be specific of which field of newField to solve the previous commenting messages issue.
		setMessage([...messages, newField.messages]);
		setStopTimes([...stopTimes, newField.stopTimes]);
		// alert("Messages are: " + messages + "\nStop times are: " + stopTimes);
	};

	const remove = (index) => {
		const messagedata = [...messages];
		messagedata.splice(index, 1);
		setMessage(messagedata);
		const stopdata = [...stopTimes];
		stopdata.splice(index, 1);
		setStopTimes(stopdata);
		setCount(count + 1);
	};

	const convertToSeconds = (time) => {
		const [minutes, seconds] = time.split(':').map((num) => parseInt(num));
		return minutes * 60 + seconds;
	};

	const handleChange = (index, event) => {
		const stopTime = [...stopTimes];
		const message = [...messages];
		if (event.target.name === 'stopTimes') {
			stopTime[index] = convertToSeconds(event.target.value);
			// ("stopTime is: " + stopTime + "\nIndex is: " + index);
		} else if (event.target.name === 'messages') {
			message[index] = event.target.value;
			// alert("message is: " + message + "\nIndex is: " + index);
		}
		setStopTimes(stopTime);
		setMessage(message);
		setCount(count + 1);
	};

	const messageInput = messages.map((input, index) => (
		<Box key={messages.length - index - 1}>
			<Grid
				container
				spacing={2}
				sx={{
					margin: 'auto',
					width: '97%',
					paddingRight: '0.5rem',
					marginTop: '1rem',
				}}
			>
				<Grid item md={6} sm={6} xs={12} order={{ xs: 1 }}>
					<Box
						sx={{
							width: '97%',
							margin: 'auto',
							color: Colors.primaryColor,
							fontWeight: '700',
						}}
					>
						Segment #{messages.length - index}
					</Box>
				</Grid>

				<Grid item md={6} sm={6} xs={12} order={{ xs: 1 }}>
					<Box
						sx={{
							color: Colors.primaryColor,
							fontSize: { sm: '1rem', xs: '0.8rem' },
							textAlign: 'right',
							paddingRight: '1rem',
							cursor: 'pointer',
						}}
						onClick={() => {
							remove(index);
						}}
					>
						- Remove Segment
					</Box>
				</Grid>
			</Grid>

			<Grid
				key={messages.length - index - 1}
				id={`experience-form-${messages.length - index - 1}`}
				container
				spacing={2}
				sx={{ margin: 'auto', width: '97%', paddingRight: '0.5rem' }}
			>
				<Grid container spacing={2} sx={{ margin: 'auto', width: '97%', paddingRight: '0.5rem' }}>
					<Grid item>
						<Box
							sx={{
								marginTop: '1.2rem',
								color: Colors.primaryColor,
								fontSize: '1rem',
								fontFamily: 'Inria Sans',
								fontWeight: '700',
								marginLeft: '0.5rem',
							}}
						>
							Stop Times:
						</Box>
					</Grid>
					<Grid item md={8} sm={6} xs={12}>
						<Box
							component="form"
							sx={{
								'& > :not(style)': { width: '100%' },
							}}
							autoComplete="off"
						>
							<TextField
								value={input.stopTime}
								//borderRadius=".375rem"
								sx={inputStyle}
								variant="filled"
								placeholder="Specify pause times for video in format min:sec, e.g. 0:30"
								focused
								onChange={(e) => {
									handleChange(messages.length - index - 1, e);
								}}
								name="stopTimes"
								InputProps={{
									id: `stopTimeTextField_${(messages.length - index - 1)}`,
									disableUnderline: true,
								}}
							/>
						</Box>
					</Grid>
					<Grid item md={2} sm={6} xs={12}>
						<button 
						onClick={(e) => handleClickTime(index, e)}>Take Current Time</button>
					</Grid>
				</Grid>

				{/* Description row */}
				<Grid item xs={12}>
					<Grid item xs={12}>
						<Grid item>
							<Box
								sx={{
									marginTop: '1.2rem',
									color: Colors.primaryColor,
									fontSize: '1.1rem',
									fontFamily: 'Inria Sans',
									fontWeight: '700',
									marginLeft: '0.5rem',
									marginBottom: '0.5rem',
								}}
							>
								Confirmation Message:
							</Box>
						</Grid>
						<Box
							component="form"
							sx={{
								'& > :not(style)': { width: '100%' },
							}}
							autoComplete="off"
						>
							<TextField
								sx={multiLineInputStyle}
								InputProps={{
									id: `confirmationTextField_${(messages.length - index - 1)}`,
									disableUnderline: true,
								}}
								variant="standard"
								multiline
								value={input.messages}
								name="messages"
								onChange={(e) => {
									handleChange(messages.length - index - 1, e);
								}}
								rows={5}
							/>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	));

	return (
		<>
			<Box>
				<Box
					sx={{
						
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: '2rem',
						'@media screen and (min-width: 1444px)':{
							position: 'fixed',
							top: '50%',
							right: '0',
							transform: 'translateY(-50%)',
							zIndex: 1000, // Ensure it's above other content
						}
						
					}}
				>
					{videoId && (
						<YouTube
							videoId={videoId}
							opts={opts}
							onStateChange={videoTime}
							onSeek={handleSeek}
							ref={playerRef}
							sx={{ margin: 'auto' }}
						/>
					)}
				</Box>
				<Box
					sx={{
						backgroundColor: Colors.backgroundColor,
						height: 'auto',
						borderRadius: '1rem',
						boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
						margin: 'auto',
						marginTop: '2rem',
						paddingBottom: '2rem',
						width: '90%',
						'@media screen and (min-width: 1444px)':{
							display: 'flex',
							flexDirection: 'column', // Change to column layout
							justifyContent: 'flex-start', // Align items to the start (left)
							alignItems: 'flex-start', // Align items to the start (left)
							marginTop: '2rem',
							marginLeft: '2rem', // Add margin to the left
							width: '53%', // Take up half of the page width
						}
						
						
					}}
				>
					<Grid container spacing={2} sx={{ margin: 'auto', width: '97%', paddingRight: '0.5rem' }}>
						<Grid item xs={1.6}>
							<Box
								sx={{
									marginTop: '1.2rem',
									color: Colors.primaryColor,
									fontSize: '1rem',
									fontFamily: 'Inria Sans',
									fontWeight: '700',
									marginLeft: '0.5rem',
								}}
							>
								Youtube Link:
							</Box>
						</Grid>
						<Grid item md={10} sm={6} xs={12}>
							<Box
								component="form"
								sx={{
									'& > :not(style)': { width: '100%', paddingBottom: '1rem' },
								}}
								autoComplete="off"
							>
								<TextField
									sx={inputStyle}
									variant="filled"
									value={url}
									placeholder="Input Youtube Video Url"
									InputProps={{
										disableUnderline: true,
									}}
									onChange={handleUrlChange}
									// onChange={(e) => setUrl(e.target.value)}
									focused
								/>
							</Box>
						</Grid>
					</Grid>
					<Grid container spacing={2} sx={{ margin: 'auto', width: '97%', paddingRight: '0.5rem' }}>
						<Grid item xs={1.6}>
							<Box
								sx={{
									marginTop: '1.2rem',
									color: Colors.primaryColor,
									fontSize: '1rem',
									fontFamily: 'Inria Sans',
									fontWeight: '700',
									marginLeft: '0.5rem',
								}}
							>
								Tags:
							</Box>
						</Grid>

						<Grid item md={10} sm={6} xs={12}>
							<Box
								component="form"
								sx={{
									'& > :not(style)': { width: 'auto', padding: '1rem' },
								}}
								autoComplete="off"
							>
								<TagsInput
									InputProps={{
										disableUnderline: true,
									}}
									type="text"
									variant="standard"
									id="search"
									value={tags}
									separators={['Enter']}
									onChange={setTags}
									placeHolder="To add tags, input the desired word and press Enter"
								/>
							</Box>
						</Grid>
					</Grid>
					<Grid container spacing={2} sx={{ margin: 'auto', width: '97%', paddingRight: '0.5rem' }}>
						<Grid item xs={1.6}>
							<Box
								sx={{
									marginTop: '2rem',
									color: Colors.primaryColor,
									fontSize: '1rem',
									fontFamily: 'Inria Sans',
									fontWeight: '700',
									marginLeft: '0.5rem',
								}}
							>
								Operating System:
							</Box>
						</Grid>
						<Grid item md={10} sm={6} xs={12}>
							<Box
								component="form"
								sx={{
									'& > :not(style)': { width: '100%' },
								}}
								autoComplete="off"
							>
								<FormControl fullWidth sx={{ marginTop: '1rem' }}>
									<InputLabel id="demo-simple-select-label">What kind of device is this for?</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										label=" What kind of device is this for?"
										onChange={(e) => setOs(e.target.value)}
										value={operating_system}
									>
										<MenuItem disabled>Mobile Devices</MenuItem>
										<MenuItem value="iOS">iOS</MenuItem>
										<MenuItem value="Android">Android</MenuItem>
										<Divider />
										<MenuItem disabled>PC</MenuItem>
										<MenuItem value="Windows">Windows</MenuItem>
										<MenuItem value="Mac">Mac</MenuItem>
										<MenuItem value="Linux">Linux</MenuItem>
										<Divider />
										<MenuItem value="All">All</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</Grid>
					</Grid>
					<Grid container spacing={2} sx={{ margin: 'auto', width: '97%', paddingRight: '0.5rem' }}>
						<Grid item xs={1.6}>
							<Box
								sx={{
									marginTop: '2rem',
									color: Colors.primaryColor,
									fontSize: '1rem',
									fontFamily: 'Inria Sans',
									fontWeight: '700',
									marginLeft: '0.5rem',
								}}
							>
								Video Category:
							</Box>
						</Grid>
						<Grid item md={10} sm={6} xs={12}>
							<Box
								component="form"
								sx={{
									'& > :not(style)': { width: '100%' },
								}}
								autoComplete="off"
							>
								<FormControl fullWidth sx={{ marginTop: '1rem' }}>
									<InputLabel id="demo-simple-select-label">What category is this video for?</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										label=" What category is this video for?"
										onChange={(e) => setCategory(e.target.value)}
										value={category}
									>
										<MenuItem value="daily_life">Technology Use in Daily Life</MenuItem>
										<MenuItem value="safety_privacy">Technology Safety and Privacy</MenuItem>
										<MenuItem value="class_word">Technology use for Class and Word</MenuItem>
										<MenuItem value="finance">Financial Well Being and Management</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Box>

			{/* Altering this to have a checkbox that hides it -ben*/}
			<Box
				sx={{
					backgroundColor: Colors.backgroundColor,
					height: 'auto',
					borderRadius: '1rem',
					boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
					margin: 'auto',
					paddingBottom: '2rem',
					width: '90%',
					marginTop: '2rem',
					'@media screen and (min-width: 1444px)':{
						display: 'flex',
						flexDirection: 'column', // Change to column layout
						justifyContent: 'flex-start', // Align items to the start (left)
						alignItems: 'flex-start', // Align items to the start (left)
						marginTop: '2rem',
						marginLeft: '2rem', // Add margin to the left
						width: '53%', // Take up half of the page width
					}
				}}
			>
				<Grid container spacing={2} sx={{ margin: 'auto', width: '97%' }}>
					{isChapter && (
						<Grid item xs={6}>
							<FormControlLabel
								control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
								label="Use default segmentation from the video"
							/>
						</Grid>
					)}
					{!isChecked && (
						<>
							<Grid item xs={isChapter ? 6 : 12} style={{ textAlign: 'end' }}>
								<Box
									sx={{
										color: Colors.primaryColor,
										fontSize: { sm: '1rem', xs: '0.8rem' },
										textAlign: 'end',
										marginTop: '1rem',
										paddingRight: '1rem',
										cursor: 'pointer',
									}}
									onClick={onAddBtnClick}
								>
									+ Add a Segment
								</Box>
							</Grid>
							<Grid item xs={12}>
								{messageInput}
							</Grid>
						</>
					)}
				</Grid>
			</Box>

			<Box
				sx={{
					height: 'auto',
					margin: 'auto',
					paddingBottom: '2rem',
					width: '90%',
				}}
			>
				<Button variant="contained" onClick={handleSubmit} sx={{ mt: 3, mb: 2, bgcolor: Colors.primaryColor }}>
					Submit
				</Button>
			</Box>
		</>
	);
}

export default YouTubeVideo;
