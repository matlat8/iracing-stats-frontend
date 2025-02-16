import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { ComposedChart, Line, Scatter, XAxis, YAxis } from "recharts";
import { Spinner } from "~/components/Spinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";

const chartConfig = {
    avg_finish_position: {
        label: "Finish Position",
        color: "hsl(var(--chart-1))"
    },
    avg_start_position: {
        label: "Start Position",
        color: "hsl(var(--chart-1))"
    },
    rolling_avg_finish_position: {
        label: "Avg. Finish Position",
        color: "hsl(var(--chart-4))"
    },
    rolling_avg_start_position: {
        label: "Avg. Start Position",
        color: "hsl(var(--chart-2))"
    },
} satisfies ChartConfig


export default function AvgPositionScatter() {
    const { custId } = useParams<{ custId: string }>();

    const { data, isFetching } = useQuery({
        queryKey: ['/drivers/{custId}/positions', custId],
        queryFn: () => iRacingStatAPI.fetch(`/drivers/${custId}/positions` as '/drivers/{custId}/positions')
                    .then(response => response.success && response)
    })

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                    Race Position Scatter
                </CardTitle>
                <CardDescription>
                    Discover performance trends over time
                </CardDescription>
            </CardHeader>
            <CardContent>
                { isFetching && (
                    <div className="w-full h-96 flex items-center justify-center">
                        <Spinner />
                    </div>
                )}
                { data && (
                    <ChartContainer
                        config={chartConfig}
                        className="h-full">
                            <ComposedChart
                                accessibilityLayer
                                data={ data.data.all_categories }
                                margin={{
                                    right: 12,
                                }}>
                                <XAxis 
                                    dataKey='start_day'
                                    tickFormatter={(t) => format(new Date(t), 'MMM d, yyyy')}
                                    tickCount={6}/>
                                <YAxis
                                    dataKey='avg_finish_position'
                                    tickCount={5}
                                    domain={[0, 'auto']}
                                    allowDataOverflow={true}/>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent />}
                                    />
                                <Line
                                    type={"monotone"}
                                    dataKey={"rolling_avg_finish_position"}
                                    />
                                <Scatter
                                    dataKey={"avg_finish_position"}
                                    fill={"var(--primary)"}
                                    />

                            </ComposedChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}