import { Metadata } from "next";
import IRatingDistributionChart from "./(section)/DistributionChart";
import DistributionKPIs from "./(section)/DistributionKPIs";
import FiltersCard from "./(section)/FiltersCard";
import DistributionAbout from "./(section)/DistributionAbout";

export const metadata: Metadata = {
    title: 'iRating Distribution | iRacing Stat',
    description: 'View the distribution of iRating across the platform. Filter by specific licenses and time periods.',
    keywords: ['iracing irating distribution', 'iracing distribution']
}

export default function iRatingPage() {
    return (
        <div className="container mx-auto p-4 flex flex-col gap-4">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
                <DistributionAbout />
                <FiltersCard />
            </div>

            <DistributionKPIs />

            <IRatingDistributionChart />
        </div>
    )
}

