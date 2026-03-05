import type { IInput } from "../../interface/IInput";
import styles from "./MyInput.module.css";
const MyInput = ({ onChange, placeholder, type, value, name }: IInput) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className={styles.input}
			name={name}
		/>
	);
};

export default MyInput;
