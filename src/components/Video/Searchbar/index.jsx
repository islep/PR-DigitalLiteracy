import React from 'react';
import { Box, Grid } from '@mui/material';
import { TagsInput } from 'react-tag-input-component';


export function SearchBar({ tags, tagsFromSearchBar }) {

	return (
		<Box
			sx={{
				backgroundColor: '#f0f8ff',
				height: '89%',
				margin: '7',
				width: '100%',
				borderRadius: '1rem',
				padding: '1rem',
				marginTop: '1rem',
				boxShadow: 2,
				position: 'relative',
			}}
		>
			<Grid container>
				<Grid item xs={12}>
					<Box component="form">
						<div className="input-tags-wrapper">
							<TagsInput
								InputProps={{
									disableUnderline: true,
								}}
								type="text"
								variant="standard"
								id="search"
								value={tags}
								separators={['Enter']}
								onChange={tagsFromSearchBar}
								placeHolder="Search Videos"
							/>
						</div>
					</Box>
				</Grid>
			</Grid>
		</Box>
	)
}

export default SearchBar;