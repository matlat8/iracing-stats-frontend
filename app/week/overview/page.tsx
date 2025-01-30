
import LapTimeCard from "./(section)/LapTimeCard";
import { Metadata } from "next";
import WeekOverviewInfo from "./(section)/WeekOverviewInfo";

export const metadata: Metadata = {
    title: 'Week Overview',
    description: 'View the averages of the best lap times and average lap times by iRating group.',
  };


export default function WeekOverview() {
    return (
        <div className="max-w-7xl mx-auto flex flex-col justify-center items-center px-2">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <WeekOverviewInfo />
                <LapTimeCard />

            </div>
        </div>
    )
}