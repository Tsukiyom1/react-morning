import React from "react";

const Header = ({
	name,
	surname,
	age,
}: {
	name: string;
	surname: string;
	age: number;
}) => {
	return (
		<div>
			Добро пожаловать, {name}! {surname}, {age}
		</div>
	);
};

export default Header;
