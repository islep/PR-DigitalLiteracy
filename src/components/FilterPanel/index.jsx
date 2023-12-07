import { useState } from 'react';
import PropTypes from 'prop-types';
import { Drawer, useMediaQuery, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

const FilterPanel = ({ filterGroups, onSave }) => {
	const isMobile = useMediaQuery('(max-width: 768px)');
	if (isMobile) {
		return <FilterPanelMobile filterGroups={filterGroups} onSave={onSave} />;
	}
	return <FilterPanelDesktop filterGroups={filterGroups} onSave={onSave} />;
};

const FilterPanelMobile = ({ filterGroups, onSave }) => {
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
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, padding: '20px' },
				}}
			>
				<FilterPanelContent filterGroups={filterGroups} onSave={onSave} />
			</Drawer>
		</>
	);
};

const FilterPanelDesktop = ({ filterGroups, onSave }) => (
	<div className="fixed left-0 top-24 bottom-0 w-80 p-8 border-r border-gray-100 shadow-4 bg-white">
		<FilterPanelContent filterGroups={filterGroups} onSave={onSave} />
	</div>
);

const FilterPanelContent = ({ filterGroups, onSave }) => (
	<>
		{filterGroups.map(({ subheading, filters }) => (
			<div key={subheading}>
				<div className="text-lg flex items-center my-8">
					<TuneIcon />
					<span className="ml-4">{subheading}</span>
				</div>
				<div className="overflow-y-auto max-h-screen">
					<FormGroup>
						{filters.map((f) => (
							// show a checkbox
							<FormControlLabel key={f} control={<Checkbox defaultChecked />} label={f} />
						))}
					</FormGroup>
				</div>
			</div>
		))}
		<div className="fixed bottom-0 w-64 py-8">
			<Button variant="contained" fullWidth onClick={onSave}>
				Apply
			</Button>
		</div>
	</>
);

FilterPanel.propTypes = {
	filterGroups: PropTypes.arrayOf(
		PropTypes.shape({
			subheading: PropTypes.string.isRequired,
			filters: PropTypes.array.isRequired,
		}),
	).isRequired,
	onSave: PropTypes.func.isRequired,
};

FilterPanelMobile.propTypes = {
	filterGroups: PropTypes.arrayOf(
		PropTypes.shape({
			subheading: PropTypes.string.isRequired,
			filters: PropTypes.array.isRequired,
		}),
	).isRequired,
	onSave: PropTypes.func.isRequired,
};

FilterPanelDesktop.propTypes = {
	filterGroups: PropTypes.arrayOf(
		PropTypes.shape({
			subheading: PropTypes.string.isRequired,
			filters: PropTypes.array.isRequired,
		}),
	).isRequired,
	onSave: PropTypes.func.isRequired,
};

FilterPanelContent.propTypes = {
	filterGroups: PropTypes.arrayOf(
		PropTypes.shape({
			subheading: PropTypes.string.isRequired,
			filters: PropTypes.array.isRequired,
		}),
	).isRequired,
	onSave: PropTypes.func.isRequired,
};

export default FilterPanel;
