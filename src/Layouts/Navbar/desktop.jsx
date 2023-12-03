import { Fragment } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import logo from '../../assets/images/logo.png';
import ProfileMenu from './profileMenu';

const navItems = [
	<Link key="home_logo" to="/">
		<img src={logo} alt="home" className="h-16 mr-4 mx-auto my-4 hidden md:block" />
	</Link>,

	<Button key="home_explicit" color="inherit" component={Link} to="/">
		Home
	</Button>,

	<div key="ask_a_question" className="flex-grow flex justify-end gap-4">
		<Button color="inherit" component={Link} to="/help">
			Ask a Question
		</Button>
		<Button
			variant="outlined"
			color="primary"
			startIcon={<LocationOnIcon />}
			component="a"
			href="https://www.findhelp.org"
			target="_blank"
			rel="noopener noreferrer"
		>
			Find help Nearby
		</Button>
	</div>,
	<Fragment key="profile_menu">
		<ProfileMenu />
	</Fragment>,
];

const DesktopNavBar = () => <Toolbar disableGutters>{navItems}</Toolbar>;

export default DesktopNavBar;
