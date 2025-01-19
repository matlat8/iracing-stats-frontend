import { Card, CardContent } from "~/components/ui/card";


export default function SeriesInformationCard() {
    return (
        <Card>
            <CardContent className="pt-4 flex flex-col">
                <h1 className="text-3xl font-light">Series</h1>
                
                <p className="text-muted-foreground pt-4">Explore every iRacing series at a glance – dive into weekly details, historical lap times, iRating averages, participation stats, and performance trends over time, all designed to help you strategize and elevate your racing experience</p>
            </CardContent>
        </Card>
    )
}