import mongoose, { Document } from "mongoose";
import { ProductInterface } from "../types";

export type ProductDocument = ProductInterface & Document;

const { Schema } = mongoose;

const productSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sizing: [
    {
      type: Schema.Types.Mixed,
      required: true,
    },
  ],
  categories: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      required: true,
    },
  ],
});

export const Product = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);
