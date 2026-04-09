import React, { type FormEvent } from "react";
import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";
import styles from "./Comments.module.css";
import type { ICommentsProps } from "../../interface/ICommentsProps";
import Comment from "./Comment/Comment";
const Comments = ({
	comments,
	editValue,
	editingCommentId,
	onAddComment,
	onCancel,
	onDeleteComment,
	onEditChange,
	onEditComment,
	onUpdateComment,
	postId,
}: ICommentsProps) => {
	const [newCommentText, setNewCommentText] = React.useState<string>("");

	const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (newCommentText.trim() !== "") {
			onAddComment(postId, newCommentText);
			setNewCommentText("");
		}
	};

	const postComments = comments.filter(comment => comment.postId === postId);

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Комментарии</h3>
			<form onSubmit={handleAddComment}>
				<MyInput
					name='text'
					value={newCommentText}
					onChange={e => setNewCommentText(e.target.value)}
					placeholder='Добавить комментарий'
					type='text'
				/>
				<MyButton type='submit' children='Отправить' />
			</form>
			{postComments.length === 0 ? (
				<p style={{ padding: "10px" }}>
					<i>Комментариев пока нет</i>
				</p>
			) : (
				<div>
					{postComments.map(com => (
						<Comment
							comment={com}
							editValue={editValue}
							isEdit={editingCommentId === com.id}
							onCancel={onCancel}
							onDelete={onDeleteComment}
							onEdit={onEditComment}
							onEditChange={onEditChange}
							onUpdate={onUpdateComment}
							key={com.id}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Comments;
