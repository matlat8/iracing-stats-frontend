'use client'

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "~/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";

const chartConfig = {
    practice_sessions: {
      label: "Practices",
      color: "hsl(var(--chart-1))",
    },
    race_sessions: {
      label: "Races",
      color: "hsl(var(--chart-2))",
    },
    time_trial_sessions: {
      label: "Time trials",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig

export default function SeriesSeasonParticipationChart() {

    const { seriesId } = useParams<{ seriesId: string }>();
    
    const { data } = useQuery({
        queryKey: ['series/{seriesId}/seasons', seriesId],
        queryFn: () => iRacingStatAPI.fetch(`/series/${seriesId}/seasons` as "/series/{seriesId}/seasons")
                    .then(response => response.success && response)
    })

    return (
        <Card>
            <CardContent>
                {data && data.success && (
                    <ChartContainer config={chartConfig} className="h-96 w-full">
                        <AreaChart
                            accessibilityLayer
                            data={data.seasons}
                            margin={{
                                left: 12,
                                right: 12,
                                top: 12,
                            }}
                            
                            >
                            <CartesianGrid vertical={false} />
                            <XAxis 
                                dataKey='season_title' 
                                tickLine={true}
                                axisLine={true}
                                tickMargin={10}
                                interval={0}
                                tickFormatter={(value) => value}
                                />

                            <YAxis
                                tickLine={true}
                                axisLine={true}
                                tickMargin={10}
                                />
                            <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent indicator="line" />}
                            />
                            <Area
                                dataKey={"race_sessions"}
                                type={"natural"}
                                fill="hsl(var(--chart-1))"
                                fillOpacity={0.4}
                                stroke="hsl(var(--chart-1))"
                                stackId={"a"}
                                />
                            <Area
                                dataKey={"practice_sessions"}
                                type={"natural"}
                                fill="hsl(var(--chart-2))"
                                fillOpacity={0.4}
                                stroke="hsl(var(--chart-2))"
                                stackId={"a"}
                                />
                            <Area
                                dataKey={"time_trial_sessions"}
                                type={"natural"}
                                fill="hsl(var(--chart-3))"
                                fillOpacity={0.4}
                                stroke="hsl(var(--chart-3))"
                                stackId={"a"}
                                />

                                <ChartLegend content={<ChartLegendContent />} />
                            </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}