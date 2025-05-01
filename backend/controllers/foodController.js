import { createGunzip } from "zlib";
import foodModel from "../models/foodModel.js";
import path from "path";
import fs from 'fs';

const addFood = async (req, res) => {
    try {
        // const { name, description, price, category } = req.body;

        // if (!name || !description || !price || !category) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "All fields (name, description, price, category) are required.",
        //     });
        // }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded. Please include an image.",
            });
        }

        const img_filename = `${req.file.filename}`;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: img_filename,
        });

        await food.save();

        res.status(201).json({
            success: true,
            message: "Food added successfully!",
        });
    } catch (err) {
        console.log("Error adding food:", err);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding the food.",
        });
    }
} 

// list of food
const listFood = async (req, res) => {
    try {
        const food = await foodModel.find({});
        res.json({
            success: true,
            message: "Data fetched successfully",
            data: food
        })
    } catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: "Error",
        })
    }
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Food removed successfully",
        })
    } catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: "Error",
        })
    }
};

export { addFood, listFood, removeFood }