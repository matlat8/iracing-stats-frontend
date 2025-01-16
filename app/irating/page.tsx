'use client';

import IRatingDistributionChart from "./(section)/DistributionChart";
import DistributionKPIs from "./(section)/DistributionKPIs";
import FiltersCard from "./(section)/FiltersCard";

export default function iRatingPage() {
    return (
        <div className="container mx-auto p-4 flex flex-col gap-4">
            <FiltersCard />

            <DistributionKPIs />
            
            <IRatingDistributionChart />
        </div>
    )
}