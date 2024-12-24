'use client';

import { useState } from "react";
import { Input } from "~/components/ui/input";

export default function DriverSearch() {
    const [searchDriver, setSearchDriver] = useState<string>("");


    return (
        <div>
            <Input placeholder="Search for a driver" onChange={(ctx) => (setSearchDriver(ctx.target.value))}/>
            <p>{searchDriver}</p>
        </div>
    )
}