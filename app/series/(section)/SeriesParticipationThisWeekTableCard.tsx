'use client';

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { useQueryParam } from "~/src/hooks";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";


export default function SeriesParticipationThisWeekTableCard() {
    const [selectedCategories, ] = useQueryParam('categories', '')
    
    const { data } = useQuery({
        queryKey: ['series/this_week'],
        queryFn: () => iRacingStatAPI.fetch('/series/this_week')
                    .then(response => response.success && response.data)
    })


    const selectedCategoriesList = selectedCategories ? selectedCategories.split(',') : [];

    const filteredData = data && (selectedCategoriesList.length === 0 ? data : data.filter(series => selectedCategoriesList.includes(series.license_category)));

    const [ animate ] = useAutoAnimate();

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    Series List
                </CardTitle>
                <CardDescription>
                    Find your specific series. View how many splits occurred this season so far.
                </CardDescription>
            </CardHeader>
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
                    <TableBody ref={ animate }>
                        {filteredData && filteredData.map((series) => (
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