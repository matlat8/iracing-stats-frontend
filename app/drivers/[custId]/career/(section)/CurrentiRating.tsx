'use client'

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "~/components/ui/card"
import { Skeleton } from "~/components/ui/skeleton"
import { iRacingStatAPI } from "~/src/iRacingStatAPI"
import { cn } from "~/src/utils"
import { DirtOvalIcon, DirtRoadIcon, FormulaCarIcon, OvalIcon, SportsCarIcon } from "~/components/icons/iracing"

export default function CurrentiRating({ custId }: { custId: number }) {

    const { data } = useQuery({
        queryKey: ['/drivers/{custId}/irating', custId],
        queryFn: () => iRacingStatAPI.fetch(`/drivers/${custId}/irating` as '/drivers/{custId}/irating')
                    .then(response => response && response.success && response )
    })

    return (
        <Card>
            <CardContent className="px-0">
                <div className="grid grid-cols-2 text-center">
                    <IRatingBlock title="Dirt Road" 
                                    value={ data && data?.current?.find(item => item.license_category === 'Dirt Road')?.newi_rating } 
                                    className="border-r"
                                    svg={<DirtRoadIcon /> }/>
                    <IRatingBlock title="Dirt Oval" 
                                    value={ data && data?.current?.find(item => item.license_category === 'Dirt Oval')?.newi_rating } 
                                    svg={<DirtOvalIcon /> }
                                    />
                    <IRatingBlock title="Formula Car" 
                                    value={ data && data?.current?.find(item => item.license_category === 'Formula Car')?.newi_rating } 
                                    className="border-r" 
                                    svg={<FormulaCarIcon />}/>
                    <IRatingBlock title="Oval" 
                                    value={ data && data?.current?.find(item => item.license_category === 'Oval')?.newi_rating } 
                                    svg={<OvalIcon />}/>
                    <div className="col-span-2 pt-2">
                        <div className="flex gap-2 items-center justify-center">
                            <div className="h-12 w-12 rounded-xl bg-primary p-2 text-white">
                                <SportsCarIcon />
                            </div>
                            <p className="font-semibold text-xs">Sports Car</p>
                            <p>{ data && data?.current?.find(item => item.license_category === 'Sports Car')?.newi_rating }</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

interface IRatingBlockProps {
    title: string
    value: number | undefined | false
    svg?: React.ReactNode
    className?: string
}

export function IRatingBlock({ title, value, svg, className }: IRatingBlockProps) {
    return (
        <div className={cn('w-full text-center border-b py-2', className)}>
            { svg && (
                <div className="h-12 w-12 mx-auto rounded-xl bg-primary p-2 text-white">
                    {svg}
                </div>
            ) }
            { !svg && <Skeleton className="w-16 h-12 mx-auto rounded-xl" />}
            <p className="font-semibold text-xs pt-1">{ title }</p>

            { !value && (
                <Skeleton className="w-16 h-8 mx-auto rounded-xl" />
            ) }
            { value && (
                <p>{ value }</p>
            )}
        </div>
    )
}