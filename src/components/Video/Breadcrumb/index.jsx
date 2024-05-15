import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ subtopicValue, handleResetSubtopic, subtopics }) {
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
					<button type="button" onClick={handleResetSubtopic}>
						{subtopicValue}
					</button>
				</>
			) : (
				subtopics.length > 0 && (
					<>
						<span className="mx-1.5"> {'>'} </span>
						<div className="font-bold">Subtopics</div>
					</>
				)
			)}

			{(subtopics.length === 0 || subtopicValue.length > 0) && (
				<>
					<span className="mx-1.5"> {'>'} </span>
					<div className="font-bold">Videos</div>
				</>
			)}
		</div>
	);
}

Breadcrumb.propTypes = {
	subtopicValue: PropTypes.arrayOf(PropTypes.string).isRequired,
	handleResetSubtopic: PropTypes.func.isRequired,
	subtopics: PropTypes.arrayOf(PropTypes.string).isRequired,
};
