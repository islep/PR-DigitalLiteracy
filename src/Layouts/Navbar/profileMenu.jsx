import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { logout } from '../../firebase/firebase';
import { useAuth } from '../../firebase/AuthContext';
import PATHS from '../../paths';

const ProfileMenu = ({ isMobile }) => {
	const [settings, setSettings] = useState([]);
	const { currentUser } = useAuth();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	useEffect(() => {
		if (currentUser) {
			console.log('current user is ', currentUser);
			if (currentUser.uid === 'ZDcu0yY6fbU8FvuyKY4lHITysbq1') {
				setSettings([
					{
						name: 'Log Out',
						href: PATHS.logout,
					},
					{ name: 'Add Videos', href: PATHS.addYoutubeVideos },
					{
						name: 'Help Manager',
						href: PATHS.helpManager,
					},
				]);
			} else {
				setSettings([
					{
						name: 'Log Out',
						href: PATHS.logout,
					},
				]);
			}
		} else {
			setSettings([
				{
					name: 'Log In',
					href: PATHS.login,
				},
			]);
		}
	}, [currentUser]);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			{isMobile ? (
				<ListItemButton
					size="large"
					edge="end"
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={handleMenu}
					color="inherit"
				>
					<ListItemIcon>
						<AccountCircle />
					</ListItemIcon>
					{isMobile && <ListItemText primary="Profile" />}
				</ListItemButton>
			) : (
				<IconButton
					size="large"
					edge="end"
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={handleMenu}
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
			)}
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={open}
				onClose={handleClose}
			>
				{settings.map((option) => (
					<MenuItem key={option.name} component={Link} to={option.href} onClick={handleClose}>
						{option.name}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

ProfileMenu.propTypes = {
	isMobile: PropTypes.bool,
};

ProfileMenu.defaultProps = {
	isMobile: false,
};

export default ProfileMenu;
