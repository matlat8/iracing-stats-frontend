import Link from "next/link";


export default function Footer() {
    return (
        <div className="p-32 flex flex-col justify-center items-center">
            <hr className="border-t-2 border-gray-200 dark:border-gray-800 w-full py-4" />
            <div className="grid grid-cols-3">
                <div>
                    <ul>
                        <li>
                            <Link href="/">
                                <p className="text-muted-foreground">Home</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col min-w-64 justify-center items-center">
                    <ul>
                        <li>
                            <Link href="/about">
                                <p className="text-muted-foreground">About</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col min-w-32 justify-center items-center">

                </div>
            </div>
        </div>
    )
}