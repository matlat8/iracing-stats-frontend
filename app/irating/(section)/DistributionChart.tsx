'use client';

import { SelectTrigger } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { Activity } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";
import { Select, SelectValue } from "~/components/ui/select";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";

const chartConfig = {
    count_in_group: {
      label: "Total Drivers",
      color: "hsl(var(--chart-1))",
      icon: Activity,
    },
  } satisfies ChartConfig;

export default function IRatingDistributionChart() {

    const { data, isFetching, isError } = useQuery({
        queryKey: ["irating", "distribution"],
        queryFn: () => iRacingStatAPI.fetch("/irating/distribution")
            .then(response => response && response.success && response)
    })

    const { data: filterData, isFetching: isFilterFetching, isError: isFilterError } = useQuery({
        queryKey: ["irating", "distribution", "filters"],
        queryFn: () => iRacingStatAPI.fetch("/irating/filters")
            .then(response => response && response.success && response)
    })
    return (
        <div>
            {isFetching && <p>Loading...</p>}
            {isError && <p>Error fetching iRating distribution</p>}
            {data && data.success && (
                <Card>
                    <CardHeader>
                        <div className="flex">
                            <CardTitle>iRating Distribution</CardTitle>
                            <div>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <AreaChart 
                                accessibilityLayer
                                data={data.distribution}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey='irating_group'
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10} />
                                    <ChartTooltip 
                                        cursor={true}
                                        content={<ChartTooltipContent hideLabel includeHidden={true} />}
                                        
                                        />
                                    <Area
                                        dataKey='count_in_group'
                                        type="step"
                                        fill="hsl(var(--chart-1))"
                                        fillOpacity={0.4}
                                        stroke="hsl(var(--chart-1))"
                                        
                                        />
                                    <Area
                                        dataKey='percentile'
                                        type="natural"
                                        fill="transparent"
                                        fillOpacity={0}
                                        stroke="hsl(var(--chart-1))"
                                        strokeOpacity={0}
                                    />
                            
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}