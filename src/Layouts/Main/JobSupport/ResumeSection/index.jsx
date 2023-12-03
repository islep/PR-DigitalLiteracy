import React from 'react';
import { Box, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { stepContainer } from '../styles';
import { Colors } from '../../../../constants/Colors';
import AddSkills from '../../../../components/AddSkills';

function ResumeSection() {
	const navigate = useNavigate();
	const step_list = [
		'Step 1: Go to honestjobs.com',
		'Step 2: Search for the positions you want',
		'Step 3: Read the job descriptions carefully',
		'Step 4: Identify the skills they are asking for',
		'Step 5: Note these skills one-by-one on the side panel',
	];

	function SkillsBlock() {
		return (
			<Box
				sx={{
					backgroundColor: Colors.backgroundColor,
					height: '89%',
					margin: 'auto',
					width: '95%',
					borderRadius: '1rem',
					padding: '1rem',
					marginTop: '1rem',
					boxShadow: 2,
					position: 'relative',
				}}
			>
				<Grid container spacing={2}>
					{/* Heading row */}
					<Grid item xs={12}>
						<Box
							sx={{
								fontWeight: '700',
								fontSize: { md: '1.5rem', sm: '0.8rem', xs: '0.8rem' },
								color: Colors.primaryColor,
								marginLeft: '1rem',
								textAlign: 'left',
								justifyContent: 'space-between',
								flexDirection: 'column',
								display: 'flex',
							}}
						>
							Skills needed for the job I want
							<AddSkills />
						</Box>
					</Grid>
				</Grid>
			</Box>
		);
	}

	return (
		<div>
			<Box sx={{ margin: 'auto', width: '90%' }}>
				<Grid container spacing={2}>
					<Grid item sm={6} md={6} xs={12}>
						{step_list.map((e, index) => (
							<Box sx={stepContainer}>
								{index !== 0 ? (
									e
								) : (
									<Box style={{ cursor: 'pointer' }}>
										Step 1: Go to &nbsp;
										<a
											style={{
												color: Colors.primaryColor,
											}}
											href="https://www.honestjobs.com/"
											target="_blank"
											rel="noreferrer"
										>
											honestjobs.com
										</a>
									</Box>
								)}
							</Box>
						))}
					</Grid>
					<Grid item sm={6} md={6} xs={12}>
						<SkillsBlock />
					</Grid>
					<Grid item md={6} sm={6} xs={12} />
					<Grid item md={6} sm={6} xs={12}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
								marginTop: '1rem',
							}}
						>
							<Button
								variant="contained"
								sx={{
									backgroundColor: Colors.primaryColor,
									fontSize: { md: '1rem', sm: '0.7rem', xs: '0.5rem' },
									marginLeft: '1rem',
									'&:hover': { backgroundColor: Colors.primaryColor },
								}}
								onClick={() => {
									navigate('/resumeBuilder');
								}}
							>
								Build Your Resume Now
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default ResumeSection;
