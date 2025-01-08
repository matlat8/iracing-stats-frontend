'use client'

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { iRacingStatAPI } from "~/src/iRacingStatAPI"

export default function TopDriversThisSeason() {


    const { data } = useQuery({
        queryKey: ["/drivers/top/wins"],
        queryFn: () => iRacingStatAPI.fetch("/drivers/top/wins")
            .then(response => response && response.success && response.data )
    })

    return (
        <Card className="h-[32rem]">
            <CardHeader>
                <h2>Most wins this season</h2>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead className="max-w-128">Player</TableHead>
                            <TableHead>Wins</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data && data.map((row, index) => (
                            <TableRow key={row.cust_id}>
                                <TableCell>{index + 1}</TableCell>
                                <Link href={`/drivers/${row.cust_id}/career`}><TableCell><p className="hover:underline">{row.display_name}</p></TableCell></Link>
                                <TableCell>{row.wins}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>

        </Card>
    )
}