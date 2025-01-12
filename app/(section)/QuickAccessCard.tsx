import { IconType } from "react-icons";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface QuickAccessCardProps {
    title: string;
    icon: IconType;
    description: string;
}

export default function QuickAccessCard({ props }: { props: QuickAccessCardProps }) {
    return (
        <Card className="transition-colors hover:bg-muted/50">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <props.icon className="h-5 w-5" />
                    <CardTitle className="text-base">{props.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                {props.description}
                </p>
        </CardContent>
      </Card>
    )
}