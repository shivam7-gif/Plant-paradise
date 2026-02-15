"use server";
/**
 * @fileOverview AI service that provides comprehensive structured plant information
 * including basic info, description, care, uses, growth, media, facts, related plants, and user interaction.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

/* ------------------ INPUT SCHEMA ------------------ */
const ComprehensivePlantInfoInputSchema = z.object({
  plantName: z.string().describe("Common or scientific name of the plant."),
  plantJournal: z
    .string()
    .describe("Plant identification or journal data for accuracy."),
});

export type ComprehensivePlantInfoInput = z.infer<
  typeof ComprehensivePlantInfoInputSchema
>;

/* ------------------ OUTPUT SCHEMA ------------------ */
const ComprehensivePlantInfoOutputSchema = z.object({
  basicInfo: z.object({
    commonName: z.string(),
    scientificName: z.string(),
    family: z.string(),
    origin: z.string(),
    plantType: z.string(),
  }),
  description: z.object({
    overview: z.string(),
    sizeGrowth: z.string(),
    leafFlowerFruit: z.string(),
    colorTexture: z.string(),
    seasonalBehavior: z.string(),
  }),
  careInstructions: z.object({
    sunlight: z.string(),
    watering: z.string(),
    soilPh: z.string(),
    fertilization: z.string(),
    temperatureHumidity: z.string(),
    pruningMaintenance: z.string(),
    pestDisease: z.string(),
    propagation: z.string(),
  }),
  uses: z.object({
    edible: z.string(),
    medicinal: z.string(),
    ornamental: z.string(),
    environmental: z.string(),
  }),
  growthInfo: z.object({
    growthRate: z.string(),
    heightSpread: z.string(),
    lifespan: z.string(),
    floweringFruiting: z.string(),
  }),
  imagesMedia: z.object({
    photos: z.string(),
    videos: z.string(),
    zoomFeatures: z.string(),
  }),
  interestingFacts: z.object({
    funTrivia: z.string(),
    culturalSignificance: z.string(),
    rareStatus: z.string(),
  }),
  relatedPlants: z.object({
    similarSpecies: z.string(),
    companionPlants: z.string(),
    variants: z.string(),
  }),
  userInteraction: z.object({
    commentsReviews: z.string(),
    qaSection: z.string(),
    identificationTool: z.string(),
    careReminders: z.string(),
  }),
  toxicity: z.object({
    human: z.string(),
    pets: z.string(),
    details: z.string(),
  }),
  bestPlacement: z.string(),
  marketPrice: z.object({
    min: z.number(),
    max: z.number(),
    currency: z.string(),
  }),
  difficulty: z.object({
    level: z.number().describe("1-10 difficulty level"),
    label: z.string().describe("e.g. 'Beginner Friendly', 'Expert Only'"),
  }),
  growthStages: z.array(z.object({
    stage: z.string(),
    description: z.string(),
    height: z.string(),
  })),
});

export type ComprehensivePlantInfoOutput = z.infer<
  typeof ComprehensivePlantInfoOutputSchema
>;

/* ------------------ PROMPT ------------------ */
const prompt = ai.definePrompt({
  name: "comprehensivePlantInfoPrompt",
  input: { schema: ComprehensivePlantInfoInputSchema },
  output: { schema: ComprehensivePlantInfoOutputSchema },
  prompt: `
You are an expert botanist AI providing comprehensive plant information and use emoji also rowwise.

Use the following plant information:
{{plantJournal}}

Provide detailed information about the plant "{{plantName}}" in the following structured format. Fill each section with accurate, helpful information based on the plant data. If information is not available, use "Not available" or appropriate defaults.

**Basic Information:**
- Common Name: [common name]
- Scientific Name: [latin name]
- Family: [plant family, e.g., Rosaceae]
- Origin / Native Region: [origin location]
- Plant Type: [tree, shrub, herb, succulent, vine, etc.]

**Description:**
- General overview: [brief description of the plant]
- Size and growth pattern: [dimensions and growth habits]
- Leaf/flower/fruit characteristics: [details about plant parts]
- Color, texture, fragrance: [visual and sensory details]
- Seasonal behavior: [how it changes with seasons]

**Care Instructions:**
- Sunlight requirements: [full sun, partial shade, etc.]
- Watering frequency: [watering schedule]
- Soil type & pH preference: [soil requirements]
- Fertilization: [fertilizer needs and schedule]
- Temperature & humidity tolerance: [climate preferences]
- Pruning and maintenance tips: [care tips]
- Pest & disease prevention: [common issues and solutions]
- Propagation methods: [how to propagate]

**Toxicity & Safety:**
- Human Toxicity: [Safe/Toxic/Irritant]
- Pet Toxicity (Cats/Dogs): [Safe/Toxic/Irritant]
- Details/Symptoms: [What happens if ingested or touched]

**Placement:**
- Best Placement: [e.g. "East-facing window", "Humid bathroom", "Shady patio"]

**Market Price:**
- Min: [Minimum estimated price for a small/medium pot]
- Max: [Maximum estimated price]
- Currency: [Currency code, e.g. USD]

**Difficulty:**
- Level: [1-10, 1=Easiest]
- Label: [e.g. "Beginner Friendly", "Intermediate", "Expert"]

**Growth Timeline:**
- Provide 3-4 key stages (e.g. Seedling, Young, Mature).
- For each stage: Name, Description, Approx Height.

**Uses:**
- Edible: [edible parts and uses]
- Medicinal properties: [health benefits]
- Ornamental / landscaping: [decorative uses]
- Environmental benefits: [ecological contributions]

**Growth Information:**
- Average growth rate: [how fast it grows]
- Expected height and spread: [mature size]
- Lifespan: [how long it lives]
- Flowering and fruiting season: [blooming times]

**Images / Media:**
- High-quality photos: [description of available images]
- Images of leaves, flowers, fruits: [specific image details]
- Videos or 3D views: [media availability]
- Zoom-in feature for leaf/flower details: [interactive features]

**Interesting Facts:**
- Fun trivia: [interesting facts]
- Cultural or historical significance: [cultural importance]
- Rare or endangered status: [conservation info]

**Related Plants:**
- Similar species: [related plants]
- Companion planting suggestions: [good companions]
- Variants or cultivars: [different varieties]

**User Interaction:**
- Comments/reviews from gardeners: [user feedback placeholder]
- Q&A section: [interactive Q&A]
- Plant identification tool: [AI identification features]
- Care reminder / notifications: [reminder system]
`,
});

/* ------------------ FLOW ------------------ */
const comprehensivePlantInfoFlow = ai.defineFlow(
  {
    name: "comprehensivePlantInfoFlow",
    inputSchema: ComprehensivePlantInfoInputSchema,
    outputSchema: ComprehensivePlantInfoOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

/* ------------------ EXPORT FUNCTION ------------------ */
export async function getComprehensivePlantInfo(
  input: ComprehensivePlantInfoInput
): Promise<ComprehensivePlantInfoOutput> {
  return comprehensivePlantInfoFlow(input);
}
