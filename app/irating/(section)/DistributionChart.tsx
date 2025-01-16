'use client';

import { useQuery } from "@tanstack/react-query";
import { Activity } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent } from "~/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";
import { useQueryParam } from "~/src/hooks";
import { useEffect, useState } from "react";
import { Spinner } from "~/components/Spinner";

const chartConfig = {
    count_in_group: {
      label: "Total Drivers",
      color: "hsl(var(--chart-1))",
      icon: Activity,
    },
  } satisfies ChartConfig;

export default function IRatingDistributionChart() {
    const [ chartData, setChartData ] = useState<iRacingStatAPI.$_RequestSchema["/irating/distribution"]["distribution"]>([]);
    const [ period, ] = useQueryParam<string>("period", "");
    const [ license, ] = useQueryParam<string>("license", "");
    
    const { data, isFetching, isError } = useQuery({
        queryKey: ["irating", "distribution", period, license],
        queryFn: () => iRacingStatAPI.fetch(`/irating/distribution?&period=${period}&license=${license}` as "/irating/distribution")
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

                    <CardContent>
                        <div className="relative">
                            {isFetching && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
                                    <Spinner className="w-16 h-16" />
                                </div>
                            )}
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
                                            tickMargin={10} 
                                            type="number"
                                            domain={[0, 4000]} />
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
                        </div>
                    </CardContent>
                </Card>
            
        </div>
    )
}