import type { ReactNode } from "react";

export interface IButton {
	type: "button" | "reset" | "submit";
	children: ReactNode;
}
