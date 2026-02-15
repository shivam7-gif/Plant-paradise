import {Router} from 'express';
import { getAllFlowers, getFlowerById, createFlower, updateFlower, deleteFlower } from '../src/controllers/Flowers.controller';

const router = Router();
router.get("/flowers", getAllFlowers);
router.get("/flowers/:id", getFlowerById);
router.post("/flowers", createFlower);
router.put("/flowers/:id", updateFlower);
router.delete("/flowers/:id", deleteFlower);
export default router;