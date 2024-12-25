import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "~/components/ui/skeleton";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";


interface UserInfoProps {
    cust_id: number;
}

export default function UserInfo({ cust_id }: UserInfoProps) {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["/drivers", cust_id],
        enabled: cust_id > 0,
        queryFn: () => iRacingStatAPI.fetch(`/drivers/${cust_id}` as "/drivers/{custId}")
            .then(response => response && response.success && response ),
    })

    return (
        <div className='w-full flex flex-col gap-2'>

            <div className='bg-white rounded-md p-4 border border-gray-200 shadow-sm'>
                {isLoading && <Skeleton className='w-full h-full'/>}
                {isError && <p>Error</p>}
                {data && 
                <div className='text-center py-16'>
                    <p className='font-bold text-2xl'>{data.information.display_name}</p>
                    <p>{data.information.club_name} {data.information.country_code}</p>
                </div>
                }
            </div>
            {isLoading && <Skeleton className='w-full h-16 border border-gray-200'/>}

            {isError && (
            <div className='bg-white border-red-500 rounded-md w-full p-8'>
                <p className='text-center'>Error: {error.message}</p>
            </div>
            )}

            {data && (
            <div className='bg-white rounded-md p-4 flex border border-gray-200 justify-between shadow-sm'>
                <div>
                    <p>Road</p>
                    <p>{data.information.road_rating || 1350}</p>
                </div>
                <div>
                    <p>Oval</p>
                    <p>{data.information.oval_rating || 1350}</p>
                </div>
                <div>
                    <p>Dirt Oval</p>
                    <p>{data.information.dirt_oval_rating || 1350}</p>
                </div>
                <div>
                    <p>Dirt Road</p>
                    <p>{data.information.dirt_road_rating || 1350}</p>
                </div>
                <div>
                    <p>Sports Car</p>
                    <p>{data.information.sports_car_rating || 1350}</p>
                </div>
                <div>
                    <p>Formula Car</p>
                    <p>{data.information.formula_car_rating || 1350}</p>
                </div>
            </div>
            )}
        </div>
    );
}