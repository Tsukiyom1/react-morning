import type { IButton } from "../../interface/IButton";
import styles from "./MyButton.module.css";

const MyButton = ({ children, type }: IButton) => {
	return (
		<button className={styles.button} type={type}>
			{children}
		</button>
	);
};

export default MyButton;
