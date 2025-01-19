import { cn } from "~/src/utils";


export function Tag({ text, className }: { text: string, className?: string }) {
    return (
        <span className={cn("px-2 py-1 bg-primary text-sm rounded-md bg-opacity-75", className)}>
            {text}
        </span>
    )
}