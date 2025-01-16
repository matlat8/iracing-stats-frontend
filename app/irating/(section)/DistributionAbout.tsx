'use server';

import { Card, CardContent } from "~/components/ui/card";


export default async function DistributionAbout() {
    return (
        <Card className="pt-4">
            <CardContent>
                <h1 className="text-3xl font-light">iRating Distribution</h1>
                <p>View the distribution of iRating across the platform. Filter by specific licenses and time periods.</p>
            </CardContent>
        </Card>
    )
}