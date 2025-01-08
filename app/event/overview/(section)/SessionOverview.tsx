'use client'

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Thermometer } from 'lucide-react'
import { useQuery } from "@tanstack/react-query"
import { iRacingStatAPI } from "~/src/iRacingStatAPI"
import { Skeleton } from "~/components/ui/skeleton"

export function SessionOverview({ session_id }: { session_id: number }) {
    const { data, isFetching, isError } = useQuery({
        queryKey: ["/session", session_id],
        queryFn: () => iRacingStatAPI.fetch(`/sessions/${session_id}` as "/sessions/{sessionId}")
            .then(response => response && response.success && response.data ),
    })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {isError && <p>Error fetching session</p>}
        {isFetching && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Track</p>
                    <Skeleton className="w-48 h-32" />
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Series</p>
                    <Skeleton className="w-48 h-32" />
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Date</p>
                    <Skeleton className="w-48 h-32" />
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground"># Participants</p>
                    <Skeleton className="w-48 h-32" />
                </div>
                <div className="col-span-full">
                    <Skeleton className="w-full h-24" />
                </div>
            </div>
        )}

        {data && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Track</p>
            <p className="text-xl font-bold">{data.track_name} {data.track_config}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Series</p>
            <p className="text-xl font-bold">{data.series_name}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Date</p>
            <p className="text-xl font-bold">{new Date(data.start_time).toLocaleDateString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground"># Participants</p>
            <p className="text-xl font-bold">{data.num_drivers}</p>
          </div>
          <div className="col-span-full">
            <div className="grid grid-cols-3 gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Weather Data</p>
                  <p className="text-sm text-muted-foreground">Coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

      </CardContent>
    </Card>
  )
}

