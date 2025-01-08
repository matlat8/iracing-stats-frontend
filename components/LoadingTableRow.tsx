import { Skeleton } from "./ui/skeleton";
import { TableCell, TableRow } from "./ui/table";


type LoadingTableRowProps = {
    
    // number of columns to create
    cols: number;
}

export default function LoadingTableRow(props: LoadingTableRowProps) {
    return (
            <TableRow>
                {Array.from({ length: props.cols }, (_, i) => (
                    <TableCell key={ i }>
                        <Skeleton className="w-full h-8 shimmer"/>
                    </TableCell>
                ))}
            </TableRow>
    )

}