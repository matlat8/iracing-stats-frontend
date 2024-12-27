"use client"

import { useQuery } from "@tanstack/react-query"
import { iRacingStatAPI } from "~/src/iRacingStatAPI"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function IRatingChart({ custId }: { custId: number }) {
  const { data } = useQuery({
    queryKey: ["/drivers/{custId}/irating", custId],
    queryFn: () => iRacingStatAPI.fetch(`/drivers/${custId}/irating` as "/drivers/{custId}/irating")
        .then(response => response && response.success && response.data )
  })

  return (
    <div>
        {data && (
        <Card>
          <CardHeader>
            <CardTitle>iRating</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={data}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="race_date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  tickFormatter={(value) => value.split("T")[0]}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line
                  dataKey="formulacar_ir"
                  type="monotone"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={true}
                  connectNulls={true}
                />
                <Line
                  dataKey="sportscar_ir"
                  label="Sports Car"
                  type="monotone"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={true}
                  connectNulls={true}
                />
                <Line
                  dataKey="oval_ir"
                  label="Oval iR"
                  type="monotone"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={true}
                  connectNulls={true}
                />
                <Line
                  dataKey="road_ir"
                  label="Road iR"
                  type="monotone"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                  dot={true}
                  connectNulls={true}
                />
                <Line
                  dataKey="dirtroad_ir"
                  label="Dirt Road iR"
                  type="monotone"
                  stroke="hsl(var(--chart-5))"
                  strokeWidth={2}
                  dot={true}
                  connectNulls={true}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Showing total visitors for the last 6 months
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
        )}



    </div>
  )
}
