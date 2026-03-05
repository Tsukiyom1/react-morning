import { useState, type ChangeEvent, type FormEvent } from "react";

import Posts from "./components/posts/Posts";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import type { IPost } from "./interface/IPost";

// useEffect(() => {
// 	const fetchData = async () => {
// 		try {
// 			const response = await fetch(
// 				"https://jsonplaceholder.typicode.com/posts",
// 			);
// 			const data = await response.json();
// 			setData(data);
// 		} catch (error) {
// 			console.error(error, "when getting data");
// 		}
// 	};
// 	fetchData();
// }, []);

function App() {
	const [data, setData] = useState<IPost[]>([
		{ title: "Js", body: "Я изучаю JS!", id: 1 },
		{ title: "React", body: "Я изучаю React!", id: 2 },
		{ title: "Python", body: "Я изучаю Python!", id: 3 },
		{ title: "Nest", body: "Я изучаю Nest!", id: 4 },
	]);

	const [title, setTitle] = useState<string>("");
	const [body, setBody] = useState<string>("");

	const [editValue, setEditValue] = useState({
		title: "",
		body: "",
	});

	const [editingPostId, setEditingPostId] = useState<number | null>(null);

	const onChangeBody = (e: ChangeEvent<HTMLInputElement>) => {
		setBody(e.target.value);
	};
	const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const onEditChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		console.log(value, "val");
		console.log(name, "name");

		setEditValue(prev => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const addNewPost = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newPosts: IPost = {
			body: body,
			title: title,
			id: Date.now(),
		};

		setData([...data, newPosts]);
		setBody("");
		setTitle("");
	};

	const onDeletePost = (id: number) => {
		console.log("click");

		setData(
			data.filter(post => {
				console.log(post, "post");
				console.log(post.id, "post.id");
				console.log(id, "id");

				return post.id !== id;
			}),
		);
	};

	const startEdit = (post: IPost) => {
		setEditingPostId(post.id);
		setEditValue({ body: post.body, title: post.title });
	};

	const onCancel = () => {
		setEditingPostId(null);
		setEditValue({ body: "", title: "" });
	};

	const onUpdate = (id: number) => {
		setData(
			data.map(data => {
				return data.id === id
					? { ...data, title: editValue.title, body: editValue.body }
					: data;
			}),
		);

		setEditingPostId(null);
	};
	return (
		<>
			<form onSubmit={addNewPost}>
				<MyInput
					placeholder='Введите заголовок'
					type='text'
					value={title}
					onChange={onChangeTitle}
				/>
				<MyInput
					placeholder='Введите текст'
					type='text'
					value={body}
					onChange={onChangeBody}
				/>
				<MyButton type='submit' children='Создать' />
			</form>
			{data.map(data => (
				<Posts
					post={data}
					key={data.id}
					onDelete={onDeletePost}
					editValue={editValue}
					isEdit={editingPostId === data.id}
					onCancel={onCancel}
					onEdit={startEdit}
					onEditChange={onEditChange}
					onUpdate={onUpdate}
				/>
			))}
		</>
	);
}

export default App;
