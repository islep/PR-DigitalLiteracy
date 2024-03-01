export default function RetrieveVideos (dataFromFirebase, setVideoValue) {
	if (Array.isArray(dataFromFirebase)) {
		const transformedData = dataFromFirebase.map((item) => ({
			category: item.category,
			messages: item.messages,
			operating_system: item.operating_system,
			stopTimes: item.stopTimes,
			tags: item.tags,
			url: item.url,
			subtopic: item.subtopic,
			key: item.key,
		}));
		setVideoValue(transformedData);
	} else {
		console.log('dataFromFirebase is not an array');
	}
}