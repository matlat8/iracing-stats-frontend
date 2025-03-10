'use client';

import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

export default function DriverRow({ name, club, countryCode, countryImage }: {  name: string, club: string, countryCode: string, countryImage: string }) {
    return (
        <div className="flex gap-2 items-center">
            <div className="flex-shrink">
                {countryImage.length > 0 && (
                <Image
                    src={countryImage}
                    alt={countryCode}
                    width={40}
                    height={40}
                    className="rounded-lg object-cover aspect-square"
                />
                )}
                {countryImage?.length === 0 && (
                    <Skeleton className="w-[40px] h-[40px] rounded-lg" />
                )}
            </div>
            <div className="flex-grow">
                <p>{name}</p>
                <p className="text-muted-foreground text-xs">{countryCode} {club}</p>
            </div>
        </div>
    )
}