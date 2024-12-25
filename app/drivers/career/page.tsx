'use client'

import { Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from '~/components/Container';
import DriverStats from './(section)/DriverStats';
import UserInfo from './(section)/UserInfo';

function CareerPageContent() {
    const searchParams = useSearchParams();
    const custId = searchParams.get('cust_id');
    const router = useRouter();


    // Check if cust_id exists
    if (!custId) {
        // Redirect to '/'
        router.push('/');
        return null;
    }

    return (
        <Container className='mt-16 grid grid-cols-2 w-full gap-2'>
            <UserInfo cust_id={ Number(custId) } />
            <DriverStats cust_id={Number(custId)} />
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

