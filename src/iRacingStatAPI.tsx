"use client";

export class iRacingStatAPI {

	public static URL(path: string): string {
        console.log('Environment:', process.env.NEXT_PUBLIC_NODE_ENV);
		//if (path.startsWith("http")) return path;
        if (process.env.NEXT_PUBLIC_NODE_ENV === "development") return `http://localhost:8000${ path }`;
        if (process.env.NEXT_PUBLIC_NODE_ENV === "test") return `https://beta.api.iracingstat.com${ path }`;
        if (process.env.NEXT_PUBLIC_NODE_ENV === "production") return `https://api.iracingstat.com${ path }`;
        
            // if all else fails, return the production URL
		return `https://api.iracingstat.com${ path }`;
	}
	
	public static async fetch<T extends keyof iRacingStatAPI.$_RequestSchema>(path: T | `${ T }?${ string }`, init?: RequestInit): Promise<iRacingStatAPI.Response<iRacingStatAPI.$_RequestSchema[T]>> {
		const response = await this.fetchRaw(path, init);
		const json = await response.json();
		return {
			success: response.ok,
			...json,
		};
	}

	public static async fetchRaw<T extends keyof iRacingStatAPI.$_RequestSchema>(path: T | `${ T }?${ string }`, init?: RequestInit) {
		return window.fetch(this.URL(path as string), {
			...init,
			credentials: "include",
		});
	}

}