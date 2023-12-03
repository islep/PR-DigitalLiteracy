import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Icon } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import debounce from 'lodash.debounce';
import { db } from '../../../../../firebase/firebase';
import { updateData } from '../../../../../firebase/firebaseReadWrite';
import { useAuth } from '../../../../../firebase/AuthContext';
import { Colors } from '../../../../../constants/Colors';
import { inputStyle, multiLineInputStyle } from '../../styles';

function ReferencesForm({ dataFromFirebase, datafromReferencesInfo }) {
	const { currentUser } = useAuth();
	let docRef;
	if (currentUser !== null) {
		docRef = doc(db, 'users', currentUser.uid);
	}

	const [openHelp, setOpenHelp] = useState(false);
	const [count, setCount] = useState(0);
	const [inputList, setInputList] = useState([
		{
			position: '',
			managerName: '',
			// date: "",
			companyName: '',
			description: '',
		},
	]);

	const date_options = {
		year: 'numeric',
		month: 'short',
	};

	useEffect(() => {
		const fetchData = async () => {
			console.log('Fetching data from Firebase...');
			try {
				console.log('Current user:', currentUser);
				if (currentUser !== null) {
					console.log(dataFromFirebase);
					if (dataFromFirebase) {
						console.log('Data from Firebase:', dataFromFirebase);
						const referenceFromFirebase = dataFromFirebase.references;
						if (referenceFromFirebase) {
							console.log('Data from Firebase:', referenceFromFirebase);
							const updatedInputList = referenceFromFirebase.map((item) => ({
								...item,
							}));
							setInputList(updatedInputList);
							console.log('Updated state:', updatedInputList);
						}
					}
				}
			} catch (err) {
				console.error('Failed to fetch data from Firebase:', err);
			} finally {
				console.log('Finished fetching data from Firebase.');
			}
		};

		fetchData();
	}, [dataFromFirebase, currentUser]);

	const onAddBtnClick = () => {
		const newField = {
			position: '',
			// date: "",
			managerName: '',
			companyName: '',
			description: '',
		};

		setInputList([...inputList, newField]);
	};

	const removeEducationBtnClick = (index) => {
		const data = [...inputList];
		data.splice(index, 1);
		setInputList(data);
		setCount(count + 1);
	};
	const saveToFirestore = debounce(async (data) => {
		if (currentUser) {
			const docRef = doc(db, 'users', currentUser.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const existingData = docSnap.data().resumeData;
				const updatedData = {
					...existingData,
					references: data.map((item) => {
						const { companyName, position, managerName, description } = item;
						return { position, managerName, companyName, description };
					}),
				};
				await updateDoc(docRef, { resumeData: updatedData });
				console.log('Data saved to Firebase', updatedData);
			}
		}
	}, 1000);

	// delay in milliseconds

	const handleFormChange = async (index, value, name) => {
		try {
			const data = [...inputList];
			data[index][name] = value; // updating the specific field
			setInputList(data);

			// autosave
			saveToFirestore(data);
		} catch (err) {
			console.error('Failed to save data to Firebase', err);
		}
	};

	const showHelpModal = () => {
		const handleClose = () => {
			setOpenHelp(false);
		};

		const sendHelpToDatabase = () => {
			setOpenHelp(false);
			// send Help to Firebase

			updateData(docRef, {
				referencesHelp: true,
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

	const referenceFormFunction = inputList.map((input, index) => (
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
						Reference #{index + 1}
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
						- Remove Reference
					</Box>
				</Grid>
			</Grid>

			<Grid
				key={index}
				id={`reference-form-${index}`}
				container
				spacing={2}
				sx={{ margin: 'auto', width: '97%', paddingRight: '0.5rem' }}
			>
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
							focused
							value={input.companyName}
							name="companyName"
							onChange={(e) => {
								handleFormChange(index, e.target.value, 'companyName');
							}}
							InputProps={{
								disableUnderline: true,
							}}
						/>
					</Box>
				</Grid>
				{/* Manager Name */}
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
							label="Manager Name"
							variant="filled"
							focused
							value={input.managerName}
							name="managerName"
							onChange={(e) => {
								handleFormChange(index, e.target.value, 'managerName');
							}}
							InputProps={{
								disableUnderline: true,
							}}
						/>
					</Box>
				</Grid>

				{/* Position  */}
				<Grid item md={12} sm={12} xs={12} style={{ width: '100%' }}>
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
				{/* Date */}
				{/* <Grid item md={6} sm={6} xs={12}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" }
              }}
              autoComplete="off"
            >
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Box
                    sx={{
                      marginTop: "1rem",
                      color: Colors.primaryColor,
                      fontSize: "1rem",
                      fontFamily: "Inria Sans",
                      fontWeight: "700",
                      marginLeft: "0.5rem"
                    }}
                  >
                    Date
                  </Box>
                </Grid>
                <Grid item xs={9}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={inputStyle}
                      views={["year", "month"]}
                      onChange={(date) => {
                        setDate(date);
                        input.date = new Date(date).toLocaleDateString(
                          undefined,
                          date_options
                        );
                        setCount(count + 1);
                      }}
                      format="MMM-YYYY"
                      startDate={date}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Box>
          </Grid> */}

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

	return (
		<div>
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
							References
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
							Add references from previous employers if you would like. Please feel free to skip this section.
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
				{referenceFormFunction}
				<Grid container spacing={2} sx={{ margin: 'auto', width: '97%' }}>
					<Grid item md={6} xs={3}>
						<Grid item md={6} sm={6} xs={12}>
							{/* <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "100%" }
                }}
                autoComplete="off"
              >
                <FormControlLabel
                  sx={inputStyle}
                  control={
                    <Checkbox
                      sx={inputStyle}
                      name="skipReference"
                      checked={skipReference}
                      onChange={(e) => {
                        setSkipReference(!skipReference);
                      }}
                    />
                  }
                  label="Skip References"
                />
              </Box> */}
						</Grid>
					</Grid>
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
							+ Add Another Reference
						</Box>
					</Grid>
				</Grid>
				{openHelp ? showHelpModal() : <div />}
			</Box>
		</div>
	);
}

export default ReferencesForm;
