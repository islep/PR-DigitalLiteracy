import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import './message.css';

export default function Popup({ text, handleRestart, handleResume, handleRestartFrom }) {
  useEffect(() => {
    Swal.fire({
      text,
      showCancelButton: true,
      cancelButtonText: 'Restart from the beginning',
      showDenyButton: true,
      denyButtonText: 'Restart last segment',
      showConfirmButton: true,
      confirmButtonText: 'Doing ok. Carry on.',
      customClass: {
        confirmButton: 'swal-button-color swal2-styled',
        cancelButton: 'swal-button-color swal2-styled',
        denyButton: 'swal-button-color swal2-styled',
        actions: 'swal-right-corner',
        popup: 'my-popup-class',
      },
      reverseButtons: true,
      buttonsStyling: false,
      width: '60rem',
      padding: '3rem',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isDismissed) {
        handleRestart();
      } else if (result.isConfirmed) {
        handleResume();
      } else if (result.isDenied) {
        handleRestartFrom();
      }
    });
  }, [text, handleRestart, handleResume, handleRestartFrom]); // Dependencies array to control effect re-run

  // Return null or any other placeholder content as the actual popup is handled imperatively
  return null;
}

Popup.propTypes = {
  text: PropTypes.string.isRequired,
  handleRestart: PropTypes.func.isRequired,
  handleResume: PropTypes.func.isRequired,
  handleRestartFrom: PropTypes.func.isRequired,
};
