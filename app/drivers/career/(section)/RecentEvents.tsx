'use client'

import { useQuery } from "@tanstack/react-query"
import Error from "~/components/Error"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Skeleton } from "~/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { iRacingStatAPI } from "~/src/iRacingStatAPI"

export default function RecentEvents({ custId }: { custId: number }) {
    const { data, isFetching, isError } = useQuery({
        queryKey: ["/drivers/{custId}/events?limit=10", custId],
        queryFn: () => iRacingStatAPI.fetch(`/drivers/${custId}/events?limit=10` as "/drivers/{custId}/events")
        .then(response => response && response.success && response.data ),
    })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Events</CardTitle>
      </CardHeader>
      <CardContent>
        {isError && <Error message="Error fetching recent events" className="w-full h-full"/>}
        {isFetching && (<Skeleton className="w-full h-full" />)}
        
        {data && data.length === 0 && <p>No recent events</p>}
        {data && data.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Track</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>iRating Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((event, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(event.start_time).toISOString().split('T')[0]}</TableCell>
                <TableCell>{event.track[2]} - {event.track[0]}</TableCell>
                <TableCell>{event.license_category}</TableCell>
                <TableCell>{event.finish_position_in_class}</TableCell>
                <TableCell className={(event.newi_rating - event.oldi_rating ) > 0 ? "text-green-600" : "text-red-600"}>
                  {(event.newi_rating - event.oldi_rating ) > 0 ? "+" : ""}{(event.newi_rating - event.oldi_rating )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}

      </CardContent>
    </Card>
  )
}

