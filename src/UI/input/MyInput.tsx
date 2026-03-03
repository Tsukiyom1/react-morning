import type { IInput } from "../../interface/IInput";
import styles from "./MyInput.module.css";
const MyInput = ({ onChange, placeholder, type, value }: IInput) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className={styles.input}
		/>
	);
};

export default MyInput;
