import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const QuestionBox = (props) => {
	const { title, postedBy, postedOn, url } = props;
	const formattedDate = postedOn
		? postedOn.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
		: 'Error cannot find date';

	return (
		<div className="border-b border-gray-300 p-4 my-4 hover:shadow-md hover:rounded-md">
			<h2 className="font-bold text-primary text-lg md:text-xl">{title}</h2>
			<p className="text-sm md:text-base mb-2 text-gray-700">{formattedDate}</p>
			<p>
				Asked by:
				<span className="font-semibold text-primary text-base mb-4"> {postedBy}</span>
			</p>
			<Link to={url} className="flex justify-end">
				<Button type="button" className="bg-primary text-white hover:bg-primary-dark py-2 px-4 rounded-md">
					See the Question and Answers
				</Button>
			</Link>
		</div>
	);
};

QuestionBox.propTypes = {
	title: PropTypes.string.isRequired,
	postedBy: PropTypes.string.isRequired,
	postedOn: PropTypes.string,
	url: PropTypes.string.isRequired,
};

QuestionBox.defaultProps = {
	postedOn: null,
};

export default QuestionBox;
