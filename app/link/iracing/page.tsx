'use client';

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DriverRow from "~/components/DriverRow";
import { Spinner } from "~/components/Spinner";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { useQueryParam } from "~/src/hooks";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";


export default function LinkIracingAccountPage() {
    const [searchDriver, setSearchDriver] = useState<string>("");
    const [request_id, ] = useQueryParam('request_id', '');
    const [tableData, setTableData] = useState<iRacingStatAPI.$_RequestSchema["/drivers/search"]["data"]>([]);
    const [searchHash, setSearchHash] = useState<string>("");

    const { data } = useQuery({
        queryKey: ['drivers/link', request_id],
        queryFn: () => iRacingStatAPI.fetch(`/drivers/link/${request_id}` as '/drivers/link/{requestId}')
                                    .then(response => response.success && response)
    })

    const { data: searchData, isFetching: searchIsFetching } = useQuery({
        queryKey: ["/drivers/search", searchHash],
        queryFn: () => iRacingStatAPI.fetch(`/drivers/search?search_term=${searchHash}&limit=100` as "/drivers/search")
        .then(response => response && response.success && response.data),
    })

    useEffect(() => {
        if (searchData && searchData.length > 0) {
            setTableData(searchData)
        }
    }, [searchData])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchHash(searchDriver);
    }

    const mutation = useMutation({
        mutationFn: (custId: number) => iRacingStatAPI.fetch(`/drivers/link/${request_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cust_id: custId
            })
        }),
        onSuccess: () => setTableData([])
    })

    return (
        <div className="min-h-screen flex justify-center items-center">
            <Card>
                {data && (
                    <>
                <CardHeader>
                    <CardTitle>
                        {data.discord_name} | iRacingStat
                    </CardTitle>
                    {!data.ir_cust_id && (
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
                    )}

                </CardHeader>
                <CardContent className="flex-grow overflow-y-auto relative">
                    {searchIsFetching && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
                            <Spinner className="w-16 h-16" />
                        </div>
                    )}
                <Table>
                    <TableBody>

                        {tableData.map((driver, index) => (
                            <TableRow key={index}>
                                <TableCell onClick={() => mutation.mutate(driver.cust_id)}>
                                    <DriverRow 
                                        name={ driver.display_name }
                                        club={ driver.club_name }
                                        countryCode={ driver.country_code }
                                        countryImage={ driver.country_image_url } />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {mutation.isSuccess && (
                    <p>
                        Your account is now linked. Feel free to look around or head back to discord!
                    </p>
                )}
                {mutation.isError && (
                    <p>
                        Something went wrong successfully. Please don&apos;t try again.
                    </p>
                )}
            </CardContent>
            </>
            )}

            </Card>
        </div>
    )
}