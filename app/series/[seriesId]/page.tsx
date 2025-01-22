import ASeriesInfoCard from "./(section)/ASeriesInfoCard";
import SeriesSeasonParticipationChart from "./(section)/SeriesSeasonParticipationChart";
import WeekSelection from "./(section)/WeekSelection";


export default function SeriesOverview() {
    return (
        <div className="max-w-7xl mx-auto flex flex-col justify-center items-center px-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                <div className="grid grid-cols-1">
                    <ASeriesInfoCard />

                </div>
                <SeriesSeasonParticipationChart />
            </div>
            <WeekSelection />
        </div>
    )
}