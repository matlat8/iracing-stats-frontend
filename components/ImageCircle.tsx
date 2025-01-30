"use client"

import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"

interface ImageCircleProps {
    images: {
      url: string
      title: string
    }[]
    size?: number
  }
  

export default function ImageCircle({ images, size = 90 }: ImageCircleProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4 justify-center items-center w-full">
      {images.map((image, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="relative aspect-square rounded-full overflow-hidden border-2 border-border hover:border-primary transition-colors"
                style={{ width: size }}
              >
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes={`${size}px`}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{image.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}

