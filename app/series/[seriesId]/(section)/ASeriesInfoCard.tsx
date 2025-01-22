'use client';

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {  useEffect } from "react";
import { Tag } from "~/components/Tag";
import { Card, CardContent } from "~/components/ui/card";
import { useQueryParam } from "~/src/hooks";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";


export default function ASeriesInfoCard() {

    const { seriesId } = useParams<{ seriesId: string }>();
    const [, setSeasonId] = useQueryParam<string>("seasonId", "");

    const { data } = useQuery({
        queryKey: ['series/{seriesId}', seriesId],
        queryFn: () => iRacingStatAPI.fetch(`/series/${seriesId}` as "/series/{seriesId}")
                                    .then(response => response.success && response),
    })

    const firstSeason = data && data.seasons.length > 0 && data.seasons.slice(0, 1)[0];

    useEffect(() => {
        if (firstSeason) {
            setSeasonId(String(firstSeason.season_id));
        }
    }, [firstSeason, setSeasonId]);

    const tags = firstSeason && [{
        text: 'Multi-Class',
        color: 'bg-green-500',
        visibility: firstSeason && firstSeason.multiclass
    }, {
        text: 'Official',
        color: 'bg-blue-500',
        visibility: firstSeason && firstSeason.official
    }]

    return (
        <Card>
            <CardContent className="pt-4">
                
                {data && data.seasons.length > 0 && data.seasons.slice(0, 1).map((season) => (
                    <div key={season.season_id}>
                        <h1 className="text-2xl">{season.season_name}</h1>
                        <div className="flex gap-2">
                            {tags && tags.map((tag) => (
                                tag.visibility && (
                                    <Tag key={tag.text} text={tag.text} className={tag.color} />
                                )
                            ))}
                        </div>

                        <p>{season.season_short_name}</p>
                        <p>{season.schedule_description}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}