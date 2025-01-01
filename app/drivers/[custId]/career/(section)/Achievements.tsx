import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Trophy, Star, Flag, Award } from 'lucide-react'

const achievements = [
  { title: "Race Winner", icon: Trophy, description: "Won a race in any category" },
  { title: "Podium Finisher", icon: Star, description: "Finished in the top 3 in 10 races" },
  { title: "Century Club", icon: Flag, description: "Completed 100 races" },
  { title: "iRating Milestone", icon: Award, description: "Reached 2000 iRating in any category" },
]

export default function Achievements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Badge variant="secondary" className="p-2">
                <achievement.icon className="h-4 w-4" />
              </Badge>
              <div>
                <p className="font-medium">{achievement.title}</p>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

