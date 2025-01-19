'use client';

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { Card, CardContent } from "~/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";


const chartConfig = {
    event_count: {
      label: "Splits this week",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

export default function SeriesParticiationChartCard() {
    const router = useRouter();

    const { data } = useQuery({
        queryKey: ['series/this_week'],
        queryFn: () => iRacingStatAPI.fetch('/series/this_week')
                    .then(response => response.success && response.data)
    })

    return (
        <Card className="w-full">
            <CardContent>
                {data && (
                <ChartContainer config={chartConfig} className="h-96 w-full">
                    <BarChart
                        accessibilityLayer
                        data={data.slice(0, 10)}
                        margin={{
                            top: 20
                        }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="series_short_name"
                            tickLine={true}
                            tickFormatter={(value) => value.split(' ').slice(0, 3).join(' ')}
                            tickMargin={10}
                            interval={0}
                            axisLine={false}
                            />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                            />
                        <Bar
                            dataKey="event_count"
                            fill="hsl(var(--chart-1))"
                            onClick={(data) => router.push(`/series/${data.series_id}`)}
                            className="cursor-pointer"
                            radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                />
                            
                        </Bar>
                    </BarChart>
                </ChartContainer>
                )}

            </CardContent>

        </Card>
    )
}