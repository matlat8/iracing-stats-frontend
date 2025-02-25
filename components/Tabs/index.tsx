"use client";

import { useResize } from "~/hooks/nextuiHooks";
import { Children, createContext, useCallback, useEffect, useLayoutEffect, useRef, useState, type Dispatch, type PropsWithChildren, type RefObject, type SetStateAction } from "react";
export { Tab } from "./Tab";

export const TabsContext = createContext<{
	indicator: RefObject<HTMLDivElement | null> | null,
	background: RefObject<HTMLDivElement | null> | null,
	selected: number,
	setSelected: Dispatch<SetStateAction<number>>
}>({
	indicator: null,
	background: null,
	selected: -1,
	setSelected: () => {}
});

export const KeyContext = createContext(-1);

export function Tabs({ children, defaultSelected = -1 }: PropsWithChildren<{ defaultSelected?: number }>) {
	const indicator = useRef<HTMLDivElement>(null);
	const background = useRef<HTMLDivElement>(null);
	const items = useRef<HTMLUListElement>(null);
	const [ selected, setSelected ] = useState(defaultSelected);

	const onMouseLeave = useCallback(function(event: React.MouseEvent<HTMLUListElement, MouseEvent>) {
		const slider = background.current;
		const target = event.target as HTMLUListElement;
		if (!slider || !target) return;
		slider.style.transitionProperty = "opacity";
		slider.style.opacity = "0";
		slider.addEventListener("transitionend", function() {
			slider.style.left = "auto";
			slider.style.right = "auto";
		}, { once: true });
	}, []);

	const redraw = useCallback(function() {
		if (!indicator.current || !items.current) return;
		const slider = indicator.current;
		const target = items.current.querySelector(":nth-child(" + (selected + 1) + ")") as HTMLLIElement;
		if (!target) return;
		slider.style.left = `${ target.offsetLeft }px`;
		slider.style.right = `${ slider.parentElement!.offsetWidth - target.offsetLeft - target.offsetWidth }px`;
		slider.addEventListener("transitionend", function() {
			slider.style.opacity = "1";
		}, { once: true });
	}, [ selected ]);

	useLayoutEffect(() => void requestAnimationFrame(redraw), [ redraw, selected, children ]);
	useResize(redraw);
	
	useEffect(() => setSelected(defaultSelected), [ defaultSelected ]);

	return (
		<TabsContext.Provider value={{ indicator, background, selected, setSelected }}>
			<div className="relative isolate">
				<div
					className="absolute rounded bg-primary/10 pointer-events-none transition-[left,right,opacity] -z-10"
					ref={ background } />
				<div
					className="absolute bg-primary dark:bg-primary-300 pointer-events-none h-0.5 transition-[left,right,opacity] -bottom-[1px] -mb-2 mx-3"
					ref={ indicator } />
				<ul
					className="flex items-center gap-2 group my-2"
					onMouseLeave={ onMouseLeave }
					ref={ items }>
					{ Children.map(children, (child, key) => <KeyContext.Provider
						key={ key }
						value={ key }>
						{ child }
					</KeyContext.Provider>) }
				</ul>
			</div>
		</TabsContext.Provider>
	);
}