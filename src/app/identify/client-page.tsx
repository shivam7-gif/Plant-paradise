"use client"

import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useFormStatus } from "react-dom"
import { useActionState, useEffect, useRef, useState } from "react"
import { identifyPlantAction, type FormState } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Identifying...
        </>
      ) : (
        "Identify Plant"
      )}
    </Button>
  )
}

const initialState: FormState = {
  message: "",
}

export default function IdentifyClientPage() {
  const [formState, formAction] = useActionState(identifyPlantAction, initialState)
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null)
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (formState.message && formState.message !== "success") {
      toast({
        variant: "destructive",
        title: "Identification Failed",
        description: formState.message,
      })
    }
  }, [formState, toast])
  
  const handleFileChange = (dataUri: string | null) => {
    setPhotoDataUri(dataUri);
    // Clear previous results when a new file is uploaded
    if (formState.data || formState.message) {
      formState.message = "";
      formState.data = undefined;
    }
  };


  return (
    <>
      <Card>
        <form ref={formRef} action={formAction}>
          <CardContent className="p-6">
            <FileUpload onFileChange={handleFileChange} />
            <input type="hidden" name="photoDataUri" value={photoDataUri || ""} />
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      {formState.data && (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">{formState.data.name}</CardTitle>
            <CardDescription className="italic">{formState.data.latinName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
                <h3 className="font-headline text-xl mb-2">Description</h3>
                <p className="text-muted-foreground">{formState.data.description}</p>
            </div>
            <Separator />
            <div>
                <h3 className="font-headline text-xl mb-2">Care Information</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{formState.data.careInformation}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
