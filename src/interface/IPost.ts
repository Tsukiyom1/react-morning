export interface IPost {
	id: number;
	title: string;
	body: string;
}

export interface IPostWithoutId {
	title: string;
	body: string;
}
