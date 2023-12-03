import React, { useState } from 'react';
import { Box, Grid, Button, Modal } from '@mui/material';
import { doc } from 'firebase/firestore';
import { formBackground } from '../styles';
import { Colors } from '../../../../constants/Colors';
import { useAuth } from '../../../../firebase/AuthContext';
import { db } from '../../../../firebase/firebase';

import PDFPage from '../../../../pages/PDFPage';

function NavigationButtons({ resumeData, dataFromFirebase }) {
	const { currentUser } = useAuth();
	const [preparedData, setPreparedData] = useState({}); // New state to hold prepared data

	let docRef;
	if (currentUser !== null) {
		docRef = doc(db, 'users', currentUser.uid);
	}

	const [isResumeBtnClicked, setResumeBtnClicked] = useState(false);
	const generatePdf = () => {
		prepareData();
		setResumeBtnClicked(true);
	};

	// Function to prepare data before generating the PDF
	const prepareData = () => {
		const adjustedData = resumeData.educationInfo?.resumeData ?? {};
		console.log('Before preparing data: ', resumeData);
		const updatedData = JSON.parse(JSON.stringify(adjustedData));

		// Similar to the logic you had in saveData
		if (updatedData.education_info === undefined) {
			updatedData.education_info = dataFromFirebase.education_info ?? null;
		}
		if (updatedData.professional_experience_info === undefined) {
			updatedData.professional_experience_info = dataFromFirebase.professional_experience_info ?? null;
		}
		if (JSON.stringify(updatedData.personal_info) === '{}') {
			updatedData.personal_info = dataFromFirebase.personal_info;
		}
		if (updatedData.objective === undefined) {
			updatedData.objective = dataFromFirebase.objective ?? null;
		}
		if (updatedData.references_info === undefined) {
			updatedData.references_info = dataFromFirebase.references_info ?? [];
		}
		console.log('Prepared data:', updatedData);
		setPreparedData(updatedData); // Set the prepared data
	};

	// const saveData = () => {
	//   if (resumeData.education_info === undefined) {
	//     if (dataFromFirebase.education_info !== undefined) {
	//       resumeData.education_info = dataFromFirebase.education_info;
	//     } else {
	//       resumeData.education_info = null;
	//     }
	//   }
	//   if (resumeData.professional_experience_info === undefined) {
	//     if (dataFromFirebase.professional_experience_info !== undefined) {
	//       resumeData.professional_experience_info =
	//         dataFromFirebase.professional_experience_info;
	//     } else {
	//       resumeData.professional_experience_info = null;
	//     }
	//   }

	//   if (JSON.stringify(resumeData.personal_info) === "{}") {
	//     if (dataFromFirebase.personal_info !== undefined) {
	//       resumeData.personal_info = dataFromFirebase.personal_info;
	//     }
	//   }

	//   if (resumeData.objective === undefined) {
	//     if (
	//       dataFromFirebase.objective !== undefined &&
	//       dataFromFirebase.objective !== null
	//     ) {
	//       resumeData.objective = dataFromFirebase.objective;
	//     } else {
	//       resumeData.objective = null;
	//     }
	//   }

	//   if (resumeData.references_info === undefined) {
	//     if (dataFromFirebase.references_info !== undefined) {
	//       resumeData.references_info = dataFromFirebase.references_info;
	//     } else {
	//       resumeData.references_info = [];
	//     }
	//   }

	//   console.log("data to send: ", resumeData);
	//   updateData(docRef, resumeData);
	// };

	// const saveProgressBtnOnClick = async () => {
	//   saveData();
	//   let data = {
	//     saved_time: Timestamp.fromDate(new Date()),
	//     saved_data: resumeData
	//   };

	//   console.log(data);

	//   // await docRef.update({
	//   //   saved_progress_logging: FirebaseApp.fir    FieldValue.arrayUnion(data)
	//   // });

	//   // await updateDoc(docRef, {
	//   //   saved_progress_logging: arrayUnion(data)
	//   // });

	//   await setDoc(
	//     docRef,
	//     {
	//       saved_progress_logging: arrayUnion(data)
	//     },
	//     { merge: true }
	//   )
	//     .then(console.log("Document added"))
	//     .catch((e) => {
	//       console.log("error is ", e);
	//     });
	// };

	const openResumeDownloadModel = () => {
		const handleClose = () => setResumeBtnClicked(false);
		console.log('Data sent to PDFPage:', preparedData);
		return (
			<Modal
				open={isResumeBtnClicked}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				closeAfterTransition
			>
				<PDFPage resumeData={preparedData} />
			</Modal>
		);
	};

	return (
		<Box sx={formBackground}>
			<Grid container spacing={2}>
				<Grid item sm={6} xs={12}>
					<Box />
				</Grid>
				<Grid item sm={6} xs={12}>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Box>
							<Button
								variant="contained"
								sx={{
									backgroundColor: Colors.primaryColor,
									fontSize: { md: '1rem', sm: '0.7rem', xs: '0.5rem' },
									'&:hover': { backgroundColor: Colors.primaryColor },
								}}
								// onClick={saveProgressBtnOnClick}
							>
								Save Progress
							</Button>
						</Box>
						<Box>
							<Button
								variant="contained"
								sx={{
									backgroundColor: Colors.primaryColor,
									fontSize: { md: '1rem', sm: '0.7rem', xs: '0.5rem' },
									marginLeft: '1rem',
									'&:hover': { backgroundColor: Colors.primaryColor },
								}}
								onClick={generatePdf}
							>
								Generate PDF
							</Button>
						</Box>
					</Box>
				</Grid>
			</Grid>
			<div>{openResumeDownloadModel()}</div>
		</Box>
	);
}

export default NavigationButtons;
