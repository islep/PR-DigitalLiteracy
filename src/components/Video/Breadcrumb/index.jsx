import React from 'react';
import { Link } from "react-router-dom";

export function Breadcrumb({ subtopicValue, handleResetSubtopic, subtopics }) {

	return (
		<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: '1.2em', fontFamily: 'Inria Sans' }}>
			<Link to="/">Home</Link>

			{subtopicValue.length > 0 ? (
				<>
					<span style={{ margin: '0 5px' }}> {'>'} </span>
					<button onClick={handleResetSubtopic}>{subtopicValue}</button>
				</>
			) : ((subtopics.length > 0) && (
				<>
					<span style={{ margin: '0 5px' }}> {'>'} </span>
					<b>Subtopics</b>
				</>
			))}

			{(subtopics.length == 0 || subtopicValue.length > 0) && (
				<>
					<span style={{ margin: '0 5px' }}> {'>'} </span>
					<div>
						<b>Videos</b>
					</div>
				</>
			)}
		</div>
	);
}

export default Breadcrumb;