'use client'

import { useRouter, useSearchParams } from "next/navigation";

export default function CareerPage() {

    
    const searchParams = useSearchParams();
    const cust_id = searchParams.get('cust_id');
    const router = useRouter();

    // Check if cust_id exists
    if (!cust_id) {
        // Redirect to '/'
        router.push('/');
        return null;
    }
    return (
        <div>
        <h1>Career Page {cust_id}</h1>
        </div>
    )
}