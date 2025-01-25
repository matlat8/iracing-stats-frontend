
import LapTimeCard from "./(section)/LapTimeCard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Week Overview',
    description: 'View the averages of the best lap times and average lap times by iRating group.',
  };


export default function WeekOverview() {
    return (
        <div className="max-w-7xl mx-auto flex flex-col justify-center items-center px-2">
            <LapTimeCard />
        </div>
    )
}