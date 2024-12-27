'use client'

import { Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import OverallStats from './(section)/OverallStats';
import IRatingChart from './(section)/iRatingChart';
import RecentEvents from './(section)/RecentEvents';
import Achievements from './(section)/Achievements';

function CareerPageContent() {
    const searchParams = useSearchParams();
    const custId = Number(searchParams.get('cust_id'));
    const router = useRouter();


    // Check if cust_id exists
    if (!custId) {
        // Redirect to '/'
        router.push('/');
        return null;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid gap-6 lg:grid-cols-2">
                <OverallStats cust_id={custId}/>
                <IRatingChart custId={custId}/>
            </div>
            <div className="mt-6">
                <RecentEvents custId={custId}/>
            </div>
            <div className="mt-6">
                <Achievements />
            </div>
      </div>
    );
}

export default function CareerPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CareerPageContent />
        </Suspense>
    );
}

