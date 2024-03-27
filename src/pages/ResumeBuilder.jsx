import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { Timestamp, doc, onSnapshot, setDoc, arrayUnion } from 'firebase/firestore';
import { debounce } from 'lodash';
import KeySkills from '../Layouts/Main/ResumeBuilder/KeySkills';
import NavigationButtons from '../Layouts/Main/ResumeBuilder/NavigationButtons';
import PersonalDetailsForm from '../Layouts/Main/ResumeBuilder/PersonalDetailsForm';
import ResumeBuilderIntro from '../Layouts/Main/ResumeBuilder/ResumeBuilderIntro';
import { useAuth } from '../firebase/AuthContext';
import EducationBlock from '../Layouts/Main/ResumeBuilder/Education/EducationBlock';
import ProfessionalExperienceBlock from '../Layouts/Main/ResumeBuilder/ProfessionalExperience/ProfessionalExperienceBlock';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import ObjectiveForm from '../Layouts/Main/ResumeBuilder/ObjectiveForm';

import { updateData } from '../firebase/firebaseReadWrite';
import { db } from '../firebase/firebase';
import References from '../Layouts/Main/ResumeBuilder/References';
import { useAutoSave } from '../components/useAutoSave';

function ResumeBuilder() {
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	let docRef;
	if (currentUser !== null) {
		docRef = doc(db, 'users', currentUser.uid);
	}

	const [personal_info, setPersonalInfo] = useState();
	const [educationInfo, setEducationInfo] = useState();
	const [professionalExperienceInfo, setProfessionalExperienceInfo] = useState();
	const [skillsInfo, setSkillsInfo] = useState();
	const [objective, setObjective] = useState();
	const [referencesInfo, setReferencesInfo] = useState();

	const [dataFromFirebase, setDatafromFirebase] = useState();

	const resumeData = {
		date: Timestamp.fromDate(new Date()),
		personal_info,
		educationInfo,
		professionalExperienceInfo,
		skillsInfo,
		objective,
		referencesInfo,
	};

	useEffect(() => {
		if (currentUser) {
			navigate('/resumeBuilder');

			const unsubscribe = onSnapshot(docRef, (doc) => {
				const newList = doc.data();
				console.log('firebase data is ', newList);
				setDatafromFirebase(newList);
			});

			return () => {
				unsubscribe();
			};
		}
		navigate({
			pathname: '/login',
			search: createSearchParams({ fromPath: '/resumeBuilder' }).toString(),
		});

		// eslint-disable-next-line
	}, [currentUser, navigate]);

	const dataFromPersonalInfo = (personalInfo) => {
		setPersonalInfo(personalInfo);
	};
	const dataFromEducationInfo = (educationInfo) => {
		setEducationInfo(educationInfo);
	};

	const dataFromObjective = (objectiveInfo) => {
		setObjective(objectiveInfo);
	};

	const dataFromProfessionalExperienceInfo = (professionalExperienceInfo) => {
		setProfessionalExperienceInfo(professionalExperienceInfo);
	};

	const dataFromReferencesInfo = (referencesInfo) => {
		setReferencesInfo(referencesInfo);
	};

	const dataFromSkillsInfo = (skillsInfo) => {
		setSkillsInfo(skillsInfo);
	};

	return (
		<div>
			<div>
				<ResumeBuilderIntro />
				<div style={{ padding: '1rem', marginTop: '3rem' }}>
					<ObjectiveForm dataFromObjective={dataFromObjective} dataFromFirebase={dataFromFirebase} />
				</div>

				<div style={{ padding: '1rem', marginTop: '0.5rem' }}>
					<PersonalDetailsForm dataFromPersonalInfo={dataFromPersonalInfo} dataFromFirebase={dataFromFirebase} />
				</div>
				<div style={{ padding: '1rem', marginTop: '0.5rem' }}>
					<EducationBlock dataFromEducationInfoFromProps={dataFromEducationInfo} dataFromFirebase={dataFromFirebase} />
				</div>

				<div>
					<ProfessionalExperienceBlock
						dataFromProfessionalExperienceInfoProps={dataFromProfessionalExperienceInfo}
						dataFromFirebase={dataFromFirebase}
					/>
				</div>
				<div style={{ padding: '1rem', marginTop: '0.5rem' }}>
					<KeySkills dataFromSkillsInfo={dataFromSkillsInfo} dataFromFirebase={dataFromFirebase} />
				</div>

				<div style={{ padding: '1rem', marginTop: '0.5rem' }}>
					<References dataFromReferencesInfoProps={dataFromReferencesInfo} dataFromFirebase={dataFromFirebase} />
				</div>

				<div style={{ padding: '1rem', marginTop: '0.5rem' }}>
					<NavigationButtons resumeData={resumeData} dataFromFirebase={dataFromFirebase} />
				</div>
			</div>
		</div>
	);
}

export default ResumeBuilder;
