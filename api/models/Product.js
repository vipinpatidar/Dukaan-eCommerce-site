import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    productAdminId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    categories: {
      type: Array,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: Array,
      lowercase: true,
    },
    size: {
      type: Array,
      lowercase: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
