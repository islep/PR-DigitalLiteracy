import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { logout } from '../../firebase/firebase';
import { useAuth } from '../../firebase/AuthContext';
import PATHS from '../../paths';

const ProfileMenu = ({ isMobile }) => {
	const [settings, setSettings] = useState([]);
	const { currentUser } = useAuth();
	const [anchorEl, setAnchorEl] = useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const [notification, setNotification] = useState('');

	const showMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const closeMenu = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		logout();
		setNotification('You have been logged out');
	};

	useEffect(() => {
		if (currentUser) {
			if (currentUser.uid === process.env.REACT_APP_ADMIN_UID) {
				setSettings([
					{
						name: 'Log Out',
						onClick: handleLogout,
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
						onClick: handleLogout,
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

	return (
		<>
			{isMobile ? (
				<ListItemButton
					size="large"
					edge="end"
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={showMenu}
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
					onClick={showMenu}
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
				open={isMenuOpen}
				onClose={closeMenu}
			>
				{settings.map((option) => (
					<MenuItem
						key={option.name}
						component={Link}
						to={option.href}
						onClick={() => {
							if (option.onClick) option.onClick();
							closeMenu();
						}}
					>
						{option.name}
					</MenuItem>
				))}
			</Menu>
			<Snackbar
				open={notification !== ''}
				autoHideDuration={6000}
				onClose={() => setNotification('')}
				message={notification}
			/>
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
