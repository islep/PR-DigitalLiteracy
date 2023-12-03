import React, { useEffect, useState } from 'react';
import { inputStyle, multiLineInputStyle } from '../../styles';
import { Box, Grid, TextField, Icon, FormControlLabel, Checkbox } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase/firebase';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { debounce } from 'lodash';
import { updateData } from '../../../../../firebase/firebaseReadWrite';
import { useAuth } from '../../../../../firebase/AuthContext';
import { Colors } from '../../../../../constants/Colors';

function ProfessionalExperienceForm({ dataFromProfessionalExperienceInfo, dataFromFirebase }) {
	const [loading, setLoading] = useState(true);
	const { currentUser } = useAuth();
	let docRef;
	if (currentUser !== null) {
		docRef = doc(db, 'users', currentUser.uid);
	}

	const [count, setCount] = useState(0);
	const [openHelp, setOpenHelp] = useState(false);

	const date_options = {
		year: 'numeric',
		month: 'short',
	};
	const [inputList, setInputList] = useState([
		{
			position: '',
			startDate: '',
			endDate: '',
			companyName: '',
			description: '',
			currentlyEnrolled: false,
		},
	]);

	useEffect(() => {
		const fetchData = async () => {
			console.log('Fetching professional experience info from firebase');
			try {
				console.log(currentUser);
				if (currentUser !== null) {
					console.log(dataFromFirebase);
					if (dataFromFirebase) {
						console.log(dataFromFirebase.resumeData.professionalExperience);
						const { professionalExperience } = dataFromFirebase.resumeData;
						if (professionalExperience) {
							const updatedInputList = professionalExperience.map((item) => ({
								...item,
								startDate: item.startDate ? item.startDate.toDate() : null,
								endDate: item.endDate ? item.endDate.toDate() : null,
							}));
							setInputList(updatedInputList);
							console.log('updated input list: ', updatedInputList);
						}
					}
				}
			} catch (err) {
				console.error('Failed to fetch data from firebase: ', err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
		// eslint-disable-next-line
	}, [dataFromFirebase, currentUser]);

	const onAddBtnClick = () => {
		const newField = {
			position: '',
			startDate: '',
			endDate: '',
			companyName: '',
			description: '',
			currentlyEnrolled: false,
		};

		setInputList([...inputList, newField]);
	};

	const removeEducationBtnClick = (index) => {
		const data = [...inputList];
		data.splice(index, 1);
		setInputList(data);
		setCount(count + 1);
	};

	const handleFormChange = async (index, value, name) => {
		try {
			const data = [...inputList];

			if (name === 'currentlyEnrolled') {
				data[index].endDate = value ? null : data[index].endDate;
				data[index].currentlyEnrolled = value;
			} else if (name === 'startDate' || name === 'endDate') {
				if (value === null) {
					data[index][name] = null;
				} else {
					data[index][name] = value.valueOf();
				}
			} else {
				data[index][name] = value;
			}
			setInputList(data);

			// autosave
			if (currentUser) {
				debouncedSave();
			}
		} catch (err) {
			console.error('Failed to update data: ', err);
		}
	};
	const saveData = async () => {
		setLoading(true);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const existingData = docSnap.data().resumeData;
			const updatedData = {
				...existingData,
				professionalExperience: inputList.map((item) => {
					const { startDate, endDate, ...rest } = item;
					return {
						...rest,
						startDate: startDate ? Timestamp.fromMillis(startDate) : null,
						endDate: endDate ? Timestamp.fromMillis(endDate) : null,
					};
				}),
			};
			const newData = { ...existingData, professionalExperience: updatedData.professionalExperience };
			await updateDoc(docRef, { resumeData: newData });
			console.log('Updated data: ', newData);
			setLoading(false);
		}
	};
	const debouncedSave = debounce(saveData, 1000);

	const experienceFormFunction = inputList.map((input, index) => (
		<Box key={index}>
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
						Experience #{index + 1}
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
							removeEducationBtnClick(index);
						}}
					>
						- Remove Experience
					</Box>
				</Grid>
			</Grid>
			<Grid
				key={index}
				id={`experience-form-${index}`}
				container
				spacing={2}
				sx={{ margin: 'auto', width: '97%', paddingRight: '0.5rem' }}
			>
				{/* Position */}
				<Grid item md={6} sm={6} xs={12}>
					<Box
						component="form"
						sx={{
							'& > :not(style)': { width: '100%' },
						}}
						autoComplete="off"
					>
						<TextField
							sx={inputStyle}
							label="Position"
							variant="filled"
							focused
							value={input.position}
							name="position"
							onChange={(e) => {
								handleFormChange(index, e.target.value, 'position');
							}}
							InputProps={{
								disableUnderline: true,
							}}
						/>
					</Box>
				</Grid>

				{/* Start Date */}
				<Grid item md={6} sm={6} xs={12}>
					<Box
						component="form"
						sx={{
							'& > :not(style)': { width: '100%' },
						}}
						autoComplete="off"
					>
						<Grid container spacing={2}>
							<Grid item xs={3}>
								<Box
									sx={{
										marginTop: '1rem',
										color: Colors.primaryColor,
										fontSize: '1rem',
										fontFamily: 'Inria Sans',
										fontWeight: '700',
										marginLeft: '0.5rem',
									}}
								>
									Start Date
								</Box>
							</Grid>
							<Grid item xs={9}>
								<ReactDatePicker
									selected={input.startDate}
									onChange={(date) => handleFormChange(index, date, 'startDate')}
									dateFormat="MMMM-yyyy"
									showMonthYearPicker
								/>
							</Grid>
						</Grid>
					</Box>
				</Grid>

				{/* Company Name */}
				<Grid item md={6} sm={6} xs={12}>
					<Box
						component="form"
						sx={{
							'& > :not(style)': { width: '100%' },
						}}
						autoComplete="off"
					>
						<TextField
							sx={inputStyle}
							label="Company Name"
							variant="filled"
							value={input.companyName}
							name="companyName"
							onChange={(e) => {
								handleFormChange(index, e.target.value, 'companyName');
							}}
							focused
							InputProps={{
								disableUnderline: true,
							}}
						/>
					</Box>
				</Grid>

				{/* End Date */}
				<Grid item md={6} sm={6} xs={12}>
					<Box
						component="form"
						sx={{
							'& > :not(style)': { width: '100%' },
						}}
						autoComplete="off"
					>
						<Grid container spacing={2}>
							<Grid item xs={3}>
								<Box
									sx={{
										marginTop: '1rem',
										color: Colors.primaryColor,
										fontSize: '1rem',
										fontFamily: 'Inria Sans',
										fontWeight: '700',
										marginLeft: '0.5rem',
									}}
								>
									End Date
								</Box>
							</Grid>
							<Grid item xs={9}>
								{input.currentlyEnrolled ? (
									<div style={{ height: '54px' }} /> // Adjust the height as needed
								) : (
									<ReactDatePicker
										selected={input.endDate}
										onChange={(date) => handleFormChange(index, date, 'endDate')}
										dateFormat="MMMM-yyyy"
										showMonthYearPicker
									/>
								)}
							</Grid>
						</Grid>
					</Box>
				</Grid>

				{/* Checkbox */}
				<Grid item md={6} sm={6} xs={12} />
				<Grid item md={6} sm={6} xs={12}>
					<Box
						component="form"
						sx={{
							'& > :not(style)': { width: '100%' },
						}}
						autoComplete="off"
					>
						<FormControlLabel
							sx={inputStyle}
							control={
								<Checkbox
									sx={inputStyle}
									name="currentlyEnrolled"
									checked={
										input.currentlyEnrolled !== null && input.currentlyEnrolled !== undefined
											? input.currentlyEnrolled
											: false
									}
									onChange={(e) => {
										handleFormChange(index, e.target.checked, 'currentlyEnrolled');
									}}
								/>
							}
							label="I am currently working here"
						/>
					</Box>
				</Grid>

				{/* Description row */}
				<Grid item xs={12}>
					<Grid item xs={12}>
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
									disableUnderline: true,
								}}
								label="Description"
								variant="standard"
								multiline
								value={input.description}
								name="description"
								onChange={(e) => {
									handleFormChange(index, e.target.value, 'description');
								}}
								rows={4}
							/>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	));

	const showHelpModal = () => {
		const handleClose = () => {
			setOpenHelp(false);
		};

		const sendHelpToDatabase = () => {
			setOpenHelp(false);
			// send Help to Firebase

			updateData(docRef, {
				ProfessionalExperienceFormHelp: true,
				lastHelpRequestDate: Timestamp.fromDate(new Date()),
			});
		};
		return (
			<Dialog
				open={openHelp}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Call for Help?</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						We are sorry you are having trouble in filling the form. Would you like Project Rebound Staff to assist you?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>No, Thank You</Button>
					<Button onClick={sendHelpToDatabase} autoFocus>
						Yes, Please
					</Button>
				</DialogActions>
			</Dialog>
		);
	};

	return (
		<Box
			sx={{
				backgroundColor: Colors.backgroundColor,
				height: 'auto',
				borderRadius: '1rem',
				boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
				margin: 'auto',
				paddingBottom: '2rem',
				width: '98%',
			}}
		>
			<Grid container spacing={2} sx={{ margin: 'auto', width: '97%' }}>
				<Grid item md={8} xs={8}>
					<Box
						sx={{
							fontWeight: '700',
							fontSize: { md: '1.3rem', sm: '1rem', xs: '1.2rem' },
							color: Colors.primaryColor,
						}}
					>
						Recent Professional Experience
					</Box>
					<Box
						sx={{
							fontSize: {
								md: '1rem',
								sm: '0.8rem',
								xs: '0.8rem',
								fontFamily: 'Inria Sans',
								color: Colors.primaryColor,
							},
						}}
					>
						Add your most recent experience and continue in descending order
					</Box>
				</Grid>

				<Grid item md={4} xs={4}>
					<Box
						sx={{
							float: 'right',
							display: 'flex',
							bgcolor: { md: Colors.white, sm: Colors.white, xs: 'None' },
							paddingRight: { md: '1.2rem', sm: '1rem', xs: '0.5rem' },
							paddingLeft: { md: '1.2rem', sm: '1rem', xs: '0.5rem' },
							marginRight: '0.5rem',
							cursor: 'pointer',
						}}
						onClick={() => {
							setOpenHelp(true);
						}}
					>
						<Box
							sx={{
								display: { md: 'flex', sm: 'flex', xs: 'None' },
								borderRadius: '0.1rem',
								fontSize: { md: '1rem', sm: '0.7rem', xs: '0.7rem' },
								color: Colors.primaryColor,
								fontWeight: '700',
							}}
						>
							<p>Need Help</p>
						</Box>
						<Box
							sx={{
								color: Colors.primaryColor,
								marginTop: { md: '0.85rem', sm: '0.5rem', xs: '0 ' },
								marginLeft: '0.5rem',
							}}
						>
							<Icon>help_circle</Icon>
						</Box>
					</Box>
				</Grid>
			</Grid>

			{experienceFormFunction}
			<Grid container spacing={2} sx={{ margin: 'auto', width: '97%' }}>
				<Grid item md={6} xs={3} />
				<Grid item md={6} xs={9}>
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
						+ Add Another Experience
					</Box>
				</Grid>
			</Grid>
			{openHelp ? showHelpModal() : <div />}
		</Box>
	);
}

export default ProfessionalExperienceForm;
