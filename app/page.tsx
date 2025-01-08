
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FaTwitch } from 'react-icons/fa'
import { Card, CardContent } from '~/components/ui/card'


export const metadata: Metadata = {
  title: 'Home',
  description: 'Deep dive into iRacing stats across the platform. Explore statistics to gain deeper insight into your iRacing career.',
  keywords: ['iRacing', 'Stats', 'Racing', 'Sim Racing', 'iRacing Stats', 'iRacing Career', 'iRacing Profile'],

}

const quickDrivers = [{
  title: 'Jimmy Broadbent',
  custId: 95469,
  image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/22fcda0e-b0b5-4e11-94bb-fd0337839cc0-profile_image-70x70.png',
  twitch: 'https://www.twitch.tv/jimmy_broadbent'
},
{
  title: 'Matt Malone',
  custId: 120570,
  image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/175dc11f-8f5a-4f4e-8beb-e0e4689ed5d1-profile_image-70x70.png',
  twitch: 'https://www.twitch.tv/mattmalone'
}, {
  title: 'Oliver Furnell',
  custId: 510501,
  image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/d7679423-050b-4f83-ba9a-8de0b864edc8-profile_image-70x70.png',
  twitch: 'https://www.twitch.tv/basicollie'
},
{
  title: 'Daniel Gray10',
  custId: 169861,
  image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/d185e49d-0a2d-4bb6-9fbc-a67c87a93796-profile_image-70x70.png',
  twitch: 'https://www.twitch.tv/danielgray10'
},
{
  title: 'Dave Cameron',
  custId: 259565,
  image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/6c81d4d6-1cf9-4c0f-ba4f-397bb7d4bdb5-profile_image-70x70.png',
  twitch: 'https://www.twitch.tv/davecam'
}]

export default function Home() {
  return (
    <div className='lg:max-w-7xl flex flex-col items-center mx-auto px-2'>
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
          <p>Looking around? Explore some top iRacing streamers.</p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
            {quickDrivers.map((driver, index) => (
              <QuickDriverCard key={index} title={driver.title} custId={driver.custId} image={driver.image} twitch={driver.twitch}/>
            ))}
          </div>

        </div>
        <div>

        </div>

      </div>
    </div>

  );
}

function QuickDriverCard({ title, custId, image, twitch }: { title: string, custId: number, image: string, twitch: string }) {
  return (
    <Link href={`/drivers/${custId}/career`}>
      <Card className='transition-transform transform hover:scale-105 hover:shadow-lg'>
        <CardContent className='p-4 flex gap-2'>
          <Image src={image} width={70} height={70} alt={title} className='rounded-full'/>
          <div>
            <h2 className='text-lg font-bold'>{title}</h2>
            <Link href={twitch}>
              <FaTwitch className='transition-transform transform hover:scale-125 hover:shadow-lg text-purple-500'/>
            </Link>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}