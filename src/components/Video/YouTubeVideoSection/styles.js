import { Colors } from '../../../constants/Colors';

export const styleInput = {
	backgroundColor: Colors.backgroundColor,
	border: 'None',
};
export const inputStyle = {
	input: {
		color: Colors.primaryColor,
		backgroundColor: Colors.white,
		fontFamily: 'Inria Sans',
		fontSize: '1rem',
	},
	label: {
		Color: Colors.primaryColor,
		fontFamily: 'Inria Sans',
		fontSize: '1.2rem',
	},
	color: Colors.primaryColor,
	'.css-o943dk-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
		color: Colors.primaryColor,
		fontWeight: 700,
	},
	'.css-1ff8729-MuiInputBase-root-MuiFilledInput-root:before': {
		borderBottom: '0',
	},
	'.css-1ff8729-MuiInputBase-root-MuiFilledInput-root:after': {
		borderBottom: '0',
	},
	'.MuiBox-root css-1otw7zh': { background: Colors.white },
	'.css-85zwa9-MuiInputBase-root-MuiFilledInput-root:hover': {
		backgroundColor: Colors.white,
		color: Colors.primaryColor,
	},
	'.css-o943dk-MuiFormLabel-root-MuiInputLabel-root': {
		color: Colors.primaryColor,
		fontWeight: 700,
		backgroundColor: Colors.white,
	},
	'&.Mui-checked': {
		color: Colors.primaryColor,
	},
};
