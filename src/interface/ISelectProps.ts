export interface ISelectProps {
	value: string;
	onChange: (value: string) => void;
	defaultValue: string;
	options: Array<{ value: string; name: string }>;
}
