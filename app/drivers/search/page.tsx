'use client';

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "~/components/ui/table"
import Link from "next/link";
import TopDriversThisSeason from "../[custId]/career/TopDriversThisSeason";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useAutoAnimate } from "@formkit/auto-animate/react";


export default function DriverSearch() {
    
    return (
        <div className="grid grid-cols-2 justify-center items-center max-w-7xl mx-auto px-2 gap-4">
            <div>
                <SearchResultsTable />
            </div>
            <div>
                <TopDriversThisSeason />
            </div>


        </div>
    )
}

function SearchResultsTable() {
    const [searchDriver, setSearchDriver] = useState<string>("");
    const [debouncedSearchDriver, setDebouncedSearchDriver] = useState<string>("");

    const { data } = useQuery({
        queryKey: ["/drivers/search", searchDriver],
        enabled: debouncedSearchDriver.length > 0,
        queryFn: () => iRacingStatAPI.fetch(`/drivers/search?search_term=${searchDriver}` as "/drivers/search")
        .then(response => response && response.success && response.data),
    })

    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedSearchDriver(searchDriver);
        }, 1000);
    
        return () => {
          clearTimeout(handler);
        };
      }, [searchDriver]);

      const [ animate ] = useAutoAnimate()

    return (
        <Card className="h-[32rem] overflow-y-clip hover:overflow-y-scroll" ref={ animate }>
            <CardHeader>
                <CardTitle>
                    <div className="flex gap-4 items-center">
                        <p>Search</p>
                        <Input 
                            placeholder="Search for a driver" 
                            onChange={(ctx) => (setSearchDriver(ctx.target.value))}
                            />
                    </div>
                    
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px] border-gray-200">Driver</TableHead>
                            <TableHead className="w-[150px]">Location</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody ref={ animate }>
                        {data && data.map((driver, index) => (
                            <TableRow key={index}>
                                <Link href={`/drivers/${driver.cust_id}/career`}><TableCell className="border-r w-[300px]">{driver.display_name}</TableCell></Link>
                                <TableCell>{driver.club_name} {driver.country_code}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}