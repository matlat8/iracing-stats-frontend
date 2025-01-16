
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FaChartBar, FaTwitch } from 'react-icons/fa'
import { Card, CardContent } from '~/components/ui/card'
import HomeHero from './(section)/Hero'
import { MdSportsMotorsports } from "react-icons/md";
import QuickAccessCard from './(section)/QuickAccessCard'


export const metadata: Metadata = {
  title: 'Home | iRacing Stat',
  description: 'Deep dive into iRacing stats across the platform. Explore statistics to gain deeper insight into your iRacing career. View statistics across the entire platform and compare your stats to others.',
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

const quickAccessCards = [{
  link: '/drivers/search',
  title: 'Driver Stats',
  icon: MdSportsMotorsports,
  description: 'Explore driver statistics and career data.'
}, {
  link: '/irating',
  title: 'iRating Distribution',
  icon: FaChartBar,
  description: 'View the distribution of iRating across the iRacing platform.'
}, {
  link: '/series',
  title: 'Series Stats',
  icon: FaChartBar,
  description: 'Analyze series participation and results.'
}, {
  link: '/teams',
  title: 'Team Stats',
  icon: FaChartBar,
  description: 'Discover team statistics and results.'
}]

export default function Home() {
  return (
    <div className='lg:max-w-7xl flex flex-col items-center mx-auto px-2'>
      <div className='py-36'>
        <HomeHero />

      </div>
      <section className='mr-auto py-8'>
        <h2 className="text-2xl font-bold tracking-tight">Quick Access</h2>
        <p className="text-muted-foreground">Jump directly to specific analytics pages</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {quickAccessCards.map((card, index) => (
          <Link href={card.link} key={index}>
            <QuickAccessCard key={index} props={card} />
          </Link>
        ))}
      </div>
      </section>
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
          <div className='flex flex-col justify-between'>
            <h2 className='text-lg font-bold'>{title}</h2>
            <div className='mt-auto'>
              <Link href={twitch} className='inline-block'>
                <FaTwitch className='transition-transform transform hover:scale-125 hover:shadow-lg text-purple-500'/>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}