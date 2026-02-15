import { Header } from "@/components/layout/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { marketplaceItems } from "@/lib/placeholder-data"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"

export default function MarketplacePage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header title="Marketplace" />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {marketplaceItems.map((item) => (
              <Card key={item.id} className="flex flex-col overflow-hidden">
                <div className="relative aspect-square w-full">
                  <Image
                    src={item.image.imageUrl}
                    alt={item.image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={item.image.imageHint}
                  />
                  <Badge variant="secondary" className="absolute right-2 top-2 capitalize">{item.type}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <p className="text-xl font-bold text-primary">${item.price.toFixed(2)}</p>
                  <Button>
                    <ShoppingCart className="mr-2" />
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
