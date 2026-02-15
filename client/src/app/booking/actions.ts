"use server";

import { recommendGardener } from "@/ai/flows/recommend-gardener";
import { z } from "zod";

const schema = z.object({
  gardenInfo: z.string().min(1, { message: "Garden information is required." }),
});

export type RecommendGardenerFormState = {
  message: string;
  data?: {
    gardener: {
      id: number;
      name: string;
      rating: number;
      reviews: number;
      distance: number;
      hourlyRate: number;
      specialties: string[];
      avatar: string;
      available: boolean;
      completedJobs: number;
      verifiedBadge: boolean;
    };
    reasoning: string;
    suggestedPrice: number;
  };
};

export async function recommendGardenerAction(
  prevState: RecommendGardenerFormState,
  formData: FormData
): Promise<RecommendGardenerFormState> {
  const validatedFields = schema.safeParse({
    gardenInfo: formData.get("gardenInfo"),
  });

  if (!validatedFields.success) {
    return {
      message: "Please provide garden information.",
    };
  }

  try {
    // Mock gardeners data - in a real app, this would come from a database
    const gardeners = [
      {
        id: 1,
        name: "Shivam Best Karigar",
        rating: 4.9,
        reviews: 127,
        distance: 2.3,
        hourlyRate: 100,
        specialties: ["Lawn Care", "Pruning", "Garden Design"],
        avatar: "/work-1.png",
        available: true,
        completedJobs: 450,
        verifiedBadge: true,
      },
      {
        id: 2,
        name: "Mukul Tiwari",
        rating: 4.8,
        reviews: 93,
        distance: 3.5,
        hourlyRate: 30,
        specialties: ["Organic Gardening", "Landscaping", "Tree Care"],
        avatar: "/work-5.jpg",
        available: true,
        completedJobs: 320,
        verifiedBadge: true,
      },
      {
        id: 3,
        name: "Harsh Soni",
        rating: 4.7,
        reviews: 156,
        distance: 4.1,
        hourlyRate: 28,
        specialties: ["Vegetable Garden", "Irrigation", "Pest Control"],
        avatar: "/work-3.jpg",
        available: false,
        completedJobs: 580,
        verifiedBadge: true,
      },
      {
        id: 4,
        name: "Priyanshu BBG",
        rating: 5.0,
        reviews: 84,
        distance: 1.8,
        hourlyRate: 35,
        specialties: ["Rose Care", "Flower Beds", "Garden Maintenance"],
        avatar: "/work-5.jpg",
        available: true,
        completedJobs: 290,
        verifiedBadge: true,
      },
    ];

    const result = await recommendGardener({
      gardenInfo: validatedFields.data.gardenInfo,
      gardeners,
    });

    const recommendedGardener = gardeners.find(
      (g) => g.id === result.recommendedGardener.id
    );

    if (!recommendedGardener) {
      return {
        message: "No suitable gardener found for your garden needs.",
      };
    }

    return {
      message: "success",
      data: {
        gardener: recommendedGardener,
        reasoning: result.recommendedGardener.reasoning,
        suggestedPrice: result.recommendedGardener.suggestedPrice,
      },
    };
  } catch (e) {
    console.error(e);
    const errorMessage =
      e instanceof Error ? e.message : "An unexpected error occurred.";
    return {
      message: `An error occurred during recommendation: ${errorMessage}`,
    };
  }
}
