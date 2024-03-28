import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, usePDF, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Button, Box, Grid } from '@mui/material';
import moment from 'moment';
import { Colors } from '../constants/Colors';
import { useAuth } from '../firebase/AuthContext';

const styles = StyleSheet.create({
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
	},
	name: {
		textAlign: 'center',
		fontSize: '25',
		fontFamily: 'Helvetica',
	},
	desc: {
		textAlign: 'center',
		fontSize: '11',
		paddingTop: 4,
		fontFamily: 'Helvetica',
	},
	heading: {
		fontSize: '18',
		marginTop: '10',
		fontFamily: 'Helvetica',
	},
	summary: {
		textAlign: 'left',
		fontSize: '11',
		paddingTop: 4,
		fontFamily: 'Helvetica',
	},
	line: {
		marginTop: 3,
		height: 1,
		backgroundColor: '#808080',
	},
	viewContainer: {
		marginBottom: '10',
	},
	educationContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	title: {
		fontSize: '11',
		marginTop: 4,
		fontFamily: 'Helvetica-Bold',
	},
	rightInfo: {
		marginLeft: 'auto',
		fontSize: '11',
		marginTop: '-10',
		fontFamily: 'Helvetica-Bold',
	},

	subTitle: {
		fontSize: '10',
		marginTop: 10,
		fontFamily: 'Helvetica',
	},
	lowerRightInfo: {
		marginLeft: 'auto',
		fontSize: '10',
		marginTop: '-10',
		fontFamily: 'Helvetica',
	},
	description: {
		fontSize: '10',
		marginTop: '5',
		lineHeight: '1.5',
		fontFamily: 'Helvetica',
	},
	position: {
		fontSize: '10',
		marginTop: 1,
		fontFamily: 'Helvetica',
	},
	referenceManager: {
		fontSize: '10',
		marginTop: 1,
		fontFamily: 'Helvetica-Bold',
	},
	skill: {
		fontSize: '10',
		fontFamily: 'Helvetica',
		marginLeft: '3',
		marginTop: '5',
	},
});
const formatDate = (dateObj) => {
	if (dateObj) {
		// Convert seconds to milliseconds by multiplying by 1000
		// Add nanoseconds converted to milliseconds
		// This results in a Unix timestamp in milliseconds
		const timestamp = dateObj.seconds * 1000 + dateObj.nanoseconds / 1000;

		// Create a new JavaScript Date object from the timestamp
		const date = new Date(timestamp);

		// Pass the JavaScript Date object to moment.js for formatting
		const momentDate = moment(date);
		return momentDate.format('MMMM YYYY');
	}
	return 'Present';
};

