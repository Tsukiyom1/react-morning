import {
	useCallback,
	useMemo,
	useState,
	type ChangeEvent,
	type FormEvent,
} from "react";

import Posts from "./components/posts/Posts";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import type { IPost } from "./interface/IPost";
import MySelect from "./UI/select/MySelect";
import React from "react";

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
		{ title: "aa", body: "ее изучаю JS!", id: 1 },
		{ title: "cc", body: "оо изучаю React!", id: 2 },
		{ title: "ff", body: "рр изучаю Python!", id: 3 },
		{ title: "bb", body: "фф изучаю Nest!", id: 4 },
	]);

	const [title, setTitle] = useState<string>("");
	const [body, setBody] = useState<string>("");
	const [searchQuery, setSearchQuery] = useState<string>("");

	const [editValue, setEditValue] = useState({
		title: "",
		body: "",
	});

	// map он создает массив не меняет исходный
	// sort он не создает новый массив а меняет исходный
	// spread оператор он создает копию массива

	const [editingPostId, setEditingPostId] = useState<number | null>(null);
	const [selected, setSelected] = useState<string>("");
	const sortedPosts = React.useMemo(() => {
		console.log(selected, "selected in use memo");

		return selected
			? [...data].sort((a, b) =>
					a[selected as keyof Omit<IPost, "id">].localeCompare(
						b[selected as keyof Omit<IPost, "id">],
					),
				)
			: [...data];
	}, [selected, data]);

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

	const sortPosts = (value: string) => {
		console.log(value, "value on sort posts function");

		setSelected(value);
	};

	const searchPosts = useCallback(() => {
		const query = searchQuery.toLowerCase();

		const searched = sortedPosts.filter(post => {
			const title = post.title.toLowerCase().includes(query);
			const body = post.body.toLowerCase().includes(query);

			return title || body;
		});

		return searched;
	}, [sortedPosts, searchQuery]);

	const searchedPosts = useMemo(() => searchPosts(), [searchPosts]);
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
			<MyInput
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					setSearchQuery(e.target.value);
				}}
				placeholder='Поиск...'
				type='text'
				value={searchQuery}
				name='search'
			/>
			<MySelect
				defaultValue='Сортировка по'
				onChange={sortPosts}
				options={[
					{ name: "Сортировка по названию", value: "title" },
					{ name: "Сортировка по описанию", value: "body" },
				]}
				value={selected}
			/>
			{searchedPosts.map(data => (
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
