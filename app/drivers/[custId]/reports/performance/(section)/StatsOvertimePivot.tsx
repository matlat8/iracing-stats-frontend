'use client'

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { iRacingStatAPI } from "~/src/iRacingStatAPI"
import React from "react"


export default function StatsOvertimePivot({ custId }: { custId: number}) {

    const { data, isFetching, isError } = useQuery({
        queryKey: ["/drivers/{custId}/stats/overtime", custId],
        queryFn: () => iRacingStatAPI.fetch(`/drivers/${custId}/stats` as "/drivers/{custId}/stats")
                                        .then(response => response && response.success && response)
    }) 

    return (
        <div>
            {isFetching && <p>Loading...</p>}
            {isError && <p>Error</p>}
            {data && (
                <Card>
                    <CardHeader>
                        <CardTitle>Career Stats</CardTitle>
                        <CardDescription>Stats over the course of their racing career</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Season</TableHead>
                                    <TableHead>Events</TableHead>
                                    <TableHead>Races</TableHead>
                                    <TableHead>Wins</TableHead>
                                    <TableHead>Podiums</TableHead>
                                    <TableHead>Top 5</TableHead>
                                    <TableHead>Avg. Laps</TableHead>
                                    <TableHead>Avg. Finish Position</TableHead>
                                    <TableHead>Avg. Qualy Position</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.seasons_rollup.map((row, index) => (
                                    <TableRow key={index} className="my-2">
                                        <TableCell>{row.season_year} {row.season_quarter ? `S${row.season_quarter}`: 'Total'}</TableCell>
                                        <TableCell>{row.total_events}</TableCell>
                                        <TableCell>{row.total_races}</TableCell>
                                        <TableCell>{row.total_wins}</TableCell>
                                        <TableCell>{row.podiums}</TableCell>
                                        <TableCell>{row.top_5}</TableCell>
                                        <TableCell>{row.irating_events_avg_laps_completed}</TableCell>
                                        <TableCell>{row.avg_finish_position_in_class}</TableCell>
                                        <TableCell>{row.avg_start_position_in_class}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}