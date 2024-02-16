import { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Drawer,
	useMediaQuery,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Button,
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FilterPanel = ({ filterGroups, onSave, appliedFilterTags }) => {
	const isMobile = useMediaQuery('(max-width: 768px)');
	if (isMobile) {
		return <FilterPanelMobile filterGroups={filterGroups} onSave={onSave} appliedFilterTags={appliedFilterTags} />;
	}
	return <FilterPanelDesktop filterGroups={filterGroups} onSave={onSave} appliedFilterTags={appliedFilterTags} />;
};

const FilterPanelMobile = ({ filterGroups, onSave, appliedFilterTags }) => {
	const [isOpen, setIsOpen] = useState(false);
	const container = window !== undefined ? () => window.document.body : undefined;
	const onClose = () => {
		setIsOpen(false);
	};

	const openDrawer = () => {
		setIsOpen(true);
	};

	return (
		<>
			<Button onClick={openDrawer}>Filter results</Button>
			<Drawer
				anchor="left"
				container={container}
				variant="temporary"
				open={isOpen}
				onClose={onClose}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile
				}}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, padding: '20px' },
				}}
			>
				<FilterPanelContent filterGroups={filterGroups} onSave={onSave} appliedFilterTags={appliedFilterTags} />
			</Drawer>
		</>
	);
};

const FilterPanelDesktop = ({ filterGroups, onSave, appliedFilterTags }) => (
	<div className="fixed left-0 top-24 bottom-0 w-80 p-8 border-r border-gray-100 shadow-4 bg-white">
		<FilterPanelContent filterGroups={filterGroups} onSave={onSave} appliedFilterTags={appliedFilterTags} />
	</div>
);

const FilterPanelContent = ({ filterGroups, onSave, appliedFilterTags }) => {
	const [seletedFilterTags, setFormValue] = useState(appliedFilterTags);

	return (
		<>
			{/* <h2 className="text-xl mb-8">Filter By</h2> */}
			{filterGroups.map(({ subheading, filters, database_field }) => (
				<Accordion defaultExpanded key={subheading}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<span className="ml-4">{subheading}</span>
					</AccordionSummary>

					<AccordionDetails>
						<div className="overflow-y-auto max-h-100">
							<FormGroup>
								{filters.map((f) => (
									<FormControlLabel
										key={f}
										control={<Checkbox defaultChecked />}
										label={f[0]}
										value={seletedFilterTags}
										checked={seletedFilterTags.includes(f[1])}
										onChange={(event) => {
											const isChecked = event.target.checked;
											if (isChecked) {
												setFormValue((prevValue) => [...prevValue, f[1]]);
											} else {
												setFormValue((prevValue) => prevValue.filter(value => value !== f[1]));
											}
										}}
									/>
								))}
							</FormGroup>
						</div>
					</AccordionDetails>
				</Accordion>
			))}
			<div className="fixed bottom-0 w-64 py-8">
				<Button variant="contained" fullWidth onClick={() => onSave(seletedFilterTags)}>
					Apply
				</Button>
			</div>
		</>
	);
};

FilterPanel.propTypes = {
	filterGroups: PropTypes.arrayOf(
		PropTypes.shape({
			subheading: PropTypes.string.isRequired,
			filters: PropTypes.array.isRequired,
		}),
	).isRequired,
	onSave: PropTypes.func.isRequired,
	appliedFilterTags: PropTypes.array,
};

FilterPanelMobile.propTypes = {
	filterGroups: PropTypes.arrayOf(
		PropTypes.shape({
			subheading: PropTypes.string.isRequired,
			filters: PropTypes.array.isRequired,
		}),
	).isRequired,
	onSave: PropTypes.func.isRequired,
	appliedFilterTags: PropTypes.array,
};

FilterPanelDesktop.propTypes = {
	filterGroups: PropTypes.arrayOf(
		PropTypes.shape({
			subheading: PropTypes.string.isRequired,
			filters: PropTypes.array.isRequired,
		}),
	).isRequired,
	onSave: PropTypes.func.isRequired,
	appliedFilterTags: PropTypes.array,
};

FilterPanelContent.propTypes = {
	filterGroups: PropTypes.arrayOf(
		PropTypes.shape({
			subheading: PropTypes.string.isRequired,
			filters: PropTypes.array.isRequired,
		}),
	).isRequired,
	onSave: PropTypes.func.isRequired,
	appliedFilterTags: PropTypes.array.isRequired,
};


export default FilterPanel;
