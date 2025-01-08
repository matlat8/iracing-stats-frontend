import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";


export function useQueryParam<T = string | number | undefined | boolean>(key: string, defaultValue?: T): readonly [ T, (value: T) => void ] {

	const unparsed = useSearchParams().get(key);
	
	const value = useMemo(function() {
		if (unparsed?.toLowerCase() === "true") return true;
		if (unparsed?.toLowerCase() === "false") return false;
		if (!isNaN(Number(unparsed)) && Number(unparsed) <= 1e10 && typeof unparsed === "string") return Number(unparsed);
		return unparsed ?? defaultValue;
	}, [ defaultValue, unparsed ]);

	const setter = useCallback(function(value: T) {
		const url = new URL(window.location.href);
		if (value === defaultValue) url.searchParams.delete(key);
		else url.searchParams.set(key, String(value));
		window.history.replaceState({}, "", url.toString().replace(/%2C/g, ","));
	}, [ defaultValue, key ]);

	return [ value as T, setter ] as const;
	
}