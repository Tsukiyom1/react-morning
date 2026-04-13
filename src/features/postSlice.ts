import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IPost } from "../interface/IPost";
import instance from "../api/instance";

interface IState {
	posts: IPost[];
	isLoading: boolean;
	error: Error | null;
}

const initialState: IState = {
	posts: [],
	isLoading: false,
	error: null,
};

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
	try {
		const response = await instance.get("posts.json");
		const postResponse = response.data;
		const data = Object.keys(postResponse).map(value => {
			return {
				id: value,
				...postResponse[value],
			};
		});

		return data;
	} catch (error) {
		console.error("Error fetching data", error);
	}
});
const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getPosts.pending, state => {
				state.isLoading = true;
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.posts = action.payload as IPost[];
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error as Error;
			});
	},
});

export const postReducer = postSlice.reducer;
