'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { SessionOverview } from "./(section)/SessionOverview";


export default function EventOverview() {

    const searchParams = useSearchParams();
    const eventId = Number(searchParams.get('eventId'));

    return (
        <div className="flex justify-center items-center">
            <div className="max-w-6xl">
                <SessionOverview session_id={eventId} />
            </div>
        </div>
    )
}