import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "~/components/ui/skeleton";
import { AiOutlinePercentage } from "react-icons/ai";
import { IoCalendarNumber } from "react-icons/io5";
import { FaTrophy } from "react-icons/fa";
import { PiMedalBold } from "react-icons/pi";
import { FaFireAlt } from "react-icons/fa";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";
import Divider from "~/components/Divider";
import Error from "~/components/Error";


interface UserStatsProps {
    cust_id: number;
}

export default function DriverStats({ cust_id }: UserStatsProps) {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["/drivers/{custId}/win-rate", cust_id],
        enabled: cust_id > 0,
        queryFn: () => iRacingStatAPI.fetch(`/drivers/${cust_id}/win-rate` as "/drivers/{custId}/win-rate")
            .then(response => response && response.success && response ),
    })


    return (
        <div className="w-full flex flex-col gap-2">
            {isError && <Error message="Error fetching driver stats" className="w-full"/>}
            {isLoading && <Skeleton className="w-full h-full border border-gray-200" />}
            {data && (
                <WinRateCard 
                    row={{license_category: 'All Categories', ...data.all_time.all}}
                    showLabels={true}
                    />
            )}
            <div className="grid grid-cols-3 gap-2">
                {data && data.all_time.categories.map((row, index) => (
                    <WinRateCard row={row} key={index} showLabels={false}/>
                ))}
            </div>

        </div>
    )
}

interface WinRateCardProps {
    row: iRacingStatAPI.$_RequestSchema["/drivers/{custId}/win-rate"]["all_time"]['categories'][0];

    // Toggle if labels should be shown
    showLabels: boolean;
}

export function WinRateCard({ row, showLabels }: WinRateCardProps) {
    return (
        <div className="bg-white rounded-md border border-gray-200 p-4 shadow-sm">
        <p className="text-center font-light pb-1">{row.license_category}</p>
        <div className="flex">
            <div className="flex items-center w-1/2">
                <AiOutlinePercentage className="text-gray-500"/>
                <p className="pl-1">{((row.win_rate ?? 0) * 100).toFixed(1)} {showLabels ? 'Win Rate' : ''}</p> 
            </div>
            <div className="flex items-center w-1/2">
                <p className="pl-1 ml-auto">{row.total_events} {showLabels ? 'Total Events' : ''}</p>
                <IoCalendarNumber className="ml-2 text-lg text-gray-500"/>
            </div>
        </div>

        <Divider className="my-2"/>

        <div className="flex justify-between">
            <div className="flex items-center">
                <FaTrophy className="mr-2 text-amber-400"/>
                <p>{row.wins} {showLabels ? 'Wins' : ''}</p>
            </div>
            <div className="flex items-center text-center">
                <PiMedalBold className="mr-2 text-gray-500"/>
                <p>{row.top_3} {showLabels ? "Top-3's" : ''}</p>
            </div>
            <div className="flex items-center">
                <FaFireAlt  className="mr-2 text-red-500"/>
                <p>{row.top_5} {showLabels ? "Top-5's" : ''}</p>
            </div>
        </div>
    </div>
    )
}