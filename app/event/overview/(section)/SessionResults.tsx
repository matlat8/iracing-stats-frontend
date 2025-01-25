'use client'

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { iRacingStatAPI } from "~/src/iRacingStatAPI"
import { FaCarCrash, FaFlagCheckered, FaStopwatch, FaTrophy } from "react-icons/fa";
import { TooltipContent, TooltipTrigger, Tooltip } from "~/components/ui/tooltip"
import { timeToRaceFormat } from "~/src/time"
import LoadingTableRow from "~/components/LoadingTableRow"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import Image from "next/image"

export default function SessionResults({ sessionId }: { sessionId: number }) {
    const { data, isFetching, isError } = useQuery({
        queryKey: ["session", sessionId, "results"],
        queryFn: () => iRacingStatAPI.fetch(`/sessions/${sessionId}/results` as "/sessions/{sessionId}/results")
            .then(response => response && response.success && response.data ),
    })

    const [ animate ] = useAutoAnimate()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent>
                {isError && <p>Error fetching session results</p>}
                {data && data.length === 0 && <p>No results</p>}
                
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <FaFlagCheckered />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Race Finish Position
                                        </TooltipContent>
                                    </Tooltip>
                                </TableHead>
                                <TableHead>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="flex mt-auto">
                                                <FaFlagCheckered />
                                                <p className="text-[10px] pl-2">(IC)</p>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Finish position within class</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Car Class</TableHead>
                                <TableHead>Car</TableHead>
                                <TableHead>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="flex gap-2">
                                                <FaCarCrash />
                                                Inc.
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Total incidents
                                        </TooltipContent>
                                    </Tooltip>
                                </TableHead>
                                <TableHead>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="flex gap-2">
                                                <FaStopwatch />
                                                Int.
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Interval to race leader
                                        </TooltipContent>
                                    </Tooltip>
                                </TableHead>
                                <TableHead>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div className="flex gap-2">
                                                <FaStopwatch />
                                                <p>Int.</p>
                                                <p className="text-[10px]">(IC)</p>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Interval to class leader</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TableHead>
                                <TableHead>iR</TableHead>
                                <TableHead>CPI</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody ref={ animate }>
                            {isFetching && (
                                <LoadingTableRow cols={10}/>
                            )}
                            {data && data.length > 0 && data.map((result, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {result.finish_position === 1 && (
                                                <FaTrophy className="text-yellow-400"/>
                                            )}
                                            {result.finish_position === 2 && (
                                                <FaTrophy className="text-gray-400"/>
                                            )} 
                                            {result.finish_position === 3 && (
                                                <FaTrophy className="text-orange-400"/>
                                            )}
                                            {result.finish_position > 3 && (
                                                <p className="text-lg">{result.finish_position}</p>
                                            )}

                                        </TableCell>
                                        <TableCell>
                                            {result.finish_position_in_class === 1 && (
                                                <FaTrophy className="text-yellow-400"/>
                                            )}
                                            {result.finish_position_in_class === 2 && (
                                                <FaTrophy className="text-gray-400"/>
                                            )} 
                                            {result.finish_position_in_class === 3 && (
                                                <FaTrophy className="text-orange-400"/>
                                            )}
                                            {result.finish_position_in_class > 3 && (
                                                <p className="text-lg">{result.finish_position_in_class}</p>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/drivers/${result.cust_id}/career`}>
                                                <p className="hover:underline">{result.display_name}</p>
                                            </Link>
                                        </TableCell>
                                        <TableCell>{result.car_class_short_name}</TableCell>
                                        <TableCell>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Image src={result.small_car_image} alt={result.car_name} width={128} height={128} className="h-12 w-20 rounded-full object-cover"/>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {result.car_name}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>{result.incidents}</TableCell>
                                        <TableCell>{timeToRaceFormat(result.interval)}</TableCell>
                                        <TableCell>{timeToRaceFormat(result.class_interval)}</TableCell>
                                        <TableCell className="">
                                            <p>{result.oldi_rating}</p>
                                            <p className={ result.ir_change > 0 ? "text-green-600 text-[12px]" : "text-red-600 text-[12px]"}>
                                                {result.ir_change > 0 ? "+" : ""}{ result.ir_change }
                                            </p>
                                        </TableCell>
                                        <TableCell>
                                            <p>{result.old_cpi}</p>
                                            <p className={ result.cpi_change > 0 ? "text-green-600 text-[12px]" : "text-red-600 text-[12px]"}>
                                                {result.cpi_change > 0 ? "+" : ""}{ result.cpi_change }
                                            </p>
                                        </TableCell>
                                    </TableRow>
                                    )}
                            )}
                        </TableBody>
                    </Table>
                
            </CardContent>
        </Card>
    )
}