
import { Metadata } from "next";
import TopDriversThisSeason from "../[custId]/career/TopDriversThisSeason";
import SearchResultsTable from "./(section)/SearchResultsTable";

export const metadata: Metadata = {
    title: 'Search for Drivers | iRacing Stats'
  }

export default function DriverSearch() {
    return (
        <div className="grid lg:grid-cols-2 md:grid-cols-1 justify-center items-center max-w-7xl mx-auto px-2 gap-4 ">
            <div>
                <SearchResultsTable />
            </div>
            <div>
                <TopDriversThisSeason />
            </div>

        </div>
    )
}

