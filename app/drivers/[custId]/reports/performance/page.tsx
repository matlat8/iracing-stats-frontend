'use client';

import { useParams } from "next/navigation";
import StatsOvertimePivot from "./(section)/StatsOvertimePivot";

export default function PerformanceReport() {

    const { custId } = useParams<{ custId: string }>();

    return (
        <div className='container mx-auto p-4'>
            <StatsOvertimePivot custId={ Number(custId) }/>
        </div>
    )
}