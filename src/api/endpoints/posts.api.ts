import type { IPost } from "../../interface/IPost";
import instance from "../instance";

export class PostApiService {
	static async getAllPosts() {
		try {
			const response = await instance.get("posts.json");
			console.log(response, "response from axios firebase");
			return response.data;
		} catch (error) {
			console.error("Error fetching data", error);
		}
	}

	static async createPost(post: Omit<IPost, "id">) {
		try {
			const response = await instance.post("posts.json", post);
			return response.data;
		} catch (error) {
			console.error("Error when creating data", error);
		}
	}
	static async deletePost(id: string) {
		try {
			await instance.delete(`posts/${id}.json`);
		} catch (error) {
			console.error("Error when deleting data", error);
		}
	}

	static async updatePost(id: string, post: Omit<IPost, "id">) {
		try {
			const response = await instance.post(`posts/${id}.json`, post);
			return response.data;
		} catch (error) {
			console.error("Error when updating data", error);
		}
	}
}
