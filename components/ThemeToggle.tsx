import { useTheme } from "next-themes";

import { useCallback } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { Tooltip } from "./Tooltip";
import { Icon } from "./Icon";

export function ThemeToggle() {

	const { resolvedTheme, setTheme } = useTheme();
	const isDark = resolvedTheme === "dark";

	// Toggle function
	const toggle = useCallback(() => setTheme(isDark ? "light" : "dark"), [ isDark, setTheme ]);
	
	return (
		<Tooltip className="isolate relative my-auto h-12" tooltip="Toggle Theme">
			<Icon
				aria-label="Toggle theme"
				icon={ isDark ? IoMdMoon : IoMdSunny }
				onClick={ toggle } />
		</Tooltip>
	);
}