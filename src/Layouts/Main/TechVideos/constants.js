// these are the constants for the TechVideos page
// subtopicgroup should be retrived from the database

// side filter options unsorted tuple (label, database_value) array
export const FILTERGROUPS = [
	{
		subheading: 'Device Type',
		filters: [
			['Mobile - iOS', 'iOS'],
			['Mobile - Android', 'Android'],
			['Desktop - Windows', 'Windows'],
			['Desktop - Mac', 'Mac'],
			['Desktop - Linux', 'Linux'],
		],
	},
	{
		subheading: 'Content Type',
		filters: [
			['Daily Life', 'daily_life'],
			['Finance', 'finance'],
			['Safety Privacy', 'safety_privacy'],
			['Class & Work', 'class_word'],
		],
	},
];

// subtopic groups unsorted tuple (label, database_values) array
export const SUBTOPICGROUPS = [
	[
		'daily_life',
		[
			'Introduction to Basic Devices',
			'Emails',
			'Internet Browsing',
			'Online Saftey/Security',
			'Social Media Basics',
			'Digital Communication',
			'Understanding Apps',
		],
	],
	[
		'finance',
		[
			'Using & Managing credit and debit cards',
			'Maintaining Credit score',
			'Bank Accounts',
			'Savings & Interest',
			'Financial scams',
			'Investments & risks',
		],
	],
	[
		'safety_privacy',
		[
			'Introduction to Digital Safety',
			'Creating Strong Passwords',
			'Understanding Personal Information',
			'Social Media Safety',
			'Safe Browsing Practices',
			'Email Security: Recognizing phishing emails',
			'Device Security',
			'Wi-Fi Security',
			'Online Shopping Safety',
			'Privacy Settings on Mobile Devices',
			'Backing Up Data',
			'Cyberbullying Awareness',
			'Digital Footprint',
			'Two-Factor Authentication (2FA)',
			'Emergency Response',
		],
	],
	[
		'class_word',
		[
			'Using Microsoft Word',
			'Using Microsoft Excel',
			'Using Google Docs',
			'Using Google Sheets',
			'Canvas Learning Management System',
			'Effective Email Communication',
			'Video Conferencing Tools (e.g., Zoom, Microsoft Teams)',
			'File Management',
			'Time Management Tools (e.g., Calendar)',
			'Presentation Software (e.g., PowerPoint, Google Slides)',
			'Cybersecurity Awareness',
			'Adapting to Technological Changes',
		],
	],
];