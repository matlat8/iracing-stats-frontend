'use client'

import { useParams } from 'next/navigation';
import OverallStats from './(section)/OverallStats';
import IRatingChart from './(section)/iRatingChart';
import RecentEvents from './(section)/RecentEvents';
import Achievements from './(section)/Achievements';
import ReportsCard from './(section)/ReportsCard';

export default function CareerPage() {
    
    const { custId } = useParams<{ custId: string }>();

    // Check if cust_id exists
    // if (!Number(router.query.custId) ) {
    //     // Redirect to '/'
    //     router.push('/');
    //     return null;
    // }

    return (
        <div className="container mx-auto p-4">
            <div className="grid gap-6 lg:grid-cols-2">
                <div className='flex flex-col gap-4'>
                    <OverallStats cust_id={ Number(custId) }/>
                    <ReportsCard custId={ Number(custId) }/>
                </div>
                <IRatingChart custId={ Number(custId) }/>
            </div>
            <div className="mt-6">
                <RecentEvents custId={ Number(custId) }/>
            </div>
            {false && (
            <div className="mt-6">
                <Achievements />
            </div>
            )}

      </div>
    );
}

