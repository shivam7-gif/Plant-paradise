"use client";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { useActionState, useEffect, useRef, useState } from "react";
import { identifyPlantAction, type FormState } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Scan, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <div className="space-y-4">
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6 text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 rounded-xl"
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Identify Plant
          </>
        )}
      </Button>
      {pending && (
        <div className="w-full space-y-3 animate-pulse">
          <div className="h-4 bg-neutral-800 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-neutral-800 rounded w-1/2 mx-auto"></div>
          <p className="text-center text-xs text-neutral-500">Analyzing structure, leaves, and patterns...</p>
        </div>
      )}
    </div>
  );
}

const initialState: FormState = {
  message: "",
};

import { analyzeRoomAction, type RoomAnalysisState, visualizePlantAction, type VisualizationState } from "./actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon } from "lucide-react";

function RoomAnalyzer({ plantName, plantLightNeeds }: { plantName: string, plantLightNeeds: string }) {
  const [roomState, roomAction] = useActionState(analyzeRoomAction, { message: "" });
  const [visState, visAction] = useActionState(visualizePlantAction, { message: "" });

  const [roomPhoto, setRoomPhoto] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("analyze");

  return (
    <div className="bg-neutral-900/50 border border-emerald-500/20 rounded-2xl p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles size={100} className="text-emerald-500" />
      </div>

      <h3 className="text-2xl font-bold text-white mb-6 font-headline flex items-center gap-2">
        <Sparkles className="text-emerald-500" />
        AI Room Companion
      </h3>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/40">
          <TabsTrigger value="analyze">Analysis</TabsTrigger>
          <TabsTrigger value="visualize">Visualize</TabsTrigger>
        </TabsList>

        <TabsContent value="analyze">
          <div className="space-y-4">
            <p className="text-neutral-400">Upload a photo of your room to check if the lighting matches {plantName}'s needs.</p>

            {!roomState.data ? (
              <form action={roomAction} className="space-y-4">
                <input type="hidden" name="plantName" value={plantName} />
                <input type="hidden" name="plantLightNeeds" value={plantLightNeeds} />

                <div className="border border-dashed border-neutral-700 rounded-xl p-6 bg-black/20 hover:border-emerald-500/50 transition-colors text-center">
                  <FileUpload onFileChange={(uri) => setRoomPhoto(uri)} />
                  <input type="hidden" name="roomPhotoDataUri" value={roomPhoto || ""} />
                </div>

                <Button
                  disabled={!roomPhoto}
                  className="w-full bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/50"
                >
                  Analyze Room
                </Button>
              </form>
            ) : (
              <div className="space-y-4 animate-in fade-in zoom-in duration-500">
                {/* Analysis Result Display (Same as before) */}
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Suitability</span>
                  <span className="text-2xl font-bold text-emerald-400">{roomState.data.suitabilityScore}%</span>
                </div>
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${roomState.data.suitabilityScore}%` }}
                    className={cn("h-full",
                      roomState.data.suitabilityScore > 70 ? "bg-emerald-500" :
                        roomState.data.suitabilityScore > 40 ? "bg-amber-500" : "bg-red-500"
                    )}
                  />
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                  <h4 className="font-bold text-white mb-1">{roomState.data.verdict}</h4>
                  <p className="text-sm text-neutral-300">{roomState.data.advice}</p>
                </div>
                <div className="text-xs text-neutral-500 text-center">
                  Detected: {roomState.data.lightingCondition}
                </div>
                <button
                  onClick={() => { roomState.data = undefined; setRoomPhoto(null); }}
                  className="w-full text-xs text-neutral-400 hover:text-white underline mt-2"
                >
                  Check another room
                </button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="visualize">
          <div className="space-y-4">
            <p className="text-neutral-400">See how {plantName} would look in your space (Generative AI).</p>

            {!visState.data ? (
              <form action={visAction} className="space-y-4">
                <input type="hidden" name="plantName" value={plantName} />
                {!roomPhoto ? (
                  <div className="border border-dashed border-neutral-700 rounded-xl p-6 bg-black/20 text-center">
                    <FileUpload onFileChange={(uri) => setRoomPhoto(uri)} />
                    <input type="hidden" name="roomPhotoDataUri" value={roomPhoto || ""} />
                  </div>
                ) : (
                  <input type="hidden" name="roomPhotoDataUri" value={roomPhoto} />
                )}

                <Button
                  disabled={!roomPhoto}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20"
                >
                  <ImageIcon className="mr-2 w-4 h-4" /> Generate Preview
                </Button>
              </form>
            ) : (
              <div className="animate-in fade-in zoom-in duration-500 space-y-4">
                <div className="relative rounded-xl overflow-hidden aspect-video border border-white/10 group">
                  <img src={visState.data.imageUrl} alt="Generated Visualization" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a href={visState.data.imageUrl} download="plant-viz.png" className="text-white underline font-bold">Download</a>
                  </div>
                  {visState.data.status === 'mock' && (
                    <div className="absolute top-2 right-2 bg-amber-500/90 text-black text-xs px-2 py-1 rounded font-bold">Demo Mode</div>
                  )}
                </div>
                <button
                  onClick={() => { visState.data = undefined; }}
                  className="w-full text-xs text-neutral-400 hover:text-white underline"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function IdentifyClientPage() {
  const [formState, formAction] = useActionState(identifyPlantAction, initialState);
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.message && formState.message !== "success") {
      toast({
        variant: "destructive",
        title: "Identification Failed",
        description: formState.message,
      });
    }
  }, [formState, toast]);

  const handleFileChange = (dataUri: string | null) => {
    setPhotoDataUri(dataUri);
    if (formState.data || formState.message) {
      formState.message = "";
      formState.data = undefined;
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!formState.data ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl mx-auto bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden"
          >
            {/* Scanner Line Animation */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] animate-scan opacity-50 pointer-events-none"></div>

            <form ref={formRef} action={formAction} className="space-y-6">
              <div className="border-2 border-dashed border-neutral-700 rounded-2xl p-8 hover:border-emerald-500/50 transition-colors bg-black/20">
                <FileUpload onFileChange={handleFileChange} />
                <input type="hidden" name="photoDataUri" value={photoDataUri || ""} />
              </div>
              <SubmitButton />
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Image & Basic Info */}
            <div className="lg:col-span-4 space-y-6">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                <img src={photoDataUri!} alt="Identified Plant" className="w-full aspect-[3/4] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h2 className="text-3xl font-bold text-white mb-1 font-headline">{formState.data.basicInfo.commonName}</h2>
                  <p className="text-emerald-400 font-mono text-sm italic">{formState.data.basicInfo.scientificName}</p>
                </div>

                <button
                  onClick={() => {
                    setPhotoDataUri(null);
                    formState.data = undefined;
                  }}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-neutral-400">Family</span>
                  <span className="text-white font-medium">{formState.data.basicInfo.family}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-neutral-400">Origin</span>
                  <span className="text-white font-medium">{formState.data.basicInfo.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Type</span>
                  <span className="text-white font-medium">{formState.data.basicInfo.plantType}</span>
                </div>
              </div>

              {/* SAFETY BADGE */}
              <div className={cn(
                "rounded-2xl p-6 border transition-colors",
                formState.data.toxicity.pets.toLowerCase().includes("toxic")
                  ? "bg-red-500/10 border-red-500/20"
                  : "bg-emerald-500/10 border-emerald-500/20"
              )}>
                <h3 className={cn(
                  "font-bold mb-2 flex items-center gap-2",
                  formState.data.toxicity.pets.toLowerCase().includes("toxic") ? "text-red-400" : "text-emerald-400"
                )}>
                  {formState.data.toxicity.pets.toLowerCase().includes("toxic") ? "⚠️ Safety Warning" : "✅ Pet Safe"}
                </h3>
                <div className="space-y-2 text-sm text-neutral-300">
                  <p><strong className="text-white">Pets:</strong> {formState.data.toxicity.pets}</p>
                  <p><strong className="text-white">Humans:</strong> {formState.data.toxicity.human}</p>
                  {formState.data.toxicity.details && (
                    <p className="text-xs opacity-70 mt-2">{formState.data.toxicity.details}</p>
                  )}
                </div>
              </div>

              {/* BEST PLACEMENT */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
                <h3 className="font-bold text-amber-400 mb-2">📍 Best Spot</h3>
                <p className="text-neutral-300">{formState.data.bestPlacement}</p>
              </div>

              {/* ACTIONS & COMMERCE */}
              <div className="flex flex-col gap-4">
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  onClick={() => {
                    window.open(`https://www.google.com/search?q=buy+${formState.data!.basicInfo.commonName}+plant&tbm=shop`, '_blank');
                  }}
                >
                  <Sparkles className="w-5 h-5" />
                  Buy Now (₹{formState.data.marketPrice.min} - ${formState.data.marketPrice.max})
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="w-full border-neutral-700 hover:bg-neutral-800 text-white py-6 rounded-xl"
                    onClick={() => {
                      toast({
                        title: "Saved to Garden",
                        description: `${formState.data!.basicInfo.commonName} has been added to your collection.`,
                      });
                    }}
                  >
                    Save to Garden
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-neutral-700 hover:bg-neutral-800 text-white py-6 rounded-xl"
                    onClick={() => {
                      navigator.clipboard.writeText(`Check out this plant: ${formState.data!.basicInfo.commonName}`);
                      toast({
                        title: "Link Copied",
                        description: "Plant details copied to clipboard.",
                      });
                    }}
                  >
                    Share
                  </Button>
                </div>
              </div>

            </div>

            {/* Right Column: Details */}
            <div className="lg:col-span-8 space-y-6">
              {/* Description */}
              <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Scan className="text-emerald-500" /> Analysis
                </h3>
                <p className="text-neutral-300 leading-relaxed text-lg">
                  {formState.data.description.overview}
                </p>
              </div>

              {/* Care Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Sunlight", value: formState.data.careInstructions.sunlight, color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
                  { label: "Water", value: formState.data.careInstructions.watering, color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
                  { label: "Soil", value: formState.data.careInstructions.soilPh, color: "bg-stone-500/10 text-stone-500 border-stone-500/20" },
                  { label: "Temperature", value: formState.data.careInstructions.temperatureHumidity, color: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
                ].map((item, i) => (
                  <div key={i} className={cn("p-6 rounded-2xl border backdrop-blur-sm", item.color)}>
                    <h4 className="font-bold mb-2 opacity-80">{item.label}</h4>
                    <p className="text-neutral-200 text-sm leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* GROWTH & SPECS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-neutral-400 text-xs uppercase tracking-wider mb-1">Max Height</div>
                  <div className="text-xl font-bold text-white">{formState.data.growthInfo.heightSpread}</div>
                </div>
                <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-neutral-400 text-xs uppercase tracking-wider mb-1">Growth Rate</div>
                  <div className="text-xl font-bold text-white">{formState.data.growthInfo.growthRate}</div>
                </div>
                <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-neutral-400 text-xs uppercase tracking-wider mb-1">Lifespan</div>
                  <div className="text-xl font-bold text-white">{formState.data.growthInfo.lifespan}</div>
                </div>
              </div>

              {/* DIFFICULTY BAR */}
              <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-white">Care Difficulty</h3>
                  <span className={cn("font-medium",
                    formState.data.difficulty.level <= 3 ? "text-emerald-400" :
                      formState.data.difficulty.level <= 7 ? "text-amber-400" : "text-red-400"
                  )}>
                    {formState.data.difficulty.label} ({formState.data.difficulty.level}/10)
                  </span>
                </div>
                {/* Health Bar Style */}
                <div className="h-4 w-full bg-neutral-800 rounded-full overflow-hidden border border-white/5 relative">
                  {/* Background segments for visual separation */}
                  <div className="absolute inset-0 grid grid-cols-10 gap-0.5 opacity-20 pointer-events-none">
                    {[...Array(10)].map((_, i) => <div key={i} className="bg-black h-full w-full"></div>)}
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${formState.data.difficulty.level * 10}%` }}
                    className={cn("h-full transition-all duration-1000 ease-out",
                      formState.data.difficulty.level <= 3 ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" :
                        formState.data.difficulty.level <= 7 ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" :
                          "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                    )}
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-2 text-right">Lower is easier</p>
              </div>

              {/* GROWTH TIMELINE SLIDER */}
              <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6 overflow-x-auto">
                <h3 className="font-bold text-white mb-6">Growth Timeline</h3>
                <div className="flex justify-between min-w-[600px] relative px-4">
                  {/* Connector Line */}
                  <div className="absolute top-3 left-4 right-4 h-0.5 bg-neutral-800 -z-10"></div>

                  {formState.data.growthStages.map((stage, i) => (
                    <div key={i} className="flex flex-col items-center text-center w-1/4 group relative">
                      <div className="w-6 h-6 rounded-full bg-neutral-800 border-2 border-neutral-600 group-hover:border-emerald-500 group-hover:bg-emerald-500/20 transition-all z-10 mb-3 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <h4 className="text-emerald-300 font-bold text-sm mb-1">{stage.stage}</h4>
                      <span className="text-xs text-neutral-400 font-mono mb-2">{stage.height}</span>
                      <p className="text-xs text-neutral-500 max-w-[120px]">{stage.description}</p>
                    </div>
                  ))}
                </div>
              </div>


              {/* Uses & Facts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6">
                  <h3 className="font-bold text-white mb-4">Quick Facts</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-2 text-sm text-neutral-300">
                      <span className="text-emerald-500">•</span>
                      {formState.data.interestingFacts.funTrivia}
                    </li>
                    <li className="flex gap-2 text-sm text-neutral-300">
                      <span className="text-emerald-500">•</span>
                      {formState.data.interestingFacts.culturalSignificance}
                    </li>
                  </ul>
                </div>

                <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6">
                  <h3 className="font-bold text-white mb-4">Uses</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(formState.data.uses).filter(([_, v]) => v !== "No").map(([key, val]) => (
                      <span key={key} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 capitalize">
                        {key}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Related Plants */}
              <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">Botanical Relations</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center border-b border-white/5 pb-2">
                    <span className="text-neutral-400 text-sm min-w-[120px]">Companions:</span>
                    <span className="text-emerald-300">{formState.data.relatedPlants.companionPlants}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center border-b border-white/5 pb-2">
                    <span className="text-neutral-400 text-sm min-w-[120px]">Similar to:</span>
                    <span className="text-emerald-300">{formState.data.relatedPlants.similarSpecies}</span>
                  </div>
                </div>
              </div>

              <RoomAnalyzer
                plantName={formState.data.basicInfo.commonName}
                plantLightNeeds={formState.data.careInstructions.sunlight}
              />

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}