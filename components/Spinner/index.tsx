import { ClassValue } from "clsx";
import { cn } from "~/src/utils";
import "./index.css";
import { JSX } from "react";

interface Props {

	/**
	 * Additional class names to apply to the spinner.
	 */
	className?: ClassValue;

	/**
	 * Color of the button
	 * @default "neutral"
	 */
	color?: "primary" | "neutral" | "error" | "warning" | "success";

	/**
	 * Size of the button (this can be overridden by className)
	 * @default "large"
	 */
	size?: "small" | "medium" | "large";
	
}

export function Spinner({ className, color = "neutral", size = "large" }: Props): JSX.Element {

	// Record of classnames to apply based on props
	const classes = cn({
		"stroke-gray-800 dark:stroke-gray-200": color === "neutral",
		"stroke-primary": color === "primary",
		"stroke-error": color === "error",
		"stroke-warning": color === "warning",
		"stroke-success": color === "success"
	});

	return (
		<svg
			className={ cn("spinner aspect-square", {
				"w-6": size === "small",
				"w-9": size === "medium",
				"w-auto max-w-[48px]": size === "large",
			}, className) }
			viewBox="0 0 50 50">
			<circle
				className={ cn("path", classes, className) }
				cx="25"
				cy="25"
				fill="none"
				r="20"
				shapeRendering="geometricPrecision"
				strokeWidth="5" />
		</svg>
	);
	
}