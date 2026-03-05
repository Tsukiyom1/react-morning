import type { IButton } from "../../interface/IButton";
import styles from "./MyButton.module.css";

const MyButton = ({ children, type, onClick }: IButton) => {
	return (
		<button className={styles.button} type={type} onClick={onClick}>
			{children}
		</button>
	);
};

export default MyButton;
