'use client';

import { useQuery } from "@tanstack/react-query";
import { Activity } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";
import { useQueryParam } from "~/src/hooks";
import { useEffect, useState } from "react";

const chartConfig = {
    count_in_group: {
      label: "Total Drivers",
      color: "hsl(var(--chart-1))",
      icon: Activity,
    },
  } satisfies ChartConfig;

export default function IRatingDistributionChart() {
    const [ chartData, setChartData ] = useState<iRacingStatAPI.$_RequestSchema["/irating/distribution"]["distribution"]>([]);
    const [ year, ] = useQueryParam<string>("year", "");
    const [ season, ] = useQueryParam<string>("season", "");
    const [ license, ] = useQueryParam<string>("license", "");
    
    const { data, isError } = useQuery({
        queryKey: ["irating", "distribution", year, season, license],
        queryFn: () => iRacingStatAPI.fetch(`/irating/distribution?year=${year}&quarter=${season}&license=${license}` as "/irating/distribution")
            .then(response => response && response.success && response)
    })
    useEffect(() => {
        if (data && data.success) {
          setChartData(data.distribution);
        }
      }, [data]);

    return (
        <div>
            {isError && <p>Error fetching iRating distribution</p>}
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
                                data={chartData}
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
            
        </div>
    )
}