'use client';

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { useQueryParam } from "~/src/hooks";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";


export default function WeekSelection() {

    const [seasonId, ] = useQueryParam<string>("seasonId", "");
    const { seriesId } = useParams<{ seriesId: string }>();

    const { data } = useQuery({
        queryKey: ['series/{seriesId}/{seasonId}/weeks', seriesId, seasonId],
        queryFn: () => iRacingStatAPI.fetch(`/series/${seriesId}/seasons/${seasonId}/weeks` as "/series/{seriesId}/seasons/{seasonId}/weeks")
                                    .then(response => response.success && response),
    })

    return (
        <div className="flex flex-col gap-2 pt-4 w-full">
            <h2 className="text-3xl pb-4 pt-8">Weeks</h2>
            {data && data.success && data.weeks.map((week) => (
                <Card key={week.race_week_num} className="overflow-clip w-full">
                    <CardContent className="p-0">
                        <div className="grid grid-cols-[auto_1fr_1fr_auto] w-full">
                            <div className="flex items-center justify-center pl-8">
                                <Link href={`/series/${seriesId}/${seasonId}/${week.race_week_num}`}>
                                    <Button>
                                        View
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <p className="font-bold">Week {week.race_week_num + 1}</p>
                                <p>{week.track_name}</p>
                                {week.car_class_names.map((carClass) => (
                                    <p key={carClass} className="text-sm">{carClass}</p>
                                ))}
                            </div>
                            <div className="flex justify-end items-center gap-2 pr-2">
                                {week.cars.slice(0, 4).map((car) => (
                                    <Image key={car.car_name} 
                                            src={car.car_image} 
                                            alt={car.car_name} 
                                            width={64} 
                                            height={64} 
                                            sizes="100vw"
                                            style={{ width: '15%', height: 'auto' }}
                                            className="rounded-full aspect-square object-cover border-4 border-slate-500"
                                            />
                                ))}
                            </div>
                            <div className="flex items-end ml-auto justify-end border-l-2">
                                <Image src={week.small_track_image} 
                                        alt={week.track_name} 
                                        width={128} 
                                        height={128} 
                                        sizes="100vw"
                                        style={{ width: 'auto', height: 'auto' }}
                                        
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}

        </div>
    )
}