import React from 'react';

export function SubtopicSelector({ subtopics, dataFromSubtopicSelector }) {

	const handleSubtopicChange = (subtopicName) => {
		if (subtopicName) {
			console.log('subtopicName:', subtopicName);
			dataFromSubtopicSelector(subtopicName);
		}
	}

	return (
		<div className="flex flex-col items-center">
			{subtopics.map((subtopic, index) => (
				<div
					className="m-2 p-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 transition-all duration-150"
					style={{}}
					key={index}
					onClick={() => handleSubtopicChange(subtopic)}
				>
					{subtopic}
				</div>
			))}
		</div>
	);
}

export default SubtopicSelector;