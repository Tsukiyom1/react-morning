import type { ChangeEvent } from "react";
import type { IPost } from "./IPost";

export interface IPostsProps {
	post: IPost;
	onDelete: (id: string) => void;
	isEdit: boolean;
	onEditChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onCancel: () => void;
	onUpdate: (id: string) => void;
	editValue: { body: string; title: string };
	onEdit: (post: IPost) => void;
}
