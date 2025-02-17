'use client';
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import DriverRow from "~/components/DriverRow";
import { Spinner } from "~/components/Spinner";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";

export default function SearchResultsTable() {
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
        <Card className="h-[32rem] flex flex-col" ref={ animate }>
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
            <CardContent className="flex-grow overflow-y-auto relative">
                    {isFetching && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
                                    <Spinner className="w-16 h-16" />
                                </div>
                    )}
                <Table>
                    <TableBody ref={ animate }>

                        {tableData.map((driver, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Link href={`/drivers/${driver.cust_id}/career`}>
                                        <DriverRow 
                                            name={ driver.display_name }
                                            club={ driver.club_name }
                                            countryCode={ driver.country_code }
                                            countryImage={ driver.country_image_url } />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}