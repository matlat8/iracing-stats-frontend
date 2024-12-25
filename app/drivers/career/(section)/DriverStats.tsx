import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "~/components/ui/skeleton";
import { AiOutlinePercentage } from "react-icons/ai";
import { IoCalendarNumber } from "react-icons/io5";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";
import Divider from "~/components/Divider";


interface UserStatsProps {
    cust_id: number;
}

export default function DriverStats({ cust_id }: UserStatsProps) {

    const { data, isLoading } = useQuery({
        queryKey: ["/drivers/{custId}/win-rate", cust_id],
        enabled: cust_id > 0,
        queryFn: () => iRacingStatAPI.fetch(`/drivers/${cust_id}/win-rate` as "/drivers/{custId}/win-rate")
            .then(response => response && response.success && response ),
    })


    return (
        <div className="w-full flex flex-col gap-2">
            {isLoading && <Skeleton className="w-full h-full border border-gray-200" />}
            {data && (
                <WinRateCard row={{license_category: 'All Categories', ...data.all_time.all}}/>
            )}
            <div className="grid grid-cols-2 gap-2">
                {data && data.all_time.categories.map((row, index) => (
                    <WinRateCard row={row} key={index}/>
                ))}
            </div>

        </div>
    )
}

interface WinRateCardProps {
    row: iRacingStatAPI.$_RequestSchema["/drivers/{custId}/win-rate"]["all_time"]['categories'][0];
}

export function WinRateCard({ row }: WinRateCardProps) {
    return (
        <div className="bg-white rounded-md border border-gray-200 p-4 shadow-sm">
        <p className="text-center font-light">{row.license_category}</p>
        <div className="flex">
            <div className="flex items-center w-1/2">
                <AiOutlinePercentage />
                <p className="pl-1">{((row.win_rate ?? 0) * 100).toFixed(1)} Win Rate</p> 
            </div>
            <div className="flex items-center w-1/2">
                <p className="pl-1 ml-auto">{row.total_events} Total Events</p>
                <IoCalendarNumber className="ml-2 text-lg"/>
            </div>
        </div>

        <Divider className="my-2"/>

        <div>
            <div className="flex">

            </div>
        </div>
    </div>
    )
}