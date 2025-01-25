import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { Button } from "~/components/ui/button";


export default function HomeHero() {
    return (
        <section className="container space-y-6 py-8 md:py-12">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl">
              iRacing Advanced Analytics
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Comprehensive analytics and insights for iRacing. Track statistics, analyze performance, and explore racing data.
            </p>
            <Link href="https://discord.gg/wCa3E8jAaw" target="new">
              <Button>
                <FaDiscord /> Discord
              </Button>
            </Link>
          </div>
        </section>
    )
}