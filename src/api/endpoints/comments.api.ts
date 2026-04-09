import type { IComment } from "../../interface/IComment";
import instance from "../instance";

export class CommentApiService {
	static async getAllComments() {
		try {
			const response = await instance.get("comments.json");
			return response.data;
		} catch (error) {
			console.error("Error fetching comments", error);
		}
	}

	static async createComment(comment: Omit<IComment, "id">) {
		try {
			const response = await instance.post("comments.json", comment);
			return response.data.name;
		} catch (error) {
			console.error("Error deleting comments", error);
		}
	}

	static async deleteComment(id: string) {
		try {
			await instance.delete(`comments/${id}.json`);
		} catch (error) {
			console.error("Error deleting comments", error);
		}
	}

	static async updateComment(id: string, comment: Omit<IComment, "id">) {
		try {
			await instance.put(`comments/${id}.json`, comment);
		} catch (error) {
			console.error("Error updating comments", error);
		}
	}
}
