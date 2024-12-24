import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { sha256 } from "./sha256";

/**
 * Combine tailwind classes with clsx and tailwind-merge
 * @param inputs - tailwind classes
 * @returns - Combined classes
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * Create a style tag with the given CSS.
 * @type This is a tagged template literal function.
 * @param strings - Template strings
 * @returns - Style tag
 */
export const css = (strings: TemplateStringsArray, ...values: Array<string | number>) => <style>{ String.raw(strings, ...values) }</style>;

export function hash(obj: object | string) {
	obj = typeof obj === "string" ? obj : JSON.stringify(obj);
	return sha256(obj)
		.substring(0, 36)
		.toUpperCase();
}

export function rgba(color: string, alpha: number) {
	const [ r, g, b ] = color.match(/\w\w/g)!.map(a => parseInt(a, 16));
	return `rgba(${ r }, ${ g }, ${ b }, ${ alpha })`;
}

export function slug(str: string) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}