import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { journalEntries } from "@/lib/placeholder-data"
import Image from "next/image"
import Link from "next/link"

export default function JournalPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header title="Plant Journal" />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto grid max-w-6xl gap-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {journalEntries.map((entry) => (
                    <Link href={`/journal/${entry.id}`} key={entry.id} className="group">
                        <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-1">
                            <div className="relative aspect-[3/4] w-full">
                                <Image
                                    src={entry.image.imageUrl}
                                    alt={entry.image.description}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                    data-ai-hint={entry.image.imageHint}
                                />
                            </div>
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">{entry.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{entry.species}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
      </main>
    </div>
  )
}
