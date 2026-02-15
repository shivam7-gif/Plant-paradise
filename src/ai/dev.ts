import { config } from 'dotenv';
config();

import '@/ai/flows/answer-plant-care-questions.ts';
import '@/ai/flows/identify-plant-from-photo.ts';
import '@/ai/flows/diagnose-plant-health-from-photo.ts';