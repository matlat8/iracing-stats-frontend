'use client';
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";
import { useQueryParam } from "~/src/hooks";


export default function SeriesInformationCard() {
    const [, setSelectedCategories] = useQueryParam('categories', '')
    const { data } = useQuery({
        queryKey: ['series/this_week'],
        queryFn: () => iRacingStatAPI.fetch('/series/this_week')
                    .then(response => response.success && response.data)
    })

    const handleCategoryChange = (category: string | string[]) => {
        setSelectedCategories(category.toString())
    }

    const uniqueCategories = data && data.map(series => series.license_category).filter((value, index, self) => self.indexOf(value) === index)

    return (
        <Card className="h-full">
            <CardContent className="pt-4 flex flex-col">
                <h1 className="text-3xl font-light">Series</h1>

                <p className="text-muted-foreground pt-4">Explore every iRacing series at a glance – dive into weekly details, historical lap times, iRating averages, participation stats, and performance trends over time, all designed to help you strategize and elevate your racing experience</p>
            </CardContent>
            <CardFooter className="mt-auto align-bottom h-full">
                <div className="flex gap-2">
                    <ToggleGroup type="multiple" onValueChange={(e) => handleCategoryChange(e)}>
                        {uniqueCategories && uniqueCategories.map((category) => (
                            <ToggleGroupItem key={category} 
                                            value={category}
                                            >
                                {category}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </div>
            </CardFooter>
        </Card>
    )
}