"use client";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormStatus } from "react-dom";
import { useActionState, useEffect, useRef, useState } from "react";
import { identifyPlantAction, type FormState } from "../../identify/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Leaf, Camera } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Scanning...
        </>
      ) : (
        <>
          <Camera className="mr-2 h-5 w-5" />
          Scan Plant
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: "",
};

export default function ScanPage() {
  const [formState, formAction] = useActionState(
    identifyPlantAction,
    initialState
  );
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [journalForm, setJournalForm] = useState({
    name: "",
    species: "",
    dateAcquired: new Date().toISOString().split("T")[0],
    notes: "",
  });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.message && formState.message !== "success") {
      toast({
        variant: "destructive",
        title: "Scan Failed",
        description: formState.message,
      });
    } else if (formState.data) {
      // Pre-fill form with identified data
      setJournalForm({
        name: formState.data.basicInfo.commonName,
        species: formState.data.basicInfo.scientificName,
        dateAcquired: new Date().toISOString().split("T")[0],
        notes: formState.data.description.overview,
      });
      setShowForm(true);
    }
  }, [formState, toast]);

  const handleFileChange = (dataUri: string | null) => {
    setPhotoDataUri(dataUri);
    if (formState.data || formState.message) {
      formState.message = "";
      formState.data = undefined;
      setShowForm(false);
    }
  };

  const handleAddToJournal = () => {
    if (!photoDataUri) return;

    const newEntry = {
      id: Date.now().toString(),
      name: journalForm.name,
      species: journalForm.species,
      dateAcquired: journalForm.dateAcquired,
      notes: journalForm.notes.split("\n").filter((note) => note.trim()),
      image: {
        id: `user-${Date.now()}`,
        description: `Photo of ${journalForm.name}`,
        imageUrl: photoDataUri,
        imageHint: "user-uploaded",
      },
    };

    // Save to localStorage
    const existingEntries = JSON.parse(
      localStorage.getItem("journalEntries") || "[]"
    );
    existingEntries.push(newEntry);
    localStorage.setItem("journalEntries", JSON.stringify(existingEntries));

    toast({
      title: "Added to Journal",
      description: `${journalForm.name} has been added to your plant journal!`,
    });

    // Reset
    setPhotoDataUri(null);
    setShowForm(false);
    setJournalForm({
      name: "",
      species: "",
      dateAcquired: new Date().toISOString().split("T")[0],
      notes: "",
    });
    formState.data = undefined;
    formState.message = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent mb-2">
            Scan Plant for Journal
          </h1>
          <p className="text-gray-600">
            Take a photo to identify and add a plant to your journal
          </p>
        </div>

        {!showForm && (
          <Card className="shadow-2xl border-0 bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 h-2"></div>
            <form ref={formRef} action={formAction}>
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Upload Plant Photo
                </CardTitle>
                <CardDescription className="text-base">
                  Take a clear photo for best identification results
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <FileUpload onFileChange={handleFileChange} />
                <input
                  type="hidden"
                  name="photoDataUri"
                  value={photoDataUri || ""}
                />
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <SubmitButton />
              </CardFooter>
            </form>
          </Card>
        )}

        {showForm && photoDataUri && (
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-white">
              <div className="bg-gradient-to-r from-emerald-600 to-green-600 h-2"></div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-emerald-600" />
                  Plant Identified
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border-4 border-emerald-50 shadow-xl">
                    <img
                      src={photoDataUri}
                      alt="Scanned plant"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Plant Name</Label>
                      <Input
                        id="name"
                        value={journalForm.name}
                        onChange={(e) =>
                          setJournalForm({
                            ...journalForm,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="species">Scientific Name</Label>
                      <Input
                        id="species"
                        value={journalForm.species}
                        onChange={(e) =>
                          setJournalForm({
                            ...journalForm,
                            species: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateAcquired">Date Acquired</Label>
                      <Input
                        id="dateAcquired"
                        type="date"
                        value={journalForm.dateAcquired}
                        onChange={(e) =>
                          setJournalForm({
                            ...journalForm,
                            dateAcquired: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={journalForm.notes}
                        onChange={(e) =>
                          setJournalForm({
                            ...journalForm,
                            notes: e.target.value,
                          })
                        }
                        placeholder="Add any notes about this plant..."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 space-x-4">
                <Button
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Scan Another
                </Button>
                <Button
                  onClick={handleAddToJournal}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                >
                  Add to Journal
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
