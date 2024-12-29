'use client'

import { useSearchParams } from "next/navigation";
import { SessionOverview } from "./(section)/SessionOverview";
import { Suspense } from "react";


function EventOverviewContent() {

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

export default function EventOverview() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EventOverviewContent />
        </Suspense>
    );
}