import type { IComment } from "./IComment";

export interface ICommentsProps {
	comments: IComment[];
	postId: string;
	onAddComment: (postId: string, text: string) => void;
	onDeleteComment: (id: string) => void;
	onEditComment: (comment: IComment) => void;
	onUpdateComment: (id: string, text: string) => void;
	onCancel: () => void;
	editValue: string;
	editingCommentId: string | null;
	onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
