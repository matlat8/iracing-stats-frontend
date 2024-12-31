'use client';

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
import { Skeleton } from "~/components/ui/skeleton";


export default function DriverSearch() {
    const [searchDriver, setSearchDriver] = useState<string>("");
    const [debouncedSearchDriver, setDebouncedSearchDriver] = useState<string>("");

    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedSearchDriver(searchDriver);
        }, 1000);
    
        return () => {
          clearTimeout(handler);
        };
      }, [searchDriver]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["/drivers/search", searchDriver],
        enabled: debouncedSearchDriver.length > 0,
        queryFn: () => iRacingStatAPI.fetch(`/drivers/search?search_term=${searchDriver}` as "/drivers/search")
        .then(response => response && response.success && response.data),
    })


    return (
        <Container className="p-4">
            <Input 
                placeholder="Search for a driver" 
                onChange={(ctx) => (setSearchDriver(ctx.target.value))}
                className="bg-white w-full dark:bg-gray-800"
                />

            <div className="border border-gray-300 rounded-md mt-4">
                {isLoading && <Skeleton className="w-[675px] h-[200px] rounded-md" />}
                {isError && <p>Error</p>}
                {data && <SearchResultsTable data={data} />}
            </div>


        </Container>
    )
}

function SearchResultsTable(data: iRacingStatAPI.$_RequestSchema["/drivers/search"]) {

    return (
        <div>
            <Table>
                <TableCaption>Search Results</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-300">
                        <TableHead className="w-[300px] border-gray-200">Driver</TableHead>
                        <TableHead className="w-[150px]">Location</TableHead>
                        <TableHead className="w-[75px]">Road iR</TableHead>
                        <TableHead className="w-[75px]">Oval iR</TableHead>
                        <TableHead className="w-[75px]">Dirt Oval iR</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.data.map((driver, index) => (
                        <TableRow key={index} className="bg-white dark:bg-black">
                            <Link href={`/drivers/career?cust_id=${driver.cust_id}`}><TableCell className="border-r w-[300px]">{driver.display_name}</TableCell></Link>
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