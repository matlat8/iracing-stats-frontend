'use client'

import { Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from '~/components/Container';
import { Skeleton } from '~/components/ui/skeleton';
import { iRacingStatAPI } from '~/src/iRacingStatAPI';
import { useQuery } from '@tanstack/react-query';
import DriverStats from './(section)/DriverStats';

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

interface UserInfoProps {
    cust_id: number;
}

function UserInfo({ cust_id }: UserInfoProps) {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["/drivers", cust_id],
        enabled: cust_id > 0,
        queryFn: () => iRacingStatAPI.fetch(`/drivers/${cust_id}` as "/drivers/{custId}")
            .then(response => response && response.success && response ),
    })

    return (
        <div className='w-full flex flex-col gap-2'>

            <div className='bg-white rounded-md p-4 border border-gray-200 shadow-sm'>
                {isLoading && <Skeleton className='w-full h-full'/>}
                {isError && <p>Error</p>}
                {data && 
                <div className='text-center py-16'>
                    <p className='font-bold text-2xl'>{data.information.display_name}</p>
                    <p>{data.information.club_name} {data.information.country_code}</p>
                </div>
                }
            </div>
            {isLoading && <Skeleton className='w-full h-16 border border-gray-200'/>}

            {isError && (
            <div className='bg-white border-red-500 rounded-md w-full p-8'>
                <p className='text-center'>Error: {error.message}</p>
            </div>
            )}

            {data && (
            <div className='bg-white rounded-md p-4 flex border border-gray-200 justify-between shadow-sm'>
                <div>
                    <p>Road</p>
                    <p>{data.information.road_rating || 1350}</p>
                </div>
                <div>
                    <p>Oval</p>
                    <p>{data.information.oval_rating || 1350}</p>
                </div>
                <div>
                    <p>Dirt Oval</p>
                    <p>{data.information.dirt_oval_rating || 1350}</p>
                </div>
                <div>
                    <p>Dirt Road</p>
                    <p>{data.information.dirt_road_rating || 1350}</p>
                </div>
                <div>
                    <p>Sports Car</p>
                    <p>{data.information.sports_car_rating || 1350}</p>
                </div>
                <div>
                    <p>Formula Car</p>
                    <p>{data.information.formula_car_rating || 1350}</p>
                </div>
            </div>
            )}
        </div>
    );
}