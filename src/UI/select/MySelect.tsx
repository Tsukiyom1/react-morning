import { type ChangeEvent } from "react";
import type { ISelectProps } from "../../interface/ISelectProps";

const MySelect = ({ defaultValue, onChange, options, value }: ISelectProps) => {
	console.log(value, "value");
	console.log(options, "options");

	return (
		<select
			value={value}
			onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
		>
			<option disabled={true} value=''>
				{defaultValue}
			</option>
			{options.map(option => (
				<option key={option.name} value={option.value}>
					{option.name}
				</option>
			))}
		</select>
	);
};

export default MySelect;
