'use client';

import { format } from 'date-fns';
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { useQueryParam } from "~/src/hooks";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";
import { Skeleton } from '~/components/ui/skeleton';
import ImageCircle from '~/components/ImageCircle';
import { useAutoAnimate } from '@formkit/auto-animate/react';


export default function WeekOverviewInfo() {
    const [weekNum, setWeekNum] = useQueryParam<number>("weekNum", 0);
    const [seasonId, ] = useQueryParam<string>("seasonId", "");
    const [seriesId, ] = useQueryParam<string>("seriesId", "");

    const { data, isFetching } = useQuery({
        queryKey: ['seasons/{seasonId}/weeks/{weekNum}', seasonId, weekNum],
        queryFn: () => iRacingStatAPI.fetch(`/seasons/${seasonId}/weeks/${weekNum}` as "/seasons/{seasonId}/weeks/{weekNum}")
                        .then(response => response.success && response.data),
    })

    const [ animate ] = useAutoAnimate()

    return (
        <Card className="h-full flex flex-col" ref={ animate }>
            {isFetching && (
                <CardContent className='pt-8 flex flex-col justify-center items-center gap-2'>
                    <Skeleton className="w-full h-8 shimmer" />
                    <Skeleton className="w-64 h-10 shimmer" />
                    <Skeleton className='w-48 h-10 shimmer mt-4' />
                    <Skeleton className='w-48 h-8 mt-4' />
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton key={index} className='w-24 h-24 shimmer rounded-full' />
                        ))}

                    </div>
                </CardContent>
            )}
            {data && (
            <CardContent className="pt-8 flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-extrabold">{data.series_name}</h2>
                    <h2 className="text-3xl font-extralight">{data.season_year} S{data.season_quarter}</h2>
                    <h1 className="text-3xl font-semibold pt-4">Week {weekNum + 1}</h1>
                    <p className="pt-8">
                    {format(new Date(data.min_start), 'MMMM d, yyyy')} - {format(new Date(data.max_end), 'MMMM d, yyyy')}
                    </p>
                    <p>{data.track_name} {data.config_name}</p>
                    <ImageCircle images={data.cars.map((car) => ({ url: car.image, title: car.name }))} />

            </CardContent>
            )}
            <CardFooter className="mt-auto">
                <div className="flex justify-between w-full pt-2">
                    <Button variant={'outline'} onClick={() => setWeekNum(weekNum - 1)} disabled={weekNum <= 0}>
                        <FaArrowLeft /> Week {weekNum === 0 ? 1 : weekNum}
                    </Button>
                    
                    {seriesId && (
                        <Link href={`/series/${seriesId}`}>
                            <Button variant={'ghost'}>
                                Back to Series
                            </Button>
                        </Link>
                    )}
                    <Button variant={'outline'} onClick={() => setWeekNum(weekNum + 1)}>
                        Week {weekNum + 2}
                        <FaArrowRight /> 
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}