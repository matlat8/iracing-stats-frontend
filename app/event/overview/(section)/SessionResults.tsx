'use client'

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { iRacingStatAPI } from "~/src/iRacingStatAPI"
import { FaCarCrash } from "react-icons/fa";

export default function SessionResults({ sessionId }: { sessionId: number }) {
    const { data, isFetching, isError } = useQuery({
        queryKey: ["session", sessionId, "results"],
        queryFn: () => iRacingStatAPI.fetch(`/sessions/${sessionId}/results` as "/sessions/{sessionId}/results")
            .then(response => response && response.success && response.data ),
    })
    return (
        <Card className="min-w-full">
            <CardHeader>
                <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent>
                {isError && <p>Error fetching session results</p>}
                {isFetching && <p>Loading...</p>}
                {data && data.length === 0 && <p>No results</p>}
                {data && data.length > 0 && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>P</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Car</TableHead>
                                <TableHead><FaCarCrash /></TableHead>
                                <TableHead>Interval</TableHead>
                                <TableHead>iR</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((result, index) => {
                                const totalSeconds = Math.abs(result.interval / 1000);
                                const minutes = Math.floor(totalSeconds / 60);
                                const seconds = Math.floor(totalSeconds % 60);
                                const milliseconds = Math.floor((totalSeconds % 1) * 1000);

                                const formattedInterval = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;

                                return (
                                    <TableRow key={index}>
                                        <TableCell>{result.finish_position}</TableCell>
                                        <TableCell>
                                            <Link href={`/drivers/career?cust_id=${result.cust_id}`}>
                                                <p className="hover:underline">{result.display_name}</p>
                                            </Link>
                                        </TableCell>
                                        <TableCell>{result.car_name}</TableCell>
                                        <TableCell>{result.incidents}</TableCell>
                                        <TableCell>{formattedInterval}</TableCell>
                                        <TableCell className="flex items-stretch">
                                            <p>{result.oldi_rating}</p>
                                            <p className={(result.newi_rating - result.oldi_rating ) > 0 ? "text-green-600 text-[12px]" : "text-red-600 text-[12px]"}>
                                                {(result.newi_rating - result.oldi_rating ) > 0 ? "+" : ""}{(result.newi_rating - result.oldi_rating )}
                                            </p>
                                        </TableCell>
                                    </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    )
}