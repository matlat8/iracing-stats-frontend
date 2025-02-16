'use client';
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import NegPosNumber from "~/components/NegPosNumber";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";


export default function PositionTable() {
    const { custId } = useParams<{ custId: string }>();

    const { data } = useQuery({
        queryKey: ['/drivers/{custId}/positions', custId],
        queryFn: () => iRacingStatAPI.fetch(`/drivers/${custId}/positions` as '/drivers/{custId}/positions')
                    .then(response => response.success && response)
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Career Average Finish Position
                </CardTitle>
                <CardDescription>
                    idk what to put here. go birds.
                </CardDescription>
            </CardHeader>
            <CardContent>
                { data && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Season
                                </TableHead>
                                <TableHead className="text-end">
                                    Total Events
                                </TableHead>
                                <TableHead className="text-end">
                                    Avg. Finish Position
                                </TableHead>
                                <TableHead className="text-end">
                                    Qual/Race Pos. +/-
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.data.rollup.map((season) => (
                                <TableRow key={season.license_category || 'all'}>
                                    <TableCell>
                                        {season.license_category || 'Career Total'}
                                    </TableCell>
                                    <TableCell className="text-end">
                                        { season.total_events }
                                    </TableCell>
                                    <TableCell className="text-end">
                                        { season.race_avg_finish_pos.toFixed(2) }
                                    </TableCell>
                                    <TableCell className="text-end">
                                        <NegPosNumber number={ Number((season.race_avg_finish_pos - season.qualifying_avg_finish_pos).toFixed(2)) } />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    )
}