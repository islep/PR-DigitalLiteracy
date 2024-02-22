import React from 'react';
import placeholderImage from '../../../assets/images/card-image-1.png';

export function SubtopicSelector({ subtopics, dataFromSubtopicSelector }) {

	const handleSubtopicSelection = (subtopicName) => {
		if (subtopicName) {
			dataFromSubtopicSelector(subtopicName);
		}
	}

	const getRandomColor = (subtopic) => {
		const seed = subtopic.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) / 1000000;
		const color = `#${Math.floor(seed * 2472384789).toString(16)}`;
		return color;
	};

	return (

		<div className="flex items-center justify-center">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-screen-xl">
				{subtopics.map((subtopic, index) => (
					<div
						className="h-72 w-auto rounded-xl cursor-pointer shadow-1 hover:shadow-12 hover:scale-105 duration-150 p-8 justify-center items-center place-items-center grid "
						onClick={() => handleSubtopicSelection(subtopic)}
						key={index}
						style={{ backgroundColor: getRandomColor(subtopic) }}
					>
						<h3 className="text-2xl font-bold py-4 bg-white p-3 text-center rounded">
							{subtopic}
						</h3>
					</div>
				))}
			</div>
		</div>
	);
}

export default SubtopicSelector;