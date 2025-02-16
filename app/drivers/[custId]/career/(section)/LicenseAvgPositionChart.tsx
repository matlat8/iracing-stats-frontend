'use client';

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CartesianGrid, ComposedChart, Line, Scatter, XAxis, YAxis } from "recharts";
import { Spinner } from "~/components/Spinner";
import { Tab, Tabs } from "~/components/Tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";

const chartConfig = {
    avg_finish_position: {
        label: "Finish Position",
        color: "hsl(var(--chart-4))"
    },
    avg_starting_position: {
        label: "Start Position",
        color: "hsl(var(--chart-1))"
    },
    rolling_avg_finish_position: {
        label: "Avg. Finish Position",
        color: "hsl(var(--chart-2))"
    },
    rolling_avg_starting_position: {
        label: "Avg. Start Position",
        color: "hsl(var(--chart-3))"
    },
} satisfies ChartConfig

export default function LicenseAvgPositionChart({ custId }: { custId: number }) {
    const [selectedTab, setSelectedTab] = useState(0);

    const { data, isFetching } = useQuery({
        queryKey: ['/drivers/{custId}/positions', custId],
        queryFn: () => iRacingStatAPI.fetch(`/drivers/${custId}/positions` as '/drivers/{custId}/positions')
                    .then(response => response.success && response)
    })

    const uniqueLicenses = data && data.data.categories.map((position) => position.license_category)
                                                        .filter((value, index, self) => self.indexOf(value) === index)
                                                        .sort((a, b) => a.localeCompare(b));

    const selectedTabString = uniqueLicenses && uniqueLicenses[selectedTab];
    console.log(selectedTabString)

    return (
        <Card>
            <CardHeader className="flex w-full">
                <div className="flex-grow">
                    <CardTitle>
                        Average Finishing Position (by) License
                    </CardTitle>
                    <CardDescription>
                    Daily average finish positions (scatter) correlated with a 7-day rolling average (line). Pick a license to see performance trend over time.
                    </CardDescription>
                </div>
                <div className="flex-shrink">
                    <Tabs defaultSelected={0}>
                        {uniqueLicenses && uniqueLicenses.map((license, index) => (
                            <Tab key={index}
                                onClick={() => setSelectedTab(index)}>
                                {license}
                            </Tab>
                        ))}
                    </Tabs>
                </div>
            </CardHeader>
            <CardContent>
                { isFetching && (
                    <div className="w-full h-96 flex justify-center items-center align-middle">
                        <Spinner />
                    </div>
                )}
                { data && (
                    <ChartContainer
                        config={ chartConfig }
                        className="max-h-96 w-full">
                        <ComposedChart
                            accessibilityLayer
                            data={ data.data.categories.filter((position) => position.license_category === selectedTabString) }
                            margin={{
                                right: 12,
                            }} >
                                <CartesianGrid />
                                <XAxis
                                    dataKey={'start_day'}
                                    tickMargin={8} />
                                
                                <YAxis
                                    dataKey={'avg_finish_position'}
                                    tickMargin={8} 
                                    domain={[
                                        0,
                                        (dataMax: number) => dataMax + 10
                                    ]} />
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                    />

                                <Line
                                    type={'monotone'}
                                    dataKey={'rolling_avg_starting_position'}
                                    stroke="hsl(var(--muted-foreground))"
                                    strokeDasharray={'3 3'}
                                    dot={false}
                                    />
                                <Line
                                    type={"monotone"}
                                    dataKey={'rolling_avg_finish_position'}
                                    dot={false}
                                    />

                                <Scatter
                                    dataKey={'avg_finish_position'}
                                    fill="var(--primary)"
                                    />
                                <ChartLegend 
                                    content={<ChartLegendContent />}/>
                        </ComposedChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}