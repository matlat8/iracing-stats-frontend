'use client';

import { useQuery } from "@tanstack/react-query";
import { Activity } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";
import { useQueryParam } from "~/src/hooks";

const chartConfig = {
    count_in_group: {
      label: "Total Drivers",
      color: "hsl(var(--chart-1))",
      icon: Activity,
    },
  } satisfies ChartConfig;

export default function IRatingDistributionChart() {
    const [ year, ] = useQueryParam<string>("year", "");
    
    const { data, isFetching, isError } = useQuery({
        queryKey: ["irating", "distribution", year],
        queryFn: () => iRacingStatAPI.fetch(`/irating/distribution?year=${year}` as "/irating/distribution")
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
                            <div className="flex ml-auto gap-2">

                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="max-h-96 w-full">
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