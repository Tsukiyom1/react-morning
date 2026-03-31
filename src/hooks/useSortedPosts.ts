import React from "react";
import type { IPost } from "../interface/IPost";

//1.кастомные хуки должны называться через use
//2.хук должен что то возвращать
//3.у кастомного хука должен использовать хуки реакта такие как useState useMemo и т.д
export const useSortedPosts = (posts: IPost[], selected: string) => {
	const sortedPosts = React.useMemo(() => {
		if (!selected) {
			return [...posts];
		}

		return [...posts].sort((a, b) =>
			a[selected as keyof Omit<IPost, "id">].localeCompare(
				b[selected as keyof Omit<IPost, "id">],
			),
		); // Omit это utility types в typescript
	}, [posts, selected]);

	return sortedPosts;
};
