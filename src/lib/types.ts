export interface BlogPost {
	metadata: {
		title: string;
		date: string;
		draft: boolean;
		description: string;
		tags: string[];
	};
	html: string;
	fileName: string;
	slug: string;
}
