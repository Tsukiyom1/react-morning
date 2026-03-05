import type { ChangeEvent } from "react";
import type { IPost } from "./IPost";

export interface IPostsProps {
	post: IPost;
	onDelete: (id: number) => void;
	isEdit: boolean;
	onEditChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onCancel: () => void;
	onUpdate: (id: number) => void;
	editValue: { body: string; title: string };
	onEdit: (post: IPost) => void;
}
