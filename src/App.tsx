import React, { useMemo, type ChangeEvent, type FormEvent } from "react";
import { useState } from "react";
import Posts from "./components/posts/Posts";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
import { useSortedPosts } from "./hooks/useSortedPosts";
import type { IComment } from "./interface/IComment";
import type { IPost } from "./interface/IPost";
import { PostApiService } from "./api/endpoints/posts.api";
import { CommentApiService } from "./api/endpoints/comments.api";
import MyModal from "./components/modal/MyModal";

function App() {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [comments, setComments] = useState<IComment[]>([]);
	const [change, setChange] = useState({
		title: "",
		body: "",
	});
	const [editValue, setEditValue] = useState({
		title: "",
		body: "",
	});
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [editingPostId, setEditingPostId] = useState<string | null>(null);
	const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
	const [selected, setSelected] = useState<string>("");
	const [modal, setModal] = useState<boolean>(false);
	const [commentValue, setCommentValue] = useState<string>("");
	const sorted = useSortedPosts(posts, selected);

	console.log(comments);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const postResponse = await PostApiService.getAllPosts();
				const commentResponse = await CommentApiService.getAllComments();

				if (postResponse) {
					const data = Object.keys(postResponse).map(value => {
						return {
							id: value,
							...postResponse[value],
						};
					});

					setPosts(data);
				} else {
					setPosts([]);
				}

				if (commentResponse) {
					const data = Object.keys(commentResponse).map(value => {
						return {
							id: value,
							...commentResponse[value],
						};
					});

					setComments(data);
				} else {
					setComments([]);
				}
			} catch (error) {
				console.error("Error when getting data", error);
			}
		};

		fetchData();
	}, []);

	const addNewPost = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const postData = {
				body: change.body,
				title: change.title,
			};

			const postId = await PostApiService.createPost(postData);
			console.log(postId, "post id");

			const newPost: IPost = {
				id: postId,
				title: change.title,
				body: change.body,
			};

			setPosts([...posts, newPost]);

			setChange({
				title: "",
				body: "",
			});

			setModal(!modal);
		} catch (error) {
			console.error("Error when creating post:", error);
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setChange(prev => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const onDeletePost = async (id: string) => {
		try {
			await PostApiService.deletePost(id);
			setPosts(
				posts.filter(post => {
					return post.id !== id;
				}),
			);
		} catch (error) {
			console.error("Error when deleting post", error);
		}
	};

	const startEdit = (post: IPost) => {
		setEditingPostId(post.id);
		setEditValue({ title: post.title, body: post.body });
	};

	const cancelEdit = () => {
		setEditingPostId(null);
	};

	const onEditChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setEditValue(prev => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const onUpdatePost = async (id: string) => {
		try {
			const updateData = {
				title: editValue.title,
				body: editValue.body,
			};
			await PostApiService.updatePost(id, updateData);
			setPosts(
				posts.map(post => {
					return post.id === id
						? { ...post, title: editValue.title, body: editValue.body }
						: post;
				}),
			);
			setEditingPostId(null);
		} catch (error) {
			console.error("Error when updating post", error);
		}
	};

	const onAddComment = async (postId: string, text: string) => {
		const commentData = {
			text: text,
			postId: postId,
		};

		const commentId = await CommentApiService.createComment(commentData);

		const newComment: IComment = {
			id: commentId,
			text: text,
			postId: postId,
		};

		setComments([...comments, newComment]);
	};

	const onDeleteComment = async (id: string) => {
		try {
			await CommentApiService.deleteComment(id);
			setComments(
				comments.filter(comment => {
					return comment.id !== id;
				}),
			);
		} catch (error) {
			console.error("Error when deleting post", error);
		}
	};

	const sortPosts = (sort: string) => {
		setSelected(sort);
	};

	const searchPosts = () => {
		if (searchQuery === "") {
			return sorted;
		}

		const query = searchQuery.toLowerCase();

		const filtered = sorted.filter(post => {
			const title = post.title.toLowerCase().includes(query);
			const body = post.body.toLowerCase().includes(query);

			return title || body;
		});

		return filtered;
	};

	const onEditCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCommentValue(e.target.value);
	};

	const onEditComment = (comment: IComment) => {
		setEditingCommentId(comment.id);
		setCommentValue(comment.text);
	};

	const onCommentEditCancel = () => {
		setEditingCommentId(null);
		setCommentValue("");
	};

	const onUpdateComment = async (id: string, text: string) => {
		try {
			const comment = comments.find(com => com.id === id);
			console.log(comment, "comment ");
			if (!comment) {
				throw new Error("Comment not found");
			}

			const commentData = {
				postId: comment.postId,
				text: text,
			};

			await CommentApiService.updateComment(id, commentData);

			setComments(
				comments.map(comm => {
					console.log(comm, "comm");

					return comm.id === id ? { ...comm, text: text } : comm;
				}),
			);
			setEditingCommentId(null);
			setCommentValue("");
		} catch (error) {
			console.error("Error updating comment", error);
		}
	};

	const filteredPosts = useMemo(() => searchPosts(), [searchPosts]);
	return (
		<React.Fragment>
			<MyButton
				children='Создать пост'
				type='button'
				onClick={() => setModal(!modal)}
			/>
			<MyModal setVisible={setModal} visible={modal}>
				<h2 style={{ textAlign: "center" }}>Создайте пост!</h2>
				{/* это является управляемым компонентом */}
				<form onSubmit={addNewPost}>
					<MyInput
						name='title'
						onChange={onChange}
						placeholder='Введите заголовок'
						type='text'
						value={change.title}
					/>
					<MyInput
						name='body'
						onChange={onChange}
						placeholder='Введите текст'
						type='text'
						value={change.body}
					/>
					<MyButton type='submit' children='Отправить' />
				</form>
			</MyModal>

			<h2>Посты</h2>
			<div>
				<MyInput
					name='search'
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setSearchQuery(e.target.value)
					}
					type='text'
					value={searchQuery}
					placeholder='Поиск...'
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
			</div>
			{filteredPosts.length === 0 ? (
				<div>Постов не обнаружено</div>
			) : (
				filteredPosts.map((post, index) => (
					<Posts
						posts={post}
						key={index}
						onDelete={onDeletePost}
						editValue={editValue}
						onCancel={cancelEdit}
						onEdit={startEdit}
						onEditChange={onEditChange}
						onUpdate={onUpdatePost}
						isEdit={editingPostId === post.id}
						comments={comments}
						editCommentValue={commentValue}
						editingCommentId={editingCommentId}
						onAddComment={onAddComment}
						onCommentEditCancel={onCommentEditCancel}
						onDeleteComment={onDeleteComment}
						onEditComment={onEditComment}
						onEditCommentChange={onEditCommentChange}
						onUpdateComment={onUpdateComment}
					/>
				))
			)}
		</React.Fragment>
	);
}

export default App;
