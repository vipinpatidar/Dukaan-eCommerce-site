import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cartProducts: [
      {
        _id: {
          type: Schema.Types.ObjectId,
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        productAdminId: {
          type: Schema.Types.ObjectId,
        },
        image: {
          type: String,
        },
        color: {
          type: String,
        },
        size: {
          type: String,
        },
        price: {
          type: Number,
        },
        size: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        userId: {
          type: String,
        },
        prodCartId: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);

/*
products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },

        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
     totalPrice: {
      type: Number,
      default: 0,
    },
*/
