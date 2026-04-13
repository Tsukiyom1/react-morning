import { Link } from "react-router-dom";
import styles from "./Header.module.css";
const Header = () => {
	return (
		<div className={styles.header}>
			<nav className={styles.nav}>
				<ul>
					<Link to={"/login"}>Авторизация</Link>
				</ul>

				<ul>
					<Link to={"/about"}>О нас</Link>
				</ul>
				<ul>
					<Link to={"/posts"}>Посты</Link>
				</ul>
			</nav>
		</div>
	);
};

export default Header;
