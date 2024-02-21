import { React} from 'react';
import { Box, Grid} from '@mui/material';
import { Colors } from '../../../constants/Colors';


export function Intro({ introText }) {

	return (
		<>
			<Box
				sx={{
					fontFamily: 'Inria Sans',
					color: Colors.primaryColor,
					fontWeight: '700',
					textAlign: 'right',
					paddingRight: '2rem',
					paddingTop: '1rem',
					fontSize: {
						md: '2.75rem',
						sm: '3rem',
						xs: '2rem',
					},
				}}
			/>
			<Grid item md={6} xs={12}>
				<Box
					sx={{
						marginTop: { md: '0.5rem', sm: '0.5rem', xs: '0.5rem' },
						textAlign: 'center',
					}}
				>
					<Box
						sx={{
							fontFamily: 'Inria Sans',
							color: Colors.primaryColor,
							fontWeight: '700',
							textAlign: 'center',
							fontSize: {
								md: '2.75rem',
								sm: '3rem',
								xs: '2rem',
							},
						}}
					>
						{introText}
					</Box>
				</Box>
			</Grid>
		</>
	);
}

export default Intro;
