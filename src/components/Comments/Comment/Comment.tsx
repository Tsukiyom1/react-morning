import type { ICommentProps } from "../../../interface/ICommentProps";
import MyButton from "../../../UI/button/MyButton";
import MyInput from "../../../UI/input/MyInput";

const Comment = ({
	comment,
	editValue,
	isEdit,
	onCancel,
	onDelete,
	onEditChange,
	onUpdate,
	onEdit,
}: ICommentProps) => {
	if (isEdit) {
		return (
			<div>
				<h3 style={{ textAlign: "center", marginBottom: "10px" }}>
					Редактировать пост
				</h3>

				<MyInput
					name='body'
					onChange={onEditChange}
					type='text'
					value={editValue}
					placeholder={"Добавить комментарий"}
				/>
				<MyButton
					type='button'
					children='Сохранить'
					onClick={() => onUpdate(comment.id, editValue)}
				/>
				<MyButton type='button' children='Отмена' onClick={onCancel} />
			</div>
		);
	}

	return (
		<div
			style={{
				marginTop: "10px",
				marginBottom: "10px",
				padding: "10px",
				border: "1px solid #gray",
				borderRadius: "8px",
				background: "#f9f9f9",
			}}
		>
			<p style={{ margin: "0 0 8px 0" }}>{comment.text}</p>
			<div>
				<MyButton
					type='button'
					children='Удалить'
					onClick={() => onDelete(comment.id)}
				/>
				<MyButton
					type='button'
					children='Редактировать'
					onClick={() => onEdit(comment)}
				/>
			</div>
		</div>
	);
};

export default Comment;
