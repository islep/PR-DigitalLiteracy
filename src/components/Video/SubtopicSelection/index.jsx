import React from 'react';
import placeholderImage from '../../../assets/images/card-image-1.png';

export function SubtopicSelector({ subtopics, dataFromSubtopicSelector }) {

	const handleSubtopicSelection = (subtopicName) => {
		if (subtopicName) {
			dataFromSubtopicSelector(subtopicName);
		}
	}

	if (!subtopics) {
		return null;
	}

	return (

		<div className="w-full flex items-center justify-center pb-36">
			<div className="flex flex-wrap justify-center items-stretch gap-4 md:gap-16 max-w-screen-xl">
				{subtopics.map((subtopic, index) => (
					<div
						className="w-full md:w-[calc(33.3333%-3rem)] bg-white rounded-xl cursor-pointer shadow-1 hover:shadow-12 hover:scale-105 transition-all duration-150"
						onClick={() => handleSubtopicSelection(subtopic)}
						key={index}
					>
						<div className="flex-col items-stretch justify-center w-full p-8">
							<div className="border-b border-gray-200">
								<img src={placeholderImage} alt={subtopic} className="h-48 mx-auto my-4 p-4" />
							</div>
							<h5 className="text-xl font-bold py-3" style={{ textAlign: 'center' }}>{subtopic}</h5>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default SubtopicSelector;