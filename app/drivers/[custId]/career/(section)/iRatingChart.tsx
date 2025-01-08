"use client"

import { useQuery } from "@tanstack/react-query"
import { iRacingStatAPI } from "~/src/iRacingStatAPI"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "~/components/ui/chart"
import { Skeleton } from "~/components/ui/skeleton"
import { useAutoAnimate } from "@formkit/auto-animate/react"

const chartConfig = {
  oval_ir: {
    label: "Oval iR",
    color: "hsl(var(--chart-1))",
  },
  road_ir: {
    label: "Road iR",
    color: "hsl(var(--chart-2))",
  },
  sportscar_ir: {
      label: "Sports Car",
      color: "hsl(var(--chart-3))",
  },
  formulacar_ir: {
      label: "Formula Car",
      color: "hsl(var(--chart-4))",
  },
  dirtroad_ir: {
      label: "Dirt Road iR",
      color: "hsl(var(--chart-5))",
  },


} satisfies ChartConfig

export default function IRatingChart({ custId }: { custId: number }) {
  const { data, isFetching } = useQuery({
    queryKey: ["/drivers/{custId}/irating", custId],
    queryFn: () => iRacingStatAPI.fetch(`/drivers/${custId}/irating` as "/drivers/{custId}/irating")
        .then(response => response && response.success && response.data )
  })

  const [ animate ] = useAutoAnimate()

  return (
    <div>
        <Card>
          <CardHeader>
            <CardTitle>iRating</CardTitle>
          </CardHeader>
          <CardContent ref={ animate }>
          {isFetching && (
            <div className="w-full min-h-36 max-h-64">
                <Skeleton className="w-full h-auto shimmer"/>
            </div>
          )}
          {data && (
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
                  name="Formula Car"
                  type="monotone"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                  connectNulls={true}
                />
                <Line
                  dataKey="sportscar_ir"
                  name="Sports Car"
                  type="monotone"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={false}
                  connectNulls={true}
                />
                <Line
                  dataKey="oval_ir"
                  name="Oval iR"
                  type="monotone"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={false}
                  connectNulls={true}
                />
                <Line
                  dataKey="road_ir"
                  name="Road iR"
                  type="monotone"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                  dot={false}
                  connectNulls={true}
                />
                <Line
                  dataKey="dirtroad_ir"
                  name="Dirt Road iR"
                  type="monotone"
                  stroke="hsl(var(--chart-5))"
                  strokeWidth={2}
                  dot={false}
                  connectNulls={true}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
            )}
          </CardContent>
        </Card>




    </div>
  )
}
