"use client"

import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useFormStatus } from "react-dom"
import { useActionState, useEffect, useRef, useState } from "react"
import { diagnosePlantAction, type FormState } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { HeartPulse, Loader2, Syringe } from "lucide-react"
import { Separator } from "@/components/ui/separator"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Diagnosing...
        </>
      ) : (
        "Diagnose Plant Health"
      )}
    </Button>
  )
}

const initialState: FormState = {
  message: "",
}

export default function DiagnoseClientPage() {
  const [formState, formAction] = useActionState(diagnosePlantAction, initialState)
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null)
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (formState.message && formState.message !== "success") {
      toast({
        variant: "destructive",
        title: "Diagnosis Failed",
        description: formState.message,
      })
    }
  }, [formState, toast])

  const handleFileChange = (dataUri: string | null) => {
    setPhotoDataUri(dataUri);
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
             <div className="flex items-center gap-2 font-headline text-3xl">
                <HeartPulse className="size-8 text-primary" />
                Health Diagnosis
             </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground whitespace-pre-wrap">{formState.data.diagnosis}</p>
            <Separator />
            <div>
                 <h3 className="font-headline text-xl mb-2 flex items-center gap-2">
                    <Syringe className="size-6 text-primary" />
                    Recommended Cure
                 </h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{formState.data.cure}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
