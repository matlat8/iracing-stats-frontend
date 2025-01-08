'use client';

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useQueryParam } from "~/src/hooks";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";


export default function FiltersCard() {

    const [year, setYear] = useQueryParam<string>("year", "");
    const [season, setSeason] = useQueryParam<string>("season", "");
    const [license, setLicense] = useQueryParam<string>("license", "");

    const { data, isFetching, isError } = useQuery({
        queryKey: ["irating", "filters"],
        queryFn: () => iRacingStatAPI.fetch("/irating/filters")
            .then(response => response && response.success && response)
    })
    const handleYearChange = (year: string) => {
        setYear(year)
    }
    const handleSeasonChange = (season: string) => {
        setSeason(season)
    }
    const handleLicenseChange = (license: string) => {
        setLicense(license)
    }

    useEffect(() => {
        if (data && data.success && data.distribution.years.length > 0) {
            setYear(String(data.distribution.years[0]))
            setSeason(String(data.distribution.quarters[0]))
            setLicense(data.distribution.license_categories[0])
        }
    }, [data, setYear, setLicense, setSeason]);


    return (
        <Card>
            <CardHeader>
                <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4">
                    <Select onValueChange={handleYearChange} value={String(year)}>
                        <SelectTrigger className="w-[180px] border rounded-md">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                                {isFetching && <p>Loading...</p>}
                                {isError && <p>Error fetching filters</p>}
                                {data && data.success && data.distribution.years.sort((a, b) => b - a)
                                                                                .map(year => (
                                <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                                )) }
                        </SelectContent>
                    </Select>
                    <Select onValueChange={handleSeasonChange} value={String(season)}>
                        <SelectTrigger className="w-[180px] border rounded-md">
                                <SelectValue placeholder="Season" />
                        </SelectTrigger>
                        <SelectContent>
                            {data && data.success && data.distribution.quarters.map(quarter => (
                                <SelectItem key={quarter} value={String(quarter)}><p>{quarter}</p></SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={handleLicenseChange} value={String(license)}>
                        <SelectTrigger className="w-[180px] border rounded-md">
                                <SelectValue placeholder="License" />
                        </SelectTrigger>
                        <SelectContent>
                            {data && data.success && data.distribution.license_categories.map(license => (
                                <SelectItem key={license} value={license}>{license}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}