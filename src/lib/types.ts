export type BlogPost = {
	metadata: {
		title: string;
		dateDisplay: string;
		date: string;
		draft: boolean;
		description: string;
		tags: string[];
		slug: string;
	};
	html: string;
	fileName: string;
	slug: string;
};
