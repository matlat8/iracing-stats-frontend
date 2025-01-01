import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";



export default function ReportsCard({ custId }: { custId: number}) {

    const reports = [
        {
            title: 'Performance',
            description: 'This report shows your performance',
            link: `/drivers/${custId}/reports/performance`
        }
    ]

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Reports</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        {reports.map((report, index) => (
                            <Link href={report.link} key={index}>
                                <Button variant='default'>{report.title}</Button>
                            </Link>
                        ))}
                    </div>
                </CardContent>

            </Card>
        </div>
    )
}