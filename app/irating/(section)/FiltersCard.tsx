'use client'

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useQueryParam } from "~/src/hooks";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";


export default function FiltersCard() {

    const [year, setYear] = useQueryParam<string>("year", "");

    const { data, isFetching, isError } = useQuery({
        queryKey: ["irating", "filters"],
        queryFn: () => iRacingStatAPI.fetch("/irating/filters")
            .then(response => response && response.success && response)
    })
    const handleYearChange = (year: string) => {
        setYear(year)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
                <Select onValueChange={handleYearChange} value={String(year)}>
                    <SelectTrigger className="w-[180px] border rounded-md">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                        <SelectContent>
                            {isFetching && <p>Loading...</p>}
                            {isError && <p>Error fetching filters</p>}
                            {data && data.success && data.distribution.years.map(year => (
                            <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                            )) }
                        </SelectContent>
                                </Select>
            </CardContent>
        </Card>
    )
}