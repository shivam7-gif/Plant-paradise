"use client";

import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/file-upload";
import { journalEntries } from "@/lib/placeholder-data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { identifyPlantAction, type FormState } from "../../identify/actions";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Leaf,
  Camera,
  X,
  Edit,
  Plus,
  Droplets,
  Trash2,
} from "lucide-react";
import type { JournalEntry } from "@/lib/placeholder-data";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 transition-all duration-200"
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

export default function JournalPage() {
  const [allEntries, setAllEntries] = useState<JournalEntry[]>([]);
  const [showScan, setShowScan] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
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
  const [addPlantForm, setAddPlantForm] = useState({
    name: "",
    species: "",
    dateAcquired: new Date().toISOString().split("T")[0],
    notes: "",
    imageUrl: "",
  });
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [wateredPlants, setWateredPlants] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  // Load entries on mount
  useEffect(() => {
    const userEntries = JSON.parse(
      localStorage.getItem("journalEntries") || "[]"
    );
    setAllEntries([...journalEntries, ...userEntries]);
  }, []);

  // Handle scan results
  useEffect(() => {
    if (formState.message && formState.message !== "success") {
      toast({
        variant: "destructive",
        title: "Scan Failed",
        description: formState.message,
      });
    } else if (formState.data) {
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
    if (!photoDataUri || !journalForm.name.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide at least a plant name.",
      });
      return;
    }

    const newEntry: JournalEntry = {
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

    const existingEntries = JSON.parse(
      localStorage.getItem("journalEntries") || "[]"
    );
    existingEntries.push(newEntry);
    localStorage.setItem("journalEntries", JSON.stringify(existingEntries));

    setAllEntries([...allEntries, newEntry]);

    toast({
      title: "🌱 Added to Journal",
      description: `${journalForm.name} has been added to your plant journal!`,
    });

    resetScanForm();
  };

  const handleAddPlantManually = () => {
    if (!addPlantForm.name.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide at least a plant name.",
      });
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      name: addPlantForm.name,
      species: addPlantForm.species,
      dateAcquired: addPlantForm.dateAcquired,
      notes: addPlantForm.notes.split("\n").filter((note) => note.trim()),
      image: {
        id: `user-${Date.now()}`,
        description: `Photo of ${addPlantForm.name}`,
        imageUrl:
          addPlantForm.imageUrl ||
          "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=600&h=800&fit=crop",
        imageHint: "user-uploaded",
      },
    };

    const existingEntries = JSON.parse(
      localStorage.getItem("journalEntries") || "[]"
    );
    existingEntries.push(newEntry);
    localStorage.setItem("journalEntries", JSON.stringify(existingEntries));

    setAllEntries([...allEntries, newEntry]);

    toast({
      title: "🌱 Added to Journal",
      description: `${addPlantForm.name} has been added to your plant journal!`,
    });

    resetAddForm();
    setShowAddDialog(false);
  };

  const resetScanForm = () => {
    setPhotoDataUri(null);
    setShowForm(false);
    setShowScan(false);
    setJournalForm({
      name: "",
      species: "",
      dateAcquired: new Date().toISOString().split("T")[0],
      notes: "",
    });
    formState.data = undefined;
    formState.message = "";
  };

  const resetAddForm = () => {
    setAddPlantForm({
      name: "",
      species: "",
      dateAcquired: new Date().toISOString().split("T")[0],
      notes: "",
      imageUrl: "",
    });
  };

  const handleDeleteEntry = (entryId: string) => {
    const userEntries = allEntries.filter(
      (entry) => !journalEntries.some((je) => je.id === entry.id)
    );
    const updatedUserEntries = userEntries.filter(
      (entry) => entry.id !== entryId
    );

    localStorage.setItem("journalEntries", JSON.stringify(updatedUserEntries));
    setAllEntries(allEntries.filter((entry) => entry.id !== entryId));

    toast({
      title: "Removed",
      description: "Plant has been removed from your journal.",
    });
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (!editingEntry) return;

    const updatedEntries = allEntries.map((entry) =>
      entry.id === editingEntry.id ? editingEntry : entry
    );

    // Update localStorage
    const userEntries = updatedEntries.filter(
      (entry) => !journalEntries.some((je) => je.id === entry.id)
    );
    localStorage.setItem("journalEntries", JSON.stringify(userEntries));

    setAllEntries(updatedEntries);
    setEditingEntry(null);
    setShowEditDialog(false);

    toast({
      title: "Updated",
      description: `${editingEntry.name} has been updated!`,
    });
  };

  const handleWaterPlant = (entryId: string) => {
    const newWateredPlants = new Set(wateredPlants);
    newWateredPlants.add(entryId);
    setWateredPlants(newWateredPlants);

    toast({
      title: "Watered!",
      description: "Thanks for pouring water!",
    });
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <Header title="Plant Journal" />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Leaf className="h-10 w-10 text-emerald-600" />
              <h1 className="text-4xl font-bold text-gray-900">
                My Plant Journal
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Track your plant collection, scan new plants, and watch your
              garden grow
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-6 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  <Plus className="mr-2 h-6 w-6" />
                  Add New Plant
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <Plus className="h-6 w-6 text-emerald-600" />
                    Add New Plant
                  </DialogTitle>
                  <DialogDescription>
                    Manually add a plant to your journal with custom details.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-name" className="text-base font-medium">
                      Plant Name *
                    </Label>
                    <Input
                      id="add-name"
                      value={addPlantForm.name}
                      onChange={(e) =>
                        setAddPlantForm({
                          ...addPlantForm,
                          name: e.target.value,
                        })
                      }
                      placeholder="e.g., Monstera Deliciosa"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="add-species"
                      className="text-base font-medium"
                    >
                      Scientific Name
                    </Label>
                    <Input
                      id="add-species"
                      value={addPlantForm.species}
                      onChange={(e) =>
                        setAddPlantForm({
                          ...addPlantForm,
                          species: e.target.value,
                        })
                      }
                      placeholder="e.g., Monstera deliciosa"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-date" className="text-base font-medium">
                      Date Acquired
                    </Label>
                    <Input
                      id="add-date"
                      type="date"
                      value={addPlantForm.dateAcquired}
                      onChange={(e) =>
                        setAddPlantForm({
                          ...addPlantForm,
                          dateAcquired: e.target.value,
                        })
                      }
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="add-notes"
                      className="text-base font-medium"
                    >
                      Notes
                    </Label>
                    <Textarea
                      id="add-notes"
                      value={addPlantForm.notes}
                      onChange={(e) =>
                        setAddPlantForm({
                          ...addPlantForm,
                          notes: e.target.value,
                        })
                      }
                      placeholder="Add care instructions, location, or any other notes..."
                      className="min-h-[100px]"
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="add-image"
                      className="text-base font-medium"
                    >
                      Image URL (Optional)
                    </Label>
                    <Input
                      id="add-image"
                      value={addPlantForm.imageUrl}
                      onChange={(e) =>
                        setAddPlantForm({
                          ...addPlantForm,
                          imageUrl: e.target.value,
                        })
                      }
                      placeholder="https://example.com/plant-image.jpg"
                      className="h-11"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddDialog(false);
                      resetAddForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddPlantManually}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                  >
                    Add Plant
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <Edit className="h-6 w-6 text-emerald-600" />
                    Edit Plant
                  </DialogTitle>
                  <DialogDescription>
                    Update the details of your plant.
                  </DialogDescription>
                </DialogHeader>
                {editingEntry && (
                  <div className="grid gap-6 py-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="edit-name"
                        className="text-base font-medium"
                      >
                        Plant Name *
                      </Label>
                      <Input
                        id="edit-name"
                        value={editingEntry.name}
                        onChange={(e) =>
                          setEditingEntry({
                            ...editingEntry,
                            name: e.target.value,
                          })
                        }
                        placeholder="e.g., Monstera Deliciosa"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="edit-species"
                        className="text-base font-medium"
                      >
                        Scientific Name
                      </Label>
                      <Input
                        id="edit-species"
                        value={editingEntry.species}
                        onChange={(e) =>
                          setEditingEntry({
                            ...editingEntry,
                            species: e.target.value,
                          })
                        }
                        placeholder="e.g., Monstera deliciosa"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="edit-date"
                        className="text-base font-medium"
                      >
                        Date Acquired
                      </Label>
                      <Input
                        id="edit-date"
                        type="date"
                        value={editingEntry.dateAcquired}
                        onChange={(e) =>
                          setEditingEntry({
                            ...editingEntry,
                            dateAcquired: e.target.value,
                          })
                        }
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="edit-notes"
                        className="text-base font-medium"
                      >
                        Notes
                      </Label>
                      <Textarea
                        id="edit-notes"
                        value={editingEntry.notes.join("\n")}
                        onChange={(e) =>
                          setEditingEntry({
                            ...editingEntry,
                            notes: e.target.value
                              .split("\n")
                              .filter((note) => note.trim()),
                          })
                        }
                        placeholder="Add care instructions, location, or any other notes..."
                        className="min-h-[100px]"
                        rows={4}
                      />
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowEditDialog(false);
                      setEditingEntry(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveEdit}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                  >
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              onClick={() => {
                setShowScan(!showScan);
                if (showScan) resetScanForm();
              }}
              variant={showScan ? "outline" : "default"}
              className={`${
                !showScan
                  ? "bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
                  : "border-2 border-teal-600 text-teal-700 hover:bg-teal-50"
              } font-semibold py-6 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-200`}
            >
              {showScan ? (
                <>
                  <X className="mr-2 h-6 w-6" />
                  Close Scanner
                </>
              ) : (
                <>
                  <Camera className="mr-2 h-6 w-6" />
                  Scan Plant
                </>
              )}
            </Button>
          </div>

          {/* Scan Section */}
          {showScan && (
            <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-top duration-300">
              {!showForm && (
                <Card className="shadow-2xl border-0 bg-white overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 h-3"></div>
                  <form ref={formRef} action={formAction}>
                    <CardHeader className="text-center pb-6 pt-8">
                      <div className="flex justify-center mb-4">
                        <div className="p-4 bg-emerald-100 rounded-full">
                          <Camera className="h-12 w-12 text-emerald-600" />
                        </div>
                      </div>
                      <CardTitle className="text-3xl font-bold text-gray-900">
                        Upload Plant Photo
                      </CardTitle>
                      <CardDescription className="text-lg mt-2">
                        Take a clear photo of your plant for AI identification
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                      <FileUpload onFileChange={handleFileChange} />
                      <input
                        type="hidden"
                        name="photoDataUri"
                        value={photoDataUri || ""}
                      />
                    </CardContent>
                    <CardFooter className="px-8 pb-8">
                      <SubmitButton />
                    </CardFooter>
                  </form>
                </Card>
              )}

              {showForm && photoDataUri && (
                <div className="space-y-6 animate-in fade-in slide-in-from-top duration-300">
                  <Card className="shadow-2xl border-0 bg-white overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 h-3"></div>
                    <CardHeader className="pb-6">
                      <CardTitle className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <Leaf className="h-8 w-8 text-emerald-600" />
                        </div>
                        Plant Identified
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        Review and customize the details before adding to your
                        journal
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden border-4 border-emerald-100 shadow-2xl">
                          <img
                            src={photoDataUri}
                            alt="Scanned plant"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-5">
                          <div className="space-y-2">
                            <Label
                              htmlFor="name"
                              className="text-base font-semibold text-gray-700"
                            >
                              Plant Name
                            </Label>
                            <Input
                              id="name"
                              value={journalForm.name}
                              onChange={(e) =>
                                setJournalForm({
                                  ...journalForm,
                                  name: e.target.value,
                                })
                              }
                              className="h-12 text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="species"
                              className="text-base font-semibold text-gray-700"
                            >
                              Scientific Name
                            </Label>
                            <Input
                              id="species"
                              value={journalForm.species}
                              onChange={(e) =>
                                setJournalForm({
                                  ...journalForm,
                                  species: e.target.value,
                                })
                              }
                              className="h-12 text-base italic"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="dateAcquired"
                              className="text-base font-semibold text-gray-700"
                            >
                              Date Acquired
                            </Label>
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
                              className="h-12 text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="notes"
                              className="text-base font-semibold text-gray-700"
                            >
                              Notes
                            </Label>
                            <Textarea
                              id="notes"
                              value={journalForm.notes}
                              onChange={(e) =>
                                setJournalForm({
                                  ...journalForm,
                                  notes: e.target.value,
                                })
                              }
                              placeholder="Add care instructions, location, or any other notes..."
                              className="min-h-[120px] text-base"
                              rows={5}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="px-8 pb-8 gap-4">
                      <Button
                        onClick={resetScanForm}
                        variant="outline"
                        className="flex-1 h-12 text-base border-2"
                      >
                        Scan Another
                      </Button>
                      <Button
                        onClick={handleAddToJournal}
                        className="flex-1 h-12 text-base bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-lg"
                      >
                        <Plus className="mr-2 h-5 w-5" />
                        Add to Journal
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Journal Entries Grid */}
          {allEntries.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allEntries.map((entry) => {
                const isUserEntry = !journalEntries.some(
                  (je) => je.id === entry.id
                );
                return (
                  <div key={entry.id} className="group relative">
                    <Link href={`/journal/${entry.id}`} className="block">
                      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:border-emerald-500 hover:shadow-2xl hover:-translate-y-2 bg-white">
                        <div className="relative aspect-[3/4] w-full overflow-hidden">
                          <Image
                            src={entry.image.imageUrl}
                            alt={entry.image.description}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            data-ai-hint={entry.image.imageHint}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <CardHeader className="pb-3">
                          <CardTitle className="font-headline text-2xl text-gray-900 group-hover:text-emerald-600 transition-colors">
                            {entry.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-gray-600 italic text-sm">
                            {entry.species}
                          </p>
                          <p className="text-gray-500 text-xs mt-2">
                            Added{" "}
                            {new Date(entry.dateAcquired).toLocaleDateString()}
                          </p>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              handleWaterPlant(entry.id);
                            }}
                            variant={
                              wateredPlants.has(entry.id)
                                ? "default"
                                : "outline"
                            }
                            className={`w-full ${
                              wateredPlants.has(entry.id)
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "border-blue-600 text-blue-600 hover:bg-blue-50"
                            }`}
                          >
                            <Droplets className="mr-2 h-4 w-4" />
                            {wateredPlants.has(entry.id)
                              ? "Watered!"
                              : "Water Plant"}
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                    {isUserEntry && (
                      <>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 shadow-lg"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEditEntry(entry);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 shadow-lg"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteEntry(entry.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-emerald-100 rounded-full">
                  <Leaf className="h-16 w-16 text-emerald-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No plants yet
              </h3>
              <p className="text-gray-600 mb-8">
                Start building your plant collection by adding or scanning a
                plant
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
