'use client';

import { useQuery } from "@tanstack/react-query"
import { FaCarCrash, FaFlagCheckered } from "react-icons/fa";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { FaArrowsSpin } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Tooltip } from "~/components/Tooltip";
import { Card, CardContent } from "~/components/ui/card";
import { useQueryParam } from "~/src/hooks";
import { iRacingStatAPI } from "~/src/iRacingStatAPI"
import { useAutoAnimate } from "@formkit/auto-animate/react";



export default function WeekKPIS() {
    const [weekNum, ] = useQueryParam<number>("weekNum", 0);
    const [seasonId, ] = useQueryParam<string>("seasonId", "");

    const { data, isFetching } = useQuery({
        queryKey: ['seasons/{seasonId}/weeks/{weekNum}', seasonId, weekNum],
        queryFn: () => iRacingStatAPI.fetch(`/seasons/${seasonId}/weeks/${weekNum}` as "/seasons/{seasonId}/weeks/{weekNum}")
                        .then(response => response.success && response.data),
    })

    const [ animate ] = useAutoAnimate()

    return (
        <div className="grid grid-cols-4 w-full gap-4 py-4" ref={ animate }>

            {isFetching && Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="flex items-center justify-center pt-4">
                    <CardContent className="flex flex-col items-center justify-center">
                        <div className="bg-gray-300 dark:bg-gray-700 h-16 w-16 rounded-full flex items-center justify-center shadow-sm">
                            <div className="animate-pulse bg-gray-400 h-8 w-8 rounded-full"></div>
                        </div>
                        <h2 className="text-center mt-2 animate-pulse bg-gray-400 h-4 w-24 rounded"></h2>
                        <p className="font-bold text-2xl text-center animate-pulse bg-gray-400 h-6 w-16 rounded mt-2"></p>
                    </CardContent>
                </Card>
            ))}


            {data && [{
                label: 'Unique Drivers',
                icon: GiFullMotorcycleHelmet,
                tooltip: 'How many unique drivers raced in an official session this week',
                value: data.unique_drivers
            }, {
                label: 'Total Splits',
                value: data.total_splits,
                icon: FaFlagCheckered,
                tooltip: 'How many race sessions were run this week'
            }, {
                label: 'Avg. Incidents',
                value: data.avg_incidents.toFixed(1),
                icon: FaCarCrash,
                tooltip: 'The average number of incidents this week across all participants'
            }, {
                label: 'Total Laps',
                value: data.total_laps_completed,
                icon: FaArrowsSpin,
                tooltip: 'How many laps were completed this week from all participants'
            }].map((kpi, index) => (
                <Card key={index} className="pt-4">
                    <CardContent className="flex flex-col items-center justify-center">
                        <div className="bg-gradient-to-r from-red-400 to-red-500 dark:from-red-700 dark:to-red-800 h-16 w-16 rounded-full flex items-center justify-center shadow-sm">
                            {kpi.icon && <kpi.icon className="text-white text-3xl" />}
                        </div>
                        <div className="flex items-center justify-center gap-1">
                            <h2 className="text-center mt-2">{kpi.label}</h2>
                            <Tooltip key={kpi.label} tooltip={kpi.tooltip ? kpi.tooltip : "123"}>
                                <IoMdInformationCircleOutline className="text-muted-foreground"/>
                            </Tooltip>
                        </div>
                        <p className="font-bold text-2xl text-center">{kpi.value}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}