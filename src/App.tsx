// import { useState } from "react";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { IPosts } from "./interface/IData";
import Posts from "./components/posts/Posts";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

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
	const [data, setData] = useState<IPosts[]>([
		{ title: "Js", body: "Я изучаю JS!", id: 1 },
		{ title: "React", body: "Я изучаю React!", id: 2 },
		{ title: "Python", body: "Я изучаю Python!", id: 3 },
	]);

	const [title, setTitle] = useState<string>("");
	const [body, setBody] = useState<string>("");

	const onChangeBody = (e: ChangeEvent<HTMLInputElement>) => {
		setBody(e.target.value);
	};
	const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const addNewPost = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newPosts: IPosts = {
			body: body,
			title: title,
			id: Date.now(),
		};

		setData([...data, newPosts]);
		setBody("");
		setTitle("");
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
				<Posts id={data.id} title={data.title} body={data.body} key={data.id} />
			))}
		</>
	);
}

export default App;
