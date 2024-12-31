import { Metadata } from "next";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaGithub } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { SiApacheairflow, SiClickhouse, SiDbt, SiFastapi, SiRedis } from "react-icons/si";


export const metadata: Metadata = {
    title: 'About | iRacing Stat',
    description: 'Learn more about iRacingStat, the developer and the technologies used to build the application.',
    keywords: ['iRacing', 'iRacing data pipeline', 'iracing data', 'iracing api', 'iRacing Stats', 'iRacing Career', 'iRacing Profile'],
  }

const technologies = {
    application: [
        {
            title: "Next.js",
            icon: RiNextjsFill,
            github: "https://github.com/matlat8/iracing-stats-frontend"
        },
        {
            title: "FastAPI",
            icon: SiFastapi,
            github: "https://github.com/matlat8/iracing-stats-api"
        },
        {
            title: "Redis",
            icon: SiRedis,
        }
    ],
    data: [
        {
            title: "Airflow",
            icon: SiApacheairflow,
            github: "https://github.com/matlat8/airflow-etl"
        },
        {
            title: "Clickhouse",
            icon: SiClickhouse,
        },
        {
            title: "DBT",
            icon: SiDbt,
        }
    ]
}

export default function AboutPage() {
    return (
        <div className="flex flex-col justify-center items-center max-w-6xl mx-auto px-2">
            <div className="w-3/4">
                <h1 className="text-4xl font-bold">About iRacing Stat</h1>
                <p className="mt-4">This is a project created by a Data Engineer by day with a crippling work addiction. </p>
                <p className="pt-4">At work, we are building a data product developed similarly to iRacing Stat. This project serves as a productive test-bed to try out different approaches to different problems </p>
                <p className="pt-4">More of my personal attention to this project will be in the data pipelines & data modeling needed to facilitate the analytics for the front-end to present. I am by no means a frontend or backend developer. I encourage you to point out flaws or mistakes you see in the project.</p>
                <p className="pt-4">My goal for iRacing Stat is to provide advanced analytics for iRacing in a way that is easy to digest, but providing the user with a deeper insight into their own personal performance against players of their own skill.</p>
            </div>
            <div className="w-3/4 mt-16">
                <h2 className="text-2xl font-bold ">Technologies</h2>
                <p className="mt-4">Certain aspects of this project are open source freely on GitHub. Technologies used in iRacing Stat:</p>
                <div className="grid grid-cols-2 pt-4">
                    <div>
                        <h3 className="text-2xl font-light">Application</h3>
                        {technologies.application.map((tech, index) => (
                            <TechnologyCard key={index} {...tech} />
                        ))}
                    </div>
                    <div>
                        <h3 className="text-2xl font-light">Data</h3>
                        {technologies.data.map((tech, index) => (
                            <TechnologyCard key={index} {...tech} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

function TechnologyCard({ title, icon: Icon, github }: { title: string, icon: IconType, github?: string }) {
    return (
        <div className="p-2 pt-4 flex w-full gap-2 align-middle">
            <Icon className="text-3xl"/>
            <div className="flex flex-col justify-between">
                <h3 className="text-lg">{title}</h3>
                {github && (
                    <Link href={github}>
                        <FaGithub className="text-xl" />
                    </Link>
                )}
            </div>
        </div>
    )
}