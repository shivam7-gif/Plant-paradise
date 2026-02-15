import { PlaceHolderImages } from "./placeholder-images"
import type { ImagePlaceholder } from "./placeholder-images"

export type JournalEntry = {
  id: string
  name: string
  species: string
  dateAcquired: string
  notes: string[]
  image: ImagePlaceholder
}

export type MarketplaceItem = {
  id: string
  name: string
  type: 'plant' | 'seed' | 'tool'
  price: number
  description: string
  image: ImagePlaceholder
}

export type Achievement = {
  id: string
  name: string
  description: string
  dateEarned: string
  icon: 'leaf' | 'droplet' | 'sun' | 'star' | 'heart' | 'flame'
}

export type Certificate = {
  id: string;
  name: string;
  description: string;
  dateEarned: string;
}

const findImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    // Return a default/fallback image if not found
    return PlaceHolderImages[0] || { id: 'default', description: 'Default', imageUrl: 'https://picsum.photos/seed/default/600/400', imageHint: 'placeholder' };
  }
  return image;
};

export const currentStreak = 7;

export const journalEntries: JournalEntry[] = [
  {
    id: "1",
    name: "Monty",
    species: "Monstera Deliciosa",
    dateAcquired: "2023-01-15",
    notes: ["Repotted on 2023-03-01.", "First new leaf unfurled on 2023-03-20."],
    image: findImage("monstera-1"),
  },
  {
    id: "2",
    name: "Sly",
    species: "Sansevieria Trifasciata",
    dateAcquired: "2022-11-05",
    notes: ["Doesn't need much water.", "Grown 5cm since last measurement."],
    image: findImage("snake-plant-1"),
  },
  {
    id: "3",
    name: "Goldie",
    species: "Epipremnum aureum",
    dateAcquired: "2023-05-22",
    notes: ["Loves the hanging basket.", "Propagated a cutting on 2023-07-10."],
    image: findImage("pothos-1"),
  },
  {
    id: "4",
    name: "Figgy",
    species: "Ficus lyrata",
    dateAcquired: "2023-02-10",
    notes: ["A bit finicky with watering.", "Dropped a leaf, but seems stable now."],
    image: findImage("fiddle-leaf-1"),
  },
    {
    id: "5",
    name: "Zeke",
    species: "Zamioculcas zamiifolia",
    dateAcquired: "2023-08-01",
    notes: ["Very low maintenance.", "Thriving in low light conditions."],
    image: findImage("zz-plant-1"),
  },
  {
    id: "6",
    name: "Aloe",
    species: "Aloe Vera",
    dateAcquired: "2022-09-18",
    notes: ["Used some gel for a sunburn.", "Producing pups!"],
    image: findImage("aloe-vera-1"),
  },
]

export const marketplaceItems: MarketplaceItem[] = [
    {
        id: 'p-01',
        name: 'Monstera Deliciosa',
        type: 'plant',
        price: 25.00,
        description: 'A beautiful, healthy Monstera cutting with 3 leaves.',
        image: findImage('monstera-1')
    },
    {
        id: 'p-02',
        name: 'Snake Plant',
        type: 'plant',
        price: 18.50,
        description: 'A tall and hardy Sansevieria, perfect for beginners.',
        image: findImage('snake-plant-1')
    },
    {
        id: 's-01',
        name: 'Sunflower Seeds',
        type: 'seed',
        price: 3.99,
        description: 'A packet of 50+ Mammoth Sunflower seeds. Grow up to 12 feet tall!',
        image: findImage('seeds-1')
    },
    {
        id: 't-01',
        name: 'Metal Watering Can',
        type: 'tool',
        price: 32.00,
        description: 'A stylish and durable 1-gallon metal watering can in forest green.',
        image: findImage('watering-can-1')
    },
    {
        id: 'p-03',
        name: 'Bonsai Starter',
        type: 'plant',
        price: 45.00,
        description: 'A young Juniper bonsai tree, ready for shaping.',
        image: findImage('bonsai-1')
    },
    {
        id: 't-02',
        name: 'Hand Tool Set',
        type: 'tool',
        price: 19.99,
        description: 'A three-piece set including a trowel, transplanter, and cultivator.',
        image: findImage('gardening-tools-1')
    },
];

export const achievements: Achievement[] = [
    {
        id: 'ach-01',
        name: 'First Sprout',
        description: 'Successfully cared for your first plant for a month.',
        dateEarned: '2023-02-15',
        icon: 'leaf'
    },
    {
        id: 'ach-02',
        name: 'Watering Wizard',
        description: 'Watered your plants on time for 30 consecutive days.',
        dateEarned: '2023-04-01',
        icon: 'droplet'
    },
    {
        id: 'ach-03',
        name: 'Green Thumb',
        description: 'Raised 5 different types of plants.',
        dateEarned: '2023-06-10',
        icon: 'star'
    },
    {
        id: 'ach-04',
        name: 'Sun Worshipper',
        description: 'Found the perfect sunny spot for a sun-loving plant.',
        dateEarned: '2023-07-20',
        icon: 'sun'
    },
    {
        id: 'ach-05',
        name: 'Plant Parent',
        description: 'Successfully propagated your first plant.',
        dateEarned: '2023-08-01',
        icon: 'heart'
    },
    {
        id: 'ach-06',
        name: 'On Fire!',
        description: 'Maintained a 7-day streak of app usage.',
        dateEarned: '2023-08-08',
        icon: 'flame'
    },
];

export const certificates: Certificate[] = [
    {
        id: 'cert-01',
        name: 'AI Plant Identification Specialist',
        description: 'Mastered the use of AI for identifying over 10 different plant species.',
        dateEarned: '2023-09-01',
    },
    {
        id: 'cert-02',
        name: 'AI Plant Health Diagnostics',
        description: 'Successfully diagnosed 20+ plant health issues using GreenAI Health Diagnosis.',
        dateEarned: '2023-09-15',
    },
];


export const quirkyReminders: string[] = [
    "Aaj mujhe paani nahi mila toh kal tu guilt se royega.",
    "Hydration check! Your plant needs water, not your tears.",
    "Oye hoye! Your plant is looking drier than my jokes! Water me!",
    "Are you a gardener? Because you're making my leaves weak. Water me!",
    "Thirsty Thursday isn't just for you. Your plants want a drink too!",
    "I'm not saying I'm thirsty, but I'm starting to see a mirage of a watering can.",
    "Roses are red, violets are blue, I'm really thirsty, whatcha gonna do?",
]
