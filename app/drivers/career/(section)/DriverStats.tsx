import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "~/components/ui/skeleton";
import { AiOutlinePercentage } from "react-icons/ai";
import { IoCalendarNumber } from "react-icons/io5";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";


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
        <div className="w-full">
            {isLoading && <Skeleton className="w-full h-full border border-gray-200" />}
            {data && (
                <div className="bg-white rounded-md border border-gray-200 p-4">
                    <p className="text-center font-light">All Categories</p>
                    <div className="flex">
                        <div className="flex items-center w-1/2">
                            <AiOutlinePercentage />
                            <p className="pl-1 font-bold">{data.all_time.all.win_rate} Win Rate</p> 
                        </div>
                        <div className="flex items-center font-bold w-1/2">
                            <p className="pl-1 ml-auto">{data.all_time.all.total_events} Total Events</p>
                            <IoCalendarNumber className="ml-2 text-lg"/>
                        </div>
                    </div>

                
                </div>
            )}
        </div>
    )
}