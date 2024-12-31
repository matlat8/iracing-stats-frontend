'use client'

import { useSearchParams } from "next/navigation";
import { SessionOverview } from "./(section)/SessionOverview";
import { Suspense } from "react";
import SessionResults from "./(section)/SessionResults";


function EventOverviewContent() {

    const searchParams = useSearchParams();
    const eventId = Number(searchParams.get('eventId'));

    return (
            <div className="flex flex-col justify-center items-center max-w-7xl mx-auto px-2">
                <div className="w-6xl">
                    <SessionOverview session_id={eventId} />
                </div>
                <div className="pt-4 w-full">
                    <SessionResults sessionId={eventId} />
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