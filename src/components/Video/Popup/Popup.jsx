import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Popup({ text, handleClose }) {
	return (
		<Dialog
			open
			onClose={handleClose}
			fullWidth
			maxWidth="md"
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Video Question</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{text}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} autoFocus>
					Understood
				</Button>
			</DialogActions>
		</Dialog>
	);
}

Popup.propTypes = {
	text: PropTypes.string.isRequired,
	handleClose: PropTypes.func.isRequired,
};
