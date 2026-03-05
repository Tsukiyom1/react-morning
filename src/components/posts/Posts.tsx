import React from "react";
import type { IPostsProps } from "../../interface/IData";
import MyButton from "../../UI/button/MyButton";
import MyInput from "../../UI/input/MyInput";

const Posts = ({
	onDelete,
	post,
	isEdit,
	onEditChange,
	editValue,
	onCancel,
	onUpdate,
	onEdit,
}: IPostsProps) => {
	if (isEdit) {
		return (
			<React.Fragment>
				<h3>Редактировать пост</h3>
				<MyInput
					onChange={onEditChange}
					placeholder='Введите новый текст заголовки'
					type='text'
					value={editValue.title}
					name='title'
				/>
				<MyInput
					onChange={onEditChange}
					placeholder='Введите новый текст описание'
					type='text'
					value={editValue.body}
					name='body'
				/>
				<MyButton
					type='button'
					children='Сохранить'
					onClick={() => onUpdate(post.id)}
				/>
				<MyButton type='button' children='Отмены' onClick={onCancel} />
			</React.Fragment>
		);
	}
	return (
		<div className='post' key={post.id}>
			<h2>{post.title}</h2>
			<p>{post.body}</p>
			<div className='btns'>
				<MyButton
					children='Удалить'
					type='button'
					onClick={() => {
						onDelete(post.id);
					}}
				/>
				<MyButton
					children='Редактировать'
					type='button'
					onClick={() => onEdit(post)}
				/>
			</div>
		</div>
	);
};

export default Posts;
