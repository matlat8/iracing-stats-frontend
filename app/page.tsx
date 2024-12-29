
import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '~/components/ui/card'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Deep dive into iRacing stats across the platform. Explore statistics to gain deeper insight into your iRacing career.',
  keywords: ['iRacing', 'Stats', 'Racing', 'Sim Racing', 'iRacing Stats', 'iRacing Career', 'iRacing Profile'],

}

const quickDrivers = [{
  title: 'Matt Malone',
  custId: 120570,
}, {
  title: 'Oliver Furnell',
  custId: 510501
}]

export default function Home() {
  return (
    <div>
      <div className='flex'>
      <Card>
        <CardContent className='p-4'>
          <div className='text-center'>
            <h1 className='text-3xl font-bold'>Welcome to iRacing Stat</h1>
            <p>Welcome to iRacing Stat – your ultimate hub for iRacing analytics. Dive into detailed session insights, track performance metrics, and uncover actionable data about drivers and races. Elevate your competitive edge with data-driven decisions</p>
          </div>
          </CardContent>
      </Card>
      </div>
      <div className='flex items-center mt-12 w-full'>
        {quickDrivers.map((driver, index) => (
          <QuickDriverCard key={index} title={driver.title} custId={driver.custId} />
        ))}
      </div>
    </div>

  );
}

function QuickDriverCard({ title, custId }: { title: string, custId: number }) {
  return (
    <Link href={`/drivers/career?cust_id=${custId}`}>
      <div className='bg-white dark:bg-black border border-gray-200 h-16 rounded-sm m-4 p-4'>
        {title}
      </div>
    </Link>
  )
}