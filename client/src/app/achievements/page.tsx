import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { achievements, certificates } from "@/lib/placeholder-data";
import { Linkedin, LucideIcon } from "lucide-react";
import { achievementIcons } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function AchievementsPage() {

  const constructLinkedInUrl = (certificate: typeof certificates[0]) => {
    const baseUrl = "https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME";
    const name = `&name=${encodeURIComponent(certificate.name)}`;
    const orgName = `&organizationName=${encodeURIComponent("Plant Paradise")}`;
    const issueYear = `&issueYear=${new Date(certificate.dateEarned).getFullYear()}`;
    const issueMonth = `&issueMonth=${new Date(certificate.dateEarned).getMonth() + 1}`;
    
    // In a real app, you would have a unique URL for each certificate
    const certUrl = `&certUrl=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin + "/achievements" : '')}`;

    return `${baseUrl}${name}${orgName}${issueYear}${issueMonth}${certUrl}`;
  };

  return (
    <div className="flex flex-1 flex-col">
      <Header title="Achievements" />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          <Tabs defaultValue="badges">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>
            <TabsContent value="badges" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {achievements.map((achievement) => {
                        const Icon = achievementIcons[achievement.icon] || achievementIcons['leaf'];
                        return (
                            <Card key={achievement.id} className="flex flex-col items-center justify-center p-6 text-center">
                                <div className="mb-4 flex size-24 items-center justify-center rounded-full bg-primary/10">
                                    <Icon className="size-12 text-primary" />
                                </div>
                                <CardHeader className="p-0">
                                    <CardTitle className="font-headline text-2xl">{achievement.name}</CardTitle>
                                    <CardDescription>Earned on {achievement.dateEarned}</CardDescription>
                                </CardHeader>
                                <CardContent className="mt-4 p-0">
                                    <p className="text-muted-foreground">{achievement.description}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </TabsContent>
            <TabsContent value="certificates" className="mt-6">
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {certificates.map((cert) => (
                        <Card key={cert.id} className="flex flex-col p-6 text-center">
                            <div className="mb-4 flex-grow">
                                <div className="mb-4 inline-block rounded-full bg-primary/10 p-4">
                                     <div className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                        <span className="font-headline text-3xl">AI</span>
                                     </div>
                                </div>
                                <CardTitle className="font-headline text-2xl">{cert.name}</CardTitle>
                                <CardDescription className="mt-1">Issued on {cert.dateEarned}</CardDescription>
                                <CardContent className="mt-4 p-0">
                                    <p className="text-muted-foreground">{cert.description}</p>
                                </CardContent>
                            </div>
                            <Button asChild>
                                <Link href={constructLinkedInUrl(cert)} target="_blank">
                                <Linkedin className="mr-2" />
                                Add to LinkedIn
                                </Link>
                            </Button>
                        </Card>
                    ))}
                 </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