function MyDoc(data) {
	const { currentUser } = useAuth();
	const navigate = useNavigate();
	const [resumeData, setResumeData] = useState(data);
	let count = 0;

	useEffect(() => {
		console.log(resumeData);
	}, [resumeData]);

	useEffect(() => {
		if (!currentUser) {
			navigate('/login');
		} else {
			console.log('resume doc area ', data);
			setResumeData(data);
		}
	}, [currentUser, data, navigate]);

	if (!resumeData) {
		return (
			<Document>
				<Page />
			</Document>
		);
	}

	const {
		personal_info = {}, // Add fallback empty object
		education_info = [],
		professionalExperience = [],
		objective = '',
		skills_info = [],
		references = [],
	} = resumeData;

	return (
		<Document>
			{resumeData !== undefined ? (
				<Page size="A4">
					<View style={styles.section}>
						<Text style={styles.name}>
							{resumeData.personal_info !== undefined && resumeData.personal_info !== null ? (
								`${personal_info.firstName} ${personal_info.lastName}`
							) : (
								<Text />
							)}
						</Text>
						<Text style={styles.desc}>
							{resumeData.personal_info !== undefined && resumeData.personal_info !== null ? (
								`${resumeData.personal_info.address}, ${resumeData.personal_info.city}, ${resumeData.personal_info.state}, ${resumeData.personal_info.zipCode} | ${resumeData.personal_info.email} | ${resumeData.personal_info.phone}`
							) : (
								<Text />
							)}
						</Text>

						{resumeData.objective !== null &&
						resumeData.objective !== undefined &&
						resumeData.objective.objective !== '' ? (
							<View>
								<Text style={styles.heading}>Objective</Text>
								<Text style={styles.line} />
								<Text style={styles.summary}>{resumeData.objective}</Text>
							</View>
						) : (
							<Text />
						)}

						<Text style={styles.heading}>Education</Text>
						<Text style={styles.line} />
						{resumeData.education_info !== undefined && resumeData.education_info !== null ? (
							resumeData.education_info.map((e, index) => (
								<View style={styles.viewContainer} key={index}>
									<View styles={styles.educationContainer}>
										<Text style={styles.title}>{e.schoolName}</Text>
										<Text style={styles.rightInfo}>{e.schoolLocation}</Text>
									</View>

									<View styles={styles.educationContainer}>
										<Text style={styles.subTitle}>{`${e.degree}, ${e.fieldOfStudy}`}</Text>
										<Text style={styles.lowerRightInfo}>{`${formatDate(e.startDate)} - ${formatDate(e.endDate)}`}</Text>
									</View>
								</View>
							))
						) : (
							<Text />
						)}

						{/* experience */}
						<Text style={styles.heading}>Experience</Text>
						<Text style={styles.line} />
						{resumeData.professionalExperience !== undefined && resumeData.professionalExperience !== null ? (
							resumeData.professionalExperience.map((e, index) => (
								<View style={styles.viewContainer} key={index}>
									<View styles={styles.educationContainer}>
										<Text style={styles.title}>{e.companyName}</Text>
										<Text style={styles.rightInfo}>{e.location}</Text>
									</View>

									<View styles={styles.educationContainer}>
										<Text style={styles.subTitle}>{e.position}</Text>
										<Text style={styles.lowerRightInfo}>{`${formatDate(e.startDate)} - ${formatDate(e.endDate)}`}</Text>
									</View>

									<Text style={styles.description}>{e.description}</Text>
								</View>
							))
						) : (
							<Text />
						)}

						{/* Skills */}

						<Text style={styles.heading}>Skills</Text>
						<Text style={styles.line} />

						{resumeData.skills_info?.technicalSkills?.length > 0 ? (
							<View style={{ display: 'flex', flexDirection: 'row' }}>
								<Text style={styles.title}>Technical Skills: </Text>
								{resumeData.skills_info.technicalSkills.map((e, index) => {
									if (index !== resumeData.skills_info.technicalSkills.length - 1) {
										return (
											<Text key={index} style={styles.skill}>
												{`${e},`}
											</Text>
										);
									}
									return (
										<Text key={index} style={styles.skill}>
											{e}
										</Text>
									);
								})}
							</View>
						) : (
							<Text />
						)}

						{resumeData.skills_info?.personalSkills?.length > 0 ? (
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									marginTop: '5',
								}}
							>
								<Text style={styles.title}>Personal Skills: </Text>
								{resumeData.skills_info.personalSkills.map((e, index) => {
									if (index !== resumeData.skills_info.personalSkills.length - 1) {
										return (
											<Text key={index} style={styles.skill}>
												{`${e},`}
											</Text>
										);
									}
									return (
										<Text key={index} style={styles.skill}>
											{e}
										</Text>
									);
								})}
							</View>
						) : (
							<Text />
						)}

						{resumeData.skills_info?.otherSkills?.length > 0 ? (
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									marginTop: '5',
								}}
							>
								<Text style={styles.title}>Other Skills: </Text>
								{resumeData.skills_info.otherSkills.map((e, index) => {
									if (index !== resumeData.skills_info.otherSkills.length - 1) {
										return (
											<Text key={index} style={styles.skill}>
												{`${e},`}
											</Text>
										);
									}
									return (
										<Text key={index} style={styles.skill}>
											{e}
										</Text>
									);
								})}
							</View>
						) : (
							<Text />
						)}

						{resumeData.references !== null &&
						resumeData.references !== undefined &&
						resumeData.references.length > 0 ? (
							<View style={{ marginTop: '13' }}>
								{resumeData.references.map((e, index) => {
									let flag = true;
									if (
										e.position === '' &&
										e.date === '' &&
										e.managerName === '' &&
										e.companyName === '' &&
										e.description === ''
									) {
										flag = false;
									}

									if (flag) {
										count += 1;

										if (count === 1) {
											return (
												<View>
													<Text style={styles.heading}>References</Text>
													<Text style={styles.line} />
													<View style={styles.viewContainer} key={index}>
														<View styles={styles.educationContainer}>
															<Text style={styles.title}>{e.companyName}</Text>
														</View>

														<View styles={styles.educationContainer}>
															<Text style={styles.referenceManager}>{`${e.managerName}, ${e.position}`}</Text>
															<Text style={styles.description}>{e.description}</Text>
														</View>
													</View>
												</View>
											);
										}
										// count is >1 and flag = true

										return (
											<View>
												<View style={styles.viewContainer} key={index}>
													<View styles={styles.educationContainer}>
														<Text style={styles.title}>{e.companyName}</Text>
														<Text style={styles.rightInfo}>{e.date}</Text>
													</View>

													<View styles={styles.educationContainer}>
														<Text style={styles.referenceManager}>{`${e.managerName}, ${e.position}`}</Text>
														<Text style={styles.description}>{e.description}</Text>
													</View>
												</View>
											</View>
										);
									}
									return <View />;
								})}
							</View>
						) : (
							<Text />
						)}
					</View>
				</Page>
			) : (
				<Page />
			)}
		</Document>
	);
}

function PDFPage({ resumeData }) {
	const [instance, updateInstance] = usePDF({ document: MyDoc(resumeData) });

	useEffect(() => {
		console.log('in pdf page ', resumeData);
		updateInstance(MyDoc);
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<Box
				sx={{
					margin: 'auto',
					width: { md: '30%', sm: '30%', xs: '50%' },
					mt: 10,
					bgcolor: Colors.white,
					borderRadius: '0.5rem',
					boxShadow: 24,
					p: 4,
				}}
			>
				<Grid container spacing={2}>
					<Grid item md={6} xs={12}>
						<Button
							sx={{
								backgroundColor: Colors.primaryColor,
								margin: 'auto',
								width: '90%',
								'&:hover': { backgroundColor: Colors.primaryColor },
							}}
						>
							<a href={instance.url} download="resume.pdf" style={{ textDecoration: 'None', color: Colors.white }}>
								Download Resume
							</a>
						</Button>
					</Grid>
					<Grid item md={6} xs={12}>
						<Button
							sx={{
								margin: 'auto',
								width: '90%',
								backgroundColor: Colors.primaryColor,
								'&:hover': { backgroundColor: Colors.primaryColor },
							}}
						>
							<a
								href={instance.url}
								target="_blank"
								rel="noreferrer"
								style={{ textDecoration: 'None', color: Colors.white }}
							>
								View Resume
							</a>
						</Button>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default PDFPage;
