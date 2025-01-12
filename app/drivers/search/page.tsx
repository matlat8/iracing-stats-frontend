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
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/Spinner";


export default function DriverSearch() {
    
    return (
        <div className="grid lg:grid-cols-2 md:grid-cols-1 justify-center items-center max-w-7xl mx-auto px-2 gap-4 ">
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
    const [tableData, setTableData] = useState<iRacingStatAPI.$_RequestSchema["/drivers/search"]["data"]>([]);
    const [searchHash, setSearchHash] = useState<string>("");

    const { data, isFetching } = useQuery({
        queryKey: ["/drivers/search", searchHash],
        queryFn: () => iRacingStatAPI.fetch(`/drivers/search?search_term=${searchHash}&limit=100` as "/drivers/search")
        .then(response => response && response.success && response.data),
    })

    useEffect(() => {
        if (data && data.length > 0) {
            setTableData(data)
        }
    }, [data])

      const [ animate ] = useAutoAnimate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchHash(searchDriver);
    }

    return (
        <Card className="h-[32rem] overflow-y-clip hover:overflow-y-auto" ref={ animate }>
            <CardHeader>
                <CardTitle>
                    <div className="flex gap-4 items-center">
                        <p>Search</p>
                        <form onSubmit={handleSubmit} className="flex gap-2 flex-grow">
                            <Input
                              placeholder="Search for a driver"
                              value={searchDriver}
                              className="flex-grow"
                              onChange={(e) => setSearchDriver(e.target.value)
                              }
                            />
                            <Button type="submit">Submit</Button>
                        </form>
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
                        {isFetching && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
                                    <Spinner className="w-16 h-16" />
                                </div>
                            )}
                        {tableData.map((driver, index) => (
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