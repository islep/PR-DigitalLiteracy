
import cardImage1 from './assets/images/card-image-1.png';
import cardImage2 from './assets/images/card-image-2.png';
import cardImage3 from './assets/images/card-image-3.png';
import cardImage4 from './assets/images/card-image-4.png';
import cardImage5 from './assets/images/card-image-5.png';
import PATHS from './paths'

const cardData = [
	{
		image: cardImage1,
		heading: 'Technology Use in Daily Life',
		subItems: ['Apps for different purposes', 'Google Search Techniques', 'Privacy Settings'],
		href: PATHS.techInDailyLife,
	},
	{
		image: cardImage2,
		heading: 'Technology use for Class and Work',
		subItems: ['Microsoft Office Basics', 'Printing and Scanning', 'Email and Document Upload'],
		href: PATHS.techInClassAndWord,
	},
	{
		image: cardImage3,
		heading: 'Technology Safety and Privacy',
		subItems: ['Phishing and Scams', 'Financial Security', 'Malware and More'],
		href: PATHS.techSafetyAndPrivacy,
	},
	{
		image: cardImage4,
		heading: 'Financial Well Being and Management',
		subItems: ['Auto Pay', 'Bill Check', 'Credit Rating'],
		href: PATHS.financeAndManagement,
	},
	{
		image: cardImage5,
		heading: 'Job Application Support',
		subItems: ['Job Search', 'Identify Your Skills', 'Resume Builder'],
		href: PATHS.jobSupport,
	},
];

export default cardData;