import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Trophy, Flag, Star, TrendingUp } from 'lucide-react'
import { useQuery } from "@tanstack/react-query"
import { iRacingStatAPI } from "~/src/iRacingStatAPI"
import { Skeleton } from "~/components/ui/skeleton"



export default function OverallStats({ cust_id }: { cust_id: number }) {
    const { data, isFetching } = useQuery({
        queryKey: ["/drivers", cust_id],
        queryFn: () => iRacingStatAPI.fetch(`/drivers/${cust_id}` as "/drivers/{custId}")
            .then(response => response && response.success && response ),
    })

    const stats = (data && ([
        { title: "Total Races", value: data.information.total_races, icon: Flag },
        { title: "Wins", value: data.wins.total_wins, icon: Trophy },
        { title: "Top 5 Finishes", value: data.information.top_5, icon: Star },
        { title: "Podiums", value: data.information.podiums, icon: TrendingUp },
      ]))

  return (
    <div className="max-h-max">
        {isFetching && (
            <div className="w-full h-32">
                <Skeleton className="w-full h-full" />
            </div>
            )}
        {data && (
        <Card>
          <CardHeader>
            <CardTitle>{data.information.display_name} - Overall Stats</CardTitle>
          </CardHeader>
          <CardContent>

            {data && (
            <div className="grid grid-cols-2 gap-4">
                {stats && stats.map((stat) => (
                <div key={stat.title} className="flex items-center space-x-2">
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium leading-none">{stat.title}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                </div>
            </div>
            ))}
          </div>
            )}

          </CardContent>
        </Card>
        )}

    </div>
    )
}