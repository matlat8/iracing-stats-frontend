
import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '~/components/ui/card'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Deep dive into iRacing stats across the platform. Explore statistics to gain deeper insight into your iRacing career.',
  keywords: ['iRacing', 'Stats', 'Racing', 'Sim Racing', 'iRacing Stats', 'iRacing Career', 'iRacing Profile'],

}

const quickDrivers = [{
  title: 'Jimmy Broadbent',
  custId: 95469,
},
{
  title: 'Matt Malone',
  custId: 120570,
}, {
  title: 'Oliver Furnell',
  custId: 510501
},
{
  'title': 'Daniel Gray10',
  'custId': 169861
}]

export default function Home() {
  return (
    <div className='lg:max-w-5xl flex flex-col items-center mx-auto px-2'>
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
      <div className='flex items-center mt-12 w-full gap-4'>
        <div>
          <h2 className='text-2xl font-bold'>Popular Streamers</h2>
          <p>Looking around? Explore some of my most favorite iRacing streamers.</p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
            {quickDrivers.map((driver, index) => (
              <QuickDriverCard key={index} title={driver.title} custId={driver.custId} />
            ))}
          </div>

        </div>
        <div>

        </div>

      </div>
    </div>

  );
}

function QuickDriverCard({ title, custId }: { title: string, custId: number }) {
  return (
    <Link href={`/drivers/career?cust_id=${custId}`}>
      <Card className='transition-transform transform hover:scale-105 hover:shadow-lg'>
        <CardContent className='p-4'>
          <h2 className='text-lg font-bold'>{title}</h2>
        </CardContent>
      </Card>
    </Link>
  )
}