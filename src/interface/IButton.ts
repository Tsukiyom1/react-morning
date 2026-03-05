import type { MouseEvent, ReactNode } from "react";
export interface IButton {
	type: "button" | "reset" | "submit";
	children: ReactNode;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
