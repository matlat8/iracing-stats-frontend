'use client';

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Container } from "~/components/Container";
import { Input } from "~/components/ui/input";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "~/components/ui/table"
import Link from "next/link";


export default function DriverSearch() {
    const [searchDriver, setSearchDriver] = useState<string>("");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["/drivers/search", searchDriver],
        enabled: searchDriver.length > 0,
        queryFn: () => iRacingStatAPI.fetch(`/drivers/search?search_term=${searchDriver}` as "/drivers/search")
        .then(response => response && response.success && response.data),
    })


    return (
        <Container>
            <Input placeholder="Search for a driver" onChange={(ctx) => (setSearchDriver(ctx.target.value))}/>
            <p>{searchDriver}</p>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error</p>}
            {data && <SearchResultsTable data={data} />}

        </Container>
    )
}

function SearchResultsTable(data: iRacingStatAPI.$_RequestSchema["/drivers/search"]) {

    return (
        <div>
            <Table>
                <TableCaption>Search Results</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Driver</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Road iR</TableHead>
                        <TableHead>Oval iR</TableHead>
                        <TableHead>Dirt Oval iR</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.data.map((driver) => (
                        <TableRow key={driver.cust_id}>
                            <Link href={`/drivers/career?cust_id=${driver.cust_id}`}><TableCell>{driver.display_name}</TableCell></Link>
                            <TableCell>{driver.club_name} {driver.country_code}</TableCell>
                            <TableCell>{driver.road_rating}</TableCell>
                            <TableCell>{driver.oval_rating}</TableCell>
                            <TableCell>{driver.dirt_oval_rating}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}