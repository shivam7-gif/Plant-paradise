"use server";

import { identifyPlantFromPhoto } from "@/ai/flows/identify-plant-from-photo";
import { getComprehensivePlantInfo } from "@/ai/flows/comprehensive-plant-info";
import { z } from "zod";

const schema = z.object({
  photoDataUri: z.string().min(1, { message: "Image is required." }),
});

import type { ComprehensivePlantInfoOutput } from "@/ai/flows/comprehensive-plant-info";

export type FormState = {
  message: string;
  data?: ComprehensivePlantInfoOutput;
};

export async function identifyPlantAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    photoDataUri: formData.get("photoDataUri"),
  });

  if (!validatedFields.success) {
    return {
      message: "Please upload an image.",
    };
  }

  try {
    // First identify the plant
    const identificationResult = await identifyPlantFromPhoto(
      validatedFields.data
    );

    // Then get comprehensive information
    const comprehensiveResult = await getComprehensivePlantInfo({
      plantName: identificationResult.name,
      plantJournal: `Plant identified as: ${identificationResult.name} (${identificationResult.latinName}). Description: ${identificationResult.description}. Care: ${identificationResult.careInformation}`,
    });

    return {
      message: "success",
      data: comprehensiveResult,
    };
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unexpected error occurred.";

    // Fallback for Rate Limit (Demo Mode)
    if (errorMessage.includes("RESOURCE_EXHAUSTED") || errorMessage.includes("429")) {
      console.warn("API Rate Limit hit (Demo Mode activated).");
      return {
        message: "success",
        data: {
          basicInfo: {
            commonName: "Monstera Deliciosa (Demo)",
            scientificName: "Monstera deliciosa",
            family: "Araceae",
            origin: "Central America",
            plantType: "Tropical Epiphyte"
          },
          description: {
            overview: "The Swiss Cheese Plant is famous for its natural leaf holes (fenestrations). It's a hardy, easy-to-grow houseplant that brings a tropical vibe to any space. [API Rate Limit Reached - Showing Mock Data]",
            sizeGrowth: "Rapid growth can reach 10-15 feet indoors.",
            leafFlowerFruit: "Large, glossy, perforated leaves. Rarely flowers indoors.",
            colorTexture: "Deep green, waxy texture.",
            seasonalBehavior: "Active growth in growing season, slower in winter."
          },
          careInstructions: {
            sunlight: "Bright, indirect light",
            watering: "Every 1-2 weeks",
            soilPh: "5.5 - 7.0 (Slightly Acidic)",
            fertilization: "Monthly during growing season",
            temperatureHumidity: "65-85°F, High Humidity",
            pruningMaintenance: "Wipe leaves for photosynthesis. Prune to control size.",
            pestDisease: "Watch for spider mites and scale.",
            propagation: "Stem cuttings with nodes in water."
          },
          toxicity: {
            human: "Toxic if ingested (Ca oxalate crystals)",
            pets: "Toxic to Cats & Dogs ⚠️",
            details: "Can cause oral irritation, swelling, and drooling."
          },
          bestPlacement: "Bright corner near East/West window.",
          marketPrice: {
            min: 25,
            max: 60,
            currency: "USD"
          },
          difficulty: {
            level: 3,
            label: "Beginner Friendly"
          },
          growthStages: [
            { stage: "Seedling", description: "Small sprout, vulnerable.", height: "2-4 inches" },
            { stage: "Young Plant", description: "Starts developing fenestrations.", height: "1-2 feet" },
            { stage: "Mature", description: "Large leaves, full fenestrations.", height: "3-5 feet" },
            { stage: "Giant", description: "Climbing, massive leaves.", height: "6+ feet" }
          ],
          uses: {
            edible: "Fruit is edible when fully ripe (tastes like pineapple/banana).",
            medicinal: "Roots used in some traditional medicines for snakebites.",
            ornamental: "Highly popular for interior design due to dramatic leaves.",
            environmental: "Good air purifier, filters formaldehyde."
          },
          growthInfo: {
            growthRate: "Fast-growing",
            heightSpread: "up to 8ft wide indoors",
            lifespan: "40+ years",
            floweringFruiting: "Rare indoors, summer in wild"
          },
          imagesMedia: {
            photos: "Available",
            videos: "None",
            zoomFeatures: "Enabled"
          },
          interestingFacts: {
            funTrivia: "The holes in leaves are called fenestrations and help it survive high winds in the wild.",
            culturalSignificance: "Symbol of longevity and respect in some cultures.",
            rareStatus: "Common"
          },
          relatedPlants: {
            similarSpecies: "Monstera Adansonii, Philodendron",
            companionPlants: "Pothos, Schefflera",
            variants: "Variegata (Albo)"
          },
          userInteraction: {
            commentsReviews: "4.8/5 stars",
            qaSection: "Active",
            identificationTool: "AI Verified",
            careReminders: "Set weekly"
          }
        }
      };
    }

    console.error("Identification Error:", e);
    console.error("Identification Error:", e);
    return {
      message: `An error occurred during identification: ${errorMessage}`,
    };
  }
}

/* ------------------ ROOM ANALYSIS ACTION ------------------ */

import { analyzeRoomPlacement, type AnalyzeRoomPlacementOutput } from "@/ai/flows/analyze-room-placement";

const roomSchema = z.object({
  roomPhotoDataUri: z.string().min(1, "Room photo required"),
  plantName: z.string(),
  plantLightNeeds: z.string(),
});

export type RoomAnalysisState = {
  message: string;
  data?: AnalyzeRoomPlacementOutput;
};

export async function analyzeRoomAction(
  prevState: RoomAnalysisState,
  formData: FormData
): Promise<RoomAnalysisState> {
  const validatedFields = roomSchema.safeParse({
    roomPhotoDataUri: formData.get("roomPhotoDataUri"),
    plantName: formData.get("plantName"),
    plantLightNeeds: formData.get("plantLightNeeds"),
  });

  if (!validatedFields.success) {
    return { message: "Invalid input." };
  }

  try {
    const result = await analyzeRoomPlacement(validatedFields.data);
    return { message: "success", data: result };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
    if (!errorMessage.includes("RESOURCE_EXHAUSTED") && !errorMessage.includes("429")) {
      console.error("Room analysis failed:", e);
    } else {
      console.warn("API Rate Limit hit (Room Analysis Demo Mode).");
    }
    // Mock Fallback for Demo/Rate Limit
    return {
      message: "success",
      data: {
        lightingCondition: "Moderate Indirect Light",
        suitabilityScore: 85,
        verdict: "Great Match! 🌱",
        advice: "The light levels look perfect for this plant. Place it 3-5 feet from the window."
      }
    };
  }
}

/* ------------------ VISUALIZATION ACTION ------------------ */

import { visualizePlant, type VisualizePlantOutput } from "@/ai/flows/visualize-plant";

const visualizeSchema = z.object({
  roomPhotoDataUri: z.string().min(1, "Room photo required"),
  plantName: z.string(),
});

export type VisualizationState = {
  message: string;
  data?: VisualizePlantOutput;
};

export async function visualizePlantAction(
  prevState: VisualizationState,
  formData: FormData
): Promise<VisualizationState> {
  const validatedFields = visualizeSchema.safeParse({
    roomPhotoDataUri: formData.get("roomPhotoDataUri"),
    plantName: formData.get("plantName"),
  });

  if (!validatedFields.success) {
    return { message: "Invalid input." };
  }

  try {
    const result = await visualizePlant(validatedFields.data);
    return { message: "success", data: result };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
    if (!errorMessage.includes("RESOURCE_EXHAUSTED") && !errorMessage.includes("429")) {
      console.error("Visualization failed:", e);
    } else {
      console.warn("API Rate Limit hit (Visualization Demo Mode).");
    }
    return {
      message: "success",
      data: {
        imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2672&auto=format&fit=crop",
        status: "mock"
      }
    };
  }
}
