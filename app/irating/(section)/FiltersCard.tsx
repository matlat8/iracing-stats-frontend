'use client';

import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useQueryParam } from "~/src/hooks";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";


export default function FiltersCard() {

    const [period, setPeriod] = useQueryParam<string>("period", "");
    const [license, setLicense] = useQueryParam<string>("license", "");

    const { data, isFetching, isError } = useQuery({
        queryKey: ["irating", "filters"],
        queryFn: () => iRacingStatAPI.fetch("/irating/filters")
            .then(response => response && response.success && response)
    })

    const licenses = data
    ? Array.from(new Set(data.distribution.map((d) => d.license_category)))
    : [];
    const periods = useMemo(() => {
      return data
        ? Array.from(
            new Set(
              data.distribution
                .map((p) => p.period)
                .reduce<string[]>((acc, val) => acc.concat(val), [])
            )
          )
        : [];
    }, [data]);

    useEffect(() => {
        if (data) {
            setLicense('Sports Car');
            const latestPeriod = periods.length > 0 ? periods[0] : '';
            setPeriod(latestPeriod);
        }
    }, [data, periods, setLicense, setPeriod]);

    const handlePeriodChange = (year: string) => {
        setPeriod(year)
    }
    const handleLicenseChange = (license: string) => {
        setLicense(license)
    }




    return (
        <Card>
            <CardHeader>
                <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4">

                    <Select onValueChange={handleLicenseChange} value={String(license)}>
                        <SelectTrigger className="w-[180px] border rounded-md">
                                <SelectValue placeholder="License" />
                        </SelectTrigger>
                        <SelectContent>
                            {licenses && licenses.map(license => (
                                <SelectItem key={license} value={license}>{license}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={handlePeriodChange} value={String(period)}>
                        <SelectTrigger className="w-[180px] border rounded-md">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                                {isFetching && <p>Loading...</p>}
                                {isError && <p>Error fetching filters</p>}
                                {periods && periods.map(year => (
                                <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                                )) }
                        </SelectContent>
                    </Select>

                </div>
            </CardContent>
        </Card>
    )
}