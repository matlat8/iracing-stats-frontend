import SeriesInformationCard from "./(section)/SeriesInformationCard";
import SeriesParticiationChartCard from "./(section)/SeriesParticipationChartCard";
import SeriesParticipationThisWeekTableCard from "./(section)/SeriesParticipationThisWeekTableCard";

export default function Series() {
    return (
        <div className="container mx-auto p-4">
            <div className="grid xl:grid-cols-2 lg:grid-cols-1 w-full gap-4">
                <SeriesInformationCard />
                <SeriesParticipationThisWeekTableCard />
            </div>
            <div className="w-full pt-4">
                <SeriesParticiationChartCard />
            </div>
        </div>
    )
}