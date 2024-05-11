import React from 'react';
import { Link } from 'react-router-dom';

export function Breadcrumb({ subtopicValue, handleResetSubtopic, subtopics }) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				fontSize: '1.2em',
				fontFamily: 'Inria Sans',
			}}
		>
			<Link to="/">Home</Link>

			{subtopicValue.length > 0 ? (
				<>
					<span className="mx-1.5"> {'>'} </span>
					<button onClick={handleResetSubtopic}>{subtopicValue}</button>
				</>
			) : (
				subtopics.length > 0 && (
					<>
						<span className="mx-1.5"> {'>'} </span>
						<div className="font-bold">Subtopics</div>
					</>
				)
			)}

			{(subtopics.length == 0 || subtopicValue.length > 0) && (
				<>
					<span className="mx-1.5"> {'>'} </span>
					<div className="font-bold">Videos</div>
				</>
			)}
		</div>
	);
}

export default Breadcrumb;
