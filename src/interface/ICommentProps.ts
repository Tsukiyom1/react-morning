import type { IComment } from "./IComment";

export interface ICommentProps {
	comment: IComment;
	onDelete: (id: string) => void;
	onUpdate: (id: string, text: string) => void;
	isEdit: boolean;
	onCancel: () => void;
	onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	editValue: string;
	onEdit: (comment: IComment) => void;
}
