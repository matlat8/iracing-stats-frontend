'use client'
import { useQuery } from "@tanstack/react-query";
import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";
import { Tooltip } from "~/components/Tooltip";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";
import { useQueryParam } from "~/src/hooks";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";
import { formatDuration } from "~/src/time";

const chartConfig = {
    avg_best_lap_time: {
      label: "Avg. Best Lap Time",
      color: "hsl(var(--chart-1))",
    },
    avg_avg_lap_time: {
      label: "Avg. Race Average Lap Time",
      color: "hsl(var(--chart-2))",
    },
    participants: {
        label: "Participants",
        color: "hsl(var(--chart-4))",
    },
    irating_group: {
        label: "iRating",
    }
  } satisfies ChartConfig;

export default function LapTimeCard() {
    const [seasonId, ] = useQueryParam<string>("seasonId", "");
    const [weekNum, ] = useQueryParam<number>("weekNum", 0);

    const { data } = useQuery({
        queryKey: ['seasons/{seasonId}/weeks/{weekNum}/avg_irating_laptime', seasonId, weekNum],
        queryFn: () => iRacingStatAPI.fetch(`/seasons/${seasonId}/weeks/${weekNum}/avg_irating_laptime` as "/seasons/{seasonId}/weeks/{weekNum}/avg_irating_laptime")
                                    .then(response => response.success && response),
    })

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    Lap Times (by) iRating
                </CardTitle>
                <CardDescription>
                    View the averages of the best lap times and average lap times by iRating group. 
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                {data && data.success && (
                    <ChartContainer config={chartConfig}>
                        <ComposedChart
                            accessibilityLayer
                            data={data.chart}
                            margin={{
                                right: 12,
                            }} >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="irating_group"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    />
                                <YAxis
                                    dataKey={"avg_best_lap_time"}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => formatDuration(value)}
                                    tickMargin={8}
                                    yAxisId={"left"}
                                    domain={[
                                        (dataMin: number) => dataMin - 10, // Subtract 5 seconds from the minimum value
                                        (dataMax: number) => dataMax + 15  // Add 5 seconds to the maximum value
                                    ]}
                                    />

                                <ChartTooltip 
                                    cursor={false} 
                                    content={<ChartTooltipContent 
                                        hideLabel
                                    formatter={(value, name) => (
                                        <>
                                          <div
                                            className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                                            style={
                                              {
                                                "--color-bg": `var(--color-${name})`,
                                              } as React.CSSProperties
                                            }
                                          />
                                          {chartConfig[name as keyof typeof chartConfig]?.label ||
                                            name}
                                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                            
                                            {name === 'participants' || name === 'irating_group' ? value : formatDuration(Number(value))}
                                          </div>
                                        </>
                                      )}
                                    />
                                      }
                                    /> 
                                 <Line
                                    type={"monotone"}
                                    visibility={"hidden"}
                                    yAxisId={"left"}
                                    dataKey="irating_group"
                                    />
                                <Line
                                    type={"monotone"}
                                    dataKey="avg_best_lap_time"
                                    stroke="hsl(var(--chart-1))"
                                    connectNulls
                                    strokeWidth={2}
                                    yAxisId={"left"}
                                    dot={false}
                                    />
                                <Line
                                    type={"monotone"}
                                    dataKey="avg_avg_lap_time"
                                    stroke="hsl(var(--chart-2))"
                                    connectNulls
                                    yAxisId={"left"}
                                    strokeWidth={2}
                                    dot={false}
                                    />
                               
                                <Bar
                                    dataKey={"participants"}
                                    barSize={8}
                                    fill="hsl(var(--chart-4))"
                                    radius={[4, 4, 0, 0]}
                                    yAxisId={"right"}
                                    />
                                <YAxis
                                    dataKey={"participants"}
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    visibility={"hidden"}
                                    yAxisId={"right"}
                                    domain={[
                                        (dataMin: number) => dataMin, // Subtract 5 seconds from the minimum value
                                        (dataMax: number) => dataMax * 3  // Add 5 seconds to the maximum value
                                    ]}
                                    />
                            </ComposedChart>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter>
                <Tooltip tooltip='Coming soon' className="ml-auto">
                    <Button className="hover:bg-red-700 dark:hover:bg-red-500 ml-auto">Detailed Breakdown</Button>
                </Tooltip>
            </CardFooter>
            
        </Card>
    )
}