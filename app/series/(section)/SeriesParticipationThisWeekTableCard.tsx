'use client';

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";


export default function SeriesParticipationThisWeekTableCard() {
    
    const { data } = useQuery({
        queryKey: ['series/this_week'],
        queryFn: () => iRacingStatAPI.fetch('/series/this_week')
                    .then(response => response.success && response.data)
    })

    return (
        <Card className="w-full">
            <CardContent className="max-h-96 overflow-y-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Series
                            </TableHead>
                            <TableHead className="w-[25%]">
                                License
                            </TableHead>
                            <TableHead className="w-[15%] text-end">
                                Splits
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data && data.map((series) => (
                            <TableRow key={series.series_id}>
                                <Link href={`/series/${series.series_id}`}><td className="hover:underline">{series.series_name}</td></Link>
                                <td>{series.license_category}</td>
                                <td className="text-end">{series.event_count}</td>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}