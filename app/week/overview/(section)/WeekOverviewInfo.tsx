'use client';

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { useQueryParam } from "~/src/hooks";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";


export default function WeekOverviewInfo() {
    const [weekNum, setWeekNum] = useQueryParam<number>("weekNum", 0);
    const [seasonId, ] = useQueryParam<string>("seasonId", "");

    const { data } = useQuery({
        queryKey: ['seasons/{seasonId}'],
        queryFn: () => iRacingStatAPI.fetch(`/seasons/${seasonId}` as "/seasons/{seasonId}")
                        .then(response => response.success && response.data),
    })

    return (
        <Card className="h-full">
            {data && (
            <CardContent>
                    <h2 className="text-2xl">{data.series_name}</h2>
                    <h2 className="text-3xl">Week { weekNum + 1 }</h2>
                    <p className="text-lg">View the averages of the best lap times and average lap times by iRating group.</p>

            </CardContent>
            )}
            <CardFooter>
                <div className="flex justify-between w-full mt-auto">
                    <Button variant={'outline'} onClick={() => setWeekNum(weekNum - 1)}>
                        <FaArrowLeft />
                    </Button>
                    <Link href={`/series/${seasonId}`}>
                        <Button variant={'ghost'}>
                            Back to Series
                        </Button>
                    </Link>
                    <Button variant={'outline'} onClick={() => setWeekNum(weekNum + 1)}>
                        <FaArrowRight />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}