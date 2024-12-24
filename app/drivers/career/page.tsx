'use client'

import { Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from '~/components/Container';

function CareerPageContent() {
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
        <Container>
            <h1>Career Page {cust_id}</h1>
        </Container>
    );
}

export default function CareerPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CareerPageContent />
        </Suspense>
    );
}