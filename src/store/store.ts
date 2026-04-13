import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "../features/postSlice";

const store = configureStore({
	reducer: {
		post: postReducer,
	},
});

console.log(store.getState(), " store getState");

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
