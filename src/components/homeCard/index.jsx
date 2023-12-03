import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HomeCard = ({ index, href, image, heading, subItems, onClick }) => (
	<Link to={href}>
		<div
			className="bg-white rounded-xl cursor-pointer shadow-1 hover:shadow-12 hover:scale-105 transition-all duration-150"
			onClick={onClick}
			role="button"
			tabIndex={index}
			onKeyDown={onClick}
		>
			<div className="flex-col items-stretch justify-center w-full p-8">
				<div className="border-b border-gray-200">
					<img src={image} alt={heading} className="h-48 mx-auto my-4 p-4" />
				</div>
				<h5 className="text-xl font-bold py-3">{heading}</h5>
				{subItems.map((e) => (
					<p key={e} className="text-gray-800 text-lg text-end">
						{e}
					</p>
				))}
			</div>
		</div>
	</Link>
);

HomeCard.propTypes = {
	index: PropTypes.number.isRequired,
	href: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	heading: PropTypes.string.isRequired,
	subItems: PropTypes.arrayOf(PropTypes.string).isRequired,
	onClick: PropTypes.func,
};

HomeCard.defaultProps = {
	onClick: () => {},
};

export default HomeCard;

// import Link from "@mui/material/";

// function HomeCard(props) {
// 	const navigate = useNavigate();
// 	const [isJobApplicationModalOpen, setJobApplicationModalOpen] = useState(false);

// 	const [isComingSoon, setComingSoon] = useState(false);

// 	const cardClicked = () => {
// 		if (props.index === 0) {
// 			navigate('/techInDailyLife');
// 		} else if (props.index === 1) {
// 			navigate('/techInClassAndWord');
// 		} else if (props.index === 2) {
// 			navigate('/techSafetyAndPrivacy');
// 		} else if (props.index === 3) {
// 			navigate('/financeAndManagement');
// 		} else if (props.index === 4) {
// 			setJobApplicationModalOpen(true);
// 		} else if (props.index === 5) {
// 			window.open('https://www.findhelp.org');
// 		} else {
// 			// put coming soon
// 			setComingSoon(true);
// 		}
// 	};

// 	const openJobApplicationModal = () => {
// 		const handleClose = () => setJobApplicationModalOpen(false);

// 		return (
// 			<Modal
// 				open={isJobApplicationModalOpen}
// 				onClose={handleClose}
// 				aria-labelledby="modal-modal-title"
// 				aria-describedby="modal-modal-description"
// 				closeAfterTransition
// 			>
// 				<JobApplicationModal />
// 			</Modal>
// 		);
// 	};

// 	const showModalForComingSoon = () => {
// 		const handleComingSoonClose = () => setComingSoon(false);

// 		return (
// 			<Modal
// 				open={isComingSoon}
// 				onClose={handleComingSoonClose}
// 				aria-labelledby="modal-modal-title"
// 				aria-describedby="modal-modal-description"
// 				closeAfterTransition
// 			>
// 				<Box
// 					sx={{
// 						margin: 'auto',
// 						width: { md: '30%', sm: '30%', xs: '50%' },
// 						mt: 10,
// 						bgcolor: Colors.primaryColor,
// 						borderRadius: '0.5rem',
// 						boxShadow: 24,
// 						p: 4,
// 					}}
// 				>
// 					<Box sx={{ color: Colors.white, textAlign: 'center' }}>This module is under construction. Hold on tight!</Box>
// 				</Box>
// 			</Modal>
// 		);
// 	};

// 	return (

// 		<Box>
// 			<Box>
// 				<Card
// 					sx={{
// 						maxWidth: 345,
// 						background: Colors.backgroundColor,
// 						cursor: 'pointer',
// 					}}
// 					onClick={cardClicked}
// 				>
// 					<CardMedia
// 						component="img"
// 						sx={{
// 							height: '130px',
// 							margin: 'auto',
// 							marginBottom: '2rem',
// 							marginTop: '2rem',
// 						}}
// 						image={props.image}
// 						alt={props.alt}
// 					/>
// 					<CardContent
// 						sx={{
// 							background: Colors.white,
// 							borderTopLeftRadius: '1rem',
// 							borderTopRightRadius: '1rem',
// 							backgroundColor: Colors.white,
// 						}}
// 					>
// 						<Typography
// 							gutterBottom
// 							variant="h5"
// 							component="div"
// 							sx={{
// 								color: Colors.primaryColor,
// 								fontWeight: '700',
// 								fontFamily: 'Inria Sans',
// 								fontSize: '1rem',
// 							}}
// 						>
// 							{props.heading}
// 						</Typography>

// 						{props.list.map((e, index) => (
// 							<Typography
// 								key={index}
// 								variant="body2"
// 								sx={{
// 									color: Colors.primaryColor,
// 									fontFamily: 'Inria Sans',
// 									fontSize: '1rem',
// 								}}
// 							>
// 								- {e}
// 							</Typography>
// 						))}
// 					</CardContent>
// 				</Card>
// 			</Box>
// 			<div>{openJobApplicationModal()}</div>
// 			<div>{showModalForComingSoon()}</div>
// 		</Box>
// 	);
// }
