import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPosts } from "../../features/postSlice";

const Auth = () => {
	const postsaaa = useAppSelector(state => {
		return state.post.posts;
	});
	const dispatch = useAppDispatch();
	console.log(postsaaa, "posts from store");

	React.useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<div>
			<input type='text' />
			<input type='password' />
		</div>
	);
};

export default Auth;
