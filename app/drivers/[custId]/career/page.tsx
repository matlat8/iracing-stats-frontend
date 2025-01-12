'use client'

import { useParams } from 'next/navigation';
import OverallStats from './(section)/OverallStats';
import IRatingChart from './(section)/iRatingChart';
import RecentEvents from './(section)/RecentEvents';
import Achievements from './(section)/Achievements';
import StatsOvertimePivot from '../reports/performance/(section)/StatsOvertimePivot';
import TopTrack from './(section)/TopTrack';

export default function CareerPage() {
    
    const { custId } = useParams<{ custId: string }>();

    // <ReportsCard custId={ Number(custId) }/>
    return (
        <div className="container mx-auto p-4">
            <div className="grid gap-6 lg:grid-cols-2">
                <div className='flex flex-col gap-4'>
                    <OverallStats cust_id={ Number(custId) }/>
                
                </div>
                <IRatingChart custId={ Number(custId) }/>
            </div>
            <div className="mt-6">
                <RecentEvents custId={ Number(custId) }/>
            </div>
            <div className='mt-6'>
                <StatsOvertimePivot custId={ Number(custId) } />
            </div>
            <div className='mt-6 grid lg:grid-cols-2 md:grid-cols-1'>
                <TopTrack custId={ Number(custId) } />
            </div>
            {false && (
            <div className="mt-6">
                <Achievements />
            </div>
            )}

      </div>
    );
}

