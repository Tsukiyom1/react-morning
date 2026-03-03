import type { IPosts } from "../../interface/IData";

const Posts = ({ body, id, title }: IPosts) => {
	return (
		<div className='post' key={id}>
			<h2>
				{id}.{title}
			</h2>
			<p>{body}</p>
		</div>
	);
};

export default Posts;
