import { useQuery } from "@tanstack/react-query"
import { TbMathAvg, TbMathFunction } from "react-icons/tb";
import { BsAlignMiddle } from "react-icons/bs";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { Card, CardContent } from "~/components/ui/card";
import { useQueryParam } from "~/src/hooks";
import { iRacingStatAPI } from "~/src/iRacingStatAPI";
import { useAutoAnimate } from "@formkit/auto-animate/react";


export default function DistributionKPIs() {

    const [ period, ] = useQueryParam<string>("period", "");
    const [ license, ] = useQueryParam<string>("license", "");
    
    const { data, isFetching } = useQuery({
        queryKey: ["irating", "distribution", period, license],
        queryFn: () => iRacingStatAPI.fetch(`/irating/distribution?&period=${period}&license=${license}` as "/irating/distribution")
            .then(response => response && response.success && response)
    })

    const kpis = data && [{
        label: "Active Drivers",
        icon: GiFullMotorcycleHelmet,
        value: data.kpis.active_drivers
    }, {
        label: "Median iRating",
        icon: BsAlignMiddle,
        value: Math.round(data.kpis.median_irating),
        yagoValue: Math.round(data.kpis.yago_median_irating)
    }, {
        label: "Rating Std Dev",
        icon: TbMathFunction,
        value: Math.round(data.kpis.rating_std_dev),
        yagoValue: data.kpis.yago_rating_std_dev
    }, {
        label: "Avg iRating",
        icon: TbMathAvg,
        value: Math.round(data.kpis.avg_irating),
        yagoValue: Math.round(data.kpis.yago_avg_irating)
    }]

    const [ animate ] = useAutoAnimate()
    
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4" ref={ animate }>
        {isFetching && Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="flex items-center justify-center pt-4">
                <CardContent className="flex flex-col items-center justify-center">
                    <div className="bg-gray-300 dark:bg-gray-700 h-16 w-16 rounded-full flex items-center justify-center shadow-sm">
                        <div className="animate-pulse bg-gray-400 h-8 w-8 rounded-full"></div>
                    </div>
                    <h2 className="text-center mt-2 animate-pulse bg-gray-400 h-4 w-24 rounded"></h2>
                    <p className="font-bold text-2xl text-center animate-pulse bg-gray-400 h-6 w-16 rounded mt-2"></p>
                </CardContent>
            </Card>
        ))}
        {kpis && kpis.map(kpi => (
            <Card key={kpi.label} className="flex items-center justify-center pt-4">
                <CardContent className="flex flex-col items-center justify-center">
                    <div className="bg-red-400 dark:bg-red-700 h-16 w-16 rounded-full flex items-center justify-center shadow-sm">
                        {kpi.icon && <kpi.icon className="text-white text-3xl" />}
                    </div>
                    <h2 className="text-center mt-2">{kpi.label}</h2>
                    <p className="font-bold text-2xl text-center">{kpi.value}</p>
                </CardContent>
            </Card>
        ))}
        </div>
    )
}