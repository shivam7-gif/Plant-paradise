import { Flower } from "../model/FlowerModel";
import { Request, Response } from "express";

// CREATE FLOWER
export const createFlower = async (req: Request, res: Response) => {
  try {
    const { name, images, price, originalPrice, category, rating, reviews } = req.body;
    
    if (!name || !images || !price || !originalPrice || !category || !rating || !reviews) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("Flower model:", Flower);
    console.log("Request body:", req.body);

    const flower = await Flower.create({
      name,
      images,
      price,
      originalPrice,
      category,
      rating,
      reviews
    });

    return res.status(201).json({
      message: "Flower created successfully",
      flower
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET ALL FLOWERS
export const getAllFlowers = async (req: Request, res: Response) => {
  try {
    const flowers = await Flower.findAll();
    return res.status(200).json(flowers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getFlowerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const flower = await Flower.findByPk(id);

    if (!flower) {
      return res.status(404).json({ message: "Flower not found" });
    }

    return res.status(200).json(flower);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateFlower = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const flower = await Flower.findByPk(id);

    if (!flower) {
      return res.status(404).json({ message: "Flower not found" });
    }

    await flower.update(req.body);
    return res.status(200).json({ message: "Flower updated", flower });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE FLOWER
export const deleteFlower = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const flower = await Flower.findByPk(id);

    if (!flower) {
      return res.status(404).json({ message: "Flower not found" });
    }

    await flower.destroy();
    return res.status(200).json({ message: "Flower deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
