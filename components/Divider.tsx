import { cn } from "~/src/utils";


interface DividerProps {
    className?: string;
}

export default function Divider({ className }: DividerProps) {
    return (
        <hr className={cn("border-t border-gray-200", className)} />
    )
}