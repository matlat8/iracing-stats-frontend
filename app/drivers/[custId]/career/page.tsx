'use client'

import { useParams } from 'next/navigation';
import OverallStats from './(section)/OverallStats';
import IRatingChart from './(section)/iRatingChart';
import RecentEvents from './(section)/RecentEvents';
import Achievements from './(section)/Achievements';
import StatsOvertimePivot from '../reports/performance/(section)/StatsOvertimePivot';
import TopTrack from './(section)/TopTrack';
import AvgPositionScatter from './(section)/AvgPositionScatter';
import LicenseAvgPositionChart from './(section)/LicenseAvgPositionChart';
import PositionTable from './(section)/PositionTable';



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
            <div className='mt-6 grid xl:grid-cols-2 lg:grid-cols-1 gap-6'>
                <div className='xl:col-span-2 pt-12'>
                    <h1 className='text-3xl'>Finishing Position</h1>
                    <p className='text-muted-foreground'>Consistency wins championships and helps the iR go brrr. Gain deeper insight into how consistantly X is finishing each race. Drill down by different license categories.</p>
                </div>
                <PositionTable />
                <AvgPositionScatter />
                <div className='xl:col-span-2'>
                    <LicenseAvgPositionChart custId={ Number(custId) } />
                </div>
            </div>
            <div className='mt-6'>
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

