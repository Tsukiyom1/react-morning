export interface IInput {
	placeholder: string;
	name?: string;
	value: string;
	type: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // void это типизация функции и он говорит о том что функция ничего не должен возвращать
}
