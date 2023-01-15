export type BlogPost = {
	metadata: {
		title: string;
		dateDisplay: string;
		utcDateString: string;
		date: string;
		draft: boolean;
		description: string;
		tags: string[];
		guid: string;
		slug: string;
	};
	html: string;
	fileName: string;
	slug: string;
};
