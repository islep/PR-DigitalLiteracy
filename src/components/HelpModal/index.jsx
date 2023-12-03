import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function HelpModal(props) {
	const [open, setOpen] = useState(props.open);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const sendHelpToDatabase = () => {
		setOpen(false);
		// send Help to Firebase
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Call for Help?</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						We are sorry you are having trouble in filling the form. Would you like Project Rebound Staff to assist you?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>No, Thank You</Button>
					<Button onClick={sendHelpToDatabase} autoFocus>
						Yes, Please
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default HelpModal;
