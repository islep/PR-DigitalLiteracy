import { useState, Fragment } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QuestionAnswer from '@mui/icons-material/QuestionAnswer';
import { List, ListItem, ListItemButton, ListItemText, IconButton, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import PropTypes from 'prop-types';

import logo from '../../assets/images/logo.png';
import ProfileMenu from './profileMenu';

const MobileNavBar = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};
	return (
		<>
			<Toolbar disableGutters className="flex justify-end">
				<IconButton
					key="sandwich_button"
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
				>
					<MenuIcon />
				</IconButton>
			</Toolbar>
			<MobileDrawer mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
		</>
	);
};

const MobileDrawer = (props) => {
	const { mobileOpen, onClose } = props;
	const container = window !== undefined ? () => window.document.body : undefined;

	const drawerItems = (
		<List>
			<ListItem disablePadding>
				<ListItemButton component={Link} to="/" onClick={onClose}>
					<ListItemIcon>
						<img src={logo} alt="home" className="h-10" />
					</ListItemIcon>
				</ListItemButton>
			</ListItem>
			<ListItem disablePadding>
				<ListItemButton component={Link} to="/help" onClick={onClose}>
					<ListItemIcon>
						<QuestionAnswer />
					</ListItemIcon>
					<ListItemText primary="Ask a Question" />
				</ListItemButton>
			</ListItem>
			<ListItem disablePadding>
				<ListItemButton component="a" href="https://www.findhelp.org" onClick={onClose}>
					<ListItemIcon>
						<LocationOnIcon />
					</ListItemIcon>
					<ListItemText primary="Find help Nearby" />
				</ListItemButton>
			</ListItem>
			<ListItem disablePadding>
				<ProfileMenu isMobile />
			</ListItem>
		</List>
	);

	return (
		<nav>
			<Drawer
				anchor="right"
				container={container}
				variant="temporary"
				open={mobileOpen}
				onClose={onClose}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
				}}
			>
				{drawerItems}
			</Drawer>
		</nav>
	);
};

MobileDrawer.propTypes = {
	mobileOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default MobileNavBar;
