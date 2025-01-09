import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";


export default function TopTrack({ custId }: { custId: number }) {

    const { data } = useQuery({
        queryKey: ["/drivers/{custId}/tracks", custId],
        queryFn: () => iRacingStatAPI.fetch(`/drivers/${custId}/tracks` as "/drivers/{custId}/tracks")
            .then(response => response && response.success && response ),
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Most Performant Tracks</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
                {data && data.data.slice(0, 3).map((track, index) => (
                    <Card key={index}>
                        <CardContent className="pt-4">
                            <p className="truncate font-light">{track.track}</p>
                            <div className="flex justify-between items-center pt-4">
                                <div>
                                    <p className="text-muted-foreground font-bold">iR +/-</p>
                                    <p className={`${track.ir_change > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}`}>{track.ir_change > 0 ? '+' : ''}{track.ir_change}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground font-bold">CPI +/-</p>
                                    <p className="text-muted-foreground">{track.cpi_change}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}