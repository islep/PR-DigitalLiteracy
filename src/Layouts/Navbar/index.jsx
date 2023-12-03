import { cloneElement } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import { useMediaQuery } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import DesktopNavBar from './desktop';
import MobileNavBar from './mobile';

function ElevationScroll(props) {
	const { children } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

ElevationScroll.propTypes = {
	children: PropTypes.element.isRequired,
};

const Navbar = () => {
	// media query to get if device is mobile
	const isMobile = useMediaQuery('(max-width: 768px)');
	return (
		<ElevationScroll>
			{isMobile ? (
				<AppBar component="nav" color="" className="lg:bg-transparent px-6 py-2">
					<MobileNavBar />
				</AppBar>
			) : (
				<AppBar component="nav" color="" className="lg:px-52 border-b border-gray-200 bg-transparent">
					<DesktopNavBar />
				</AppBar>
			)}
		</ElevationScroll>
	);
};

export default Navbar;
