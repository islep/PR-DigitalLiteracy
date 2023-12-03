import { useEffect } from 'react';
import { debounce } from 'lodash';

export function useAutoSave(saveFunction, dependencies) {
	useEffect(() => {
		const debouncedSave = debounce(saveFunction, 5000); // Debounce for 5 seconds
		debouncedSave();

		return () => debouncedSave.cancel();
	}, dependencies);
}
