import { AiFillFrown } from "react-icons/ai";

interface ErrorProps {
    message: string;
    className: string;
}

export default function Error({ message }: ErrorProps) {
    return (
        <div className="border border-red-500 bg-slate-50 w-full h-full flex rounded-md shadow-md shadow-red-300">
            <div className="p-16 flex items-center gap-4">
                <AiFillFrown className="text-red-500 text-[48px]"/>
                <p className="text-red-500">{message}</p>
            </div>
        </div>
    )
}