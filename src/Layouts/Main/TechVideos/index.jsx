
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Breadcrumb } from '../../../components/Video/Breadcrumb';
import FilterPanel from '../../../components/FilterPanel';
import Searchbar from '../../../components/Video/Searchbar';
import SubtopicSelection from '../../../components/Video/SubtopicSelection';
import YouTubeVideoSection from '../../../components/Video/YouTubeVideoSection';
import FirebaseRetrieveVideos from '../../../components/Video/FirebaseRetrieveVideos';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import Intro from '../../../components/Video/Intro';
import PropTypes from 'prop-types';
import { filter } from 'lodash';

function TechVideos({ subtoptics, pageValue, introText }) {

	// video database values
	const [osvalue, setosValue] = useState([]);
	const [dataFromFirebase, setDatafromFirebase] = useState([]);
	const docRef = collection(db, 'youtube-videos');

	// video search constants
	const [subtopicValue, setsubtopicValue] = useState([]);
	const [tags, tagsFromSearchBar] = useState([]);

	// side filter options unsorted tuple (label, database_value) array
	const [filterGroups] = useState(() => [
		{
			subheading: 'Device Type',
			filters: [
				['Mobile - iOS', 'iOS'],
				['Mobile - Android', 'Android'],
				['Desktop - Windows', 'Windows'],
				['Desktop - Mac', 'Mac'],
				['Desktop - Linux', 'Linux'],
			],
		},
		{
			subheading: 'Content Type',
			filters: [
				['Daily Life', 'daily_life'],
				['Finance', 'finance'],
				['Safety Privacy', 'safety_privacy'],
				['Class & Work', 'class_word'],
			],
		},
	]);

	// database_value from filter. Currently intialized to all values. Can be replaced to store the users state or to 
	// content type is filtered out depending on page selected
	const [appliedFilterTags, setTagsFromFilter] = useState(
		filterGroups.flatMap(({ subheading, filters }) =>
			subheading === 'Content Type'
				? filters.filter(([, value]) => value === pageValue).map(([, value]) => value)
				: filters.map(([, value]) => value)
		)
	);

	useEffect(() => {
		console.log('useEffect 1');
		const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
			const videos = querySnapshot.docs.map((doc) => doc.data());
			setDatafromFirebase(Object.values(videos));
		});

		return unsubscribe;
		// eslint-disable-next-line
	}, []);

	const dataFromIntro = (osvalue) => {
		setosValue(osvalue);
	};

	const dataFromSubtopicSelector = (subtopicValue) => {
		setsubtopicValue(subtopicValue);
	};

	const handleResetSubtopic = () => {
		setsubtopicValue([]);
	};

	const onSave = (selectedFilterTags) => {
		setTagsFromFilter(selectedFilterTags);
	};

	return (
		<div>
			<FilterPanel
				filterGroups={filterGroups}
				onSave={(onSave)}
				appliedFilterTags={(appliedFilterTags)}
			/>

			<div className="md:pl-80">
				<FirebaseRetrieveVideos
					dataFromIntro={dataFromIntro}
					dataFromFirebase={dataFromFirebase}
				/>

				<Intro
					introText={introText}
				/>

				<Box style={{ margin: 'auto', width: '70%', paddingBottom: '2rem' }}>
					<Searchbar tagsFromSearchBar={tagsFromSearchBar} tags={tags} />
					<Breadcrumb subtopicValue={subtopicValue} handleResetSubtopic={handleResetSubtopic} subtopics={subtoptics} />
				</Box>

				{subtoptics.length == 0 || subtopicValue.length > 0 || tags.length > 0 ? (
					<YouTubeVideoSection
						osvalue={osvalue}
						subtopicValue={subtopicValue}
						tags={tags}
						appliedFilterTags={appliedFilterTags}
					/>
				) : (
					<SubtopicSelection
						dataFromSubtopicSelector={dataFromSubtopicSelector}
						subtopics={subtoptics} />
				)}
			</div>
		</div >
	);
}

TechVideos.propTypes = {
	subtoptics: PropTypes.array.isRequired,
	pageValue: PropTypes.string.isRequired,
	introText: PropTypes.string.isRequired,
};

export default TechVideos;

