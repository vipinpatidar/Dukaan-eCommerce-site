import { Cart } from "../models/Cart.js";
import mongoose from "mongoose";

// GET ALL user cart
export const getAllCart = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const carts = await Cart.findOne({ userId: userId });
    // console.log(carts);

    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create And Update cart

export const createAndUpdateCart = async (req, res, next) => {
  try {
    if (req.body.userId !== req.userId) {
      throw new Error("unAuthorized action");
    }

    const isUserCart = await Cart.findOne({ userId: req.body.userId });

    // console.log(isUserCart);

    // if cart is not null then update the cart
    if (isUserCart) {
      const isSameProductIdx = isUserCart.cartProducts.findIndex(
        (product) =>
          product._id.toString() === req.body._id &&
          product.size === req.body.size &&
          product.color === req.body.color
      );

      // console.log(isSameProductIdx);

      // if product is already exist which color id and size are same then update product quantity
      if (isSameProductIdx >= 0) {
        isUserCart.cartProducts[isSameProductIdx].quantity += req.body.quantity;
        await isUserCart.save();

        res.status(200).json(isUserCart);
      } else {
        // if product is not same then push new product
        isUserCart.cartProducts.push({ ...req.body });
        await isUserCart.save();

        res.status(200).json(isUserCart);
      }
    } else {
      // if Initial Cart is null then create collection
      const newCart = new Cart({
        userId: req.body.userId,
      });

      newCart.cartProducts.push({ ...req.body });
      const p = await newCart.save();

      res.status(200).json(newCart);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET user Cart
export const addOneProduct = async (req, res, next) => {
  try {
    const product = req.body;

    if (product.userId !== req.userId) {
      throw new Error("unAuthorized action");
    }
    const cart = await Cart.findOne({
      userId: product.userId,
    });

    const index = cart.cartProducts.findIndex(
      (item) => item.prodCartId === product.prodCartId
    );

    cart.cartProducts[index].quantity += 1;

    await cart.save();

    res.status(200).json("added product");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//UPDATE user cart
export const removeOneProduct = async (req, res, next) => {
  try {
    const product = req.body;

    if (product.userId !== req.userId) {
      throw new Error("unAuthorized action");
    }
    const cart = await Cart.findOne({
      userId: product.userId,
    });

    const index = cart.cartProducts.findIndex(
      (item) => item.prodCartId === product.prodCartId
    );

    cart.cartProducts[index].quantity === 1
      ? cart.cartProducts.splice(index, 1)
      : (cart.cartProducts[index].quantity -= 1);

    await cart.save();

    res.status(200).json("removed product");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE user cart
export const deleteCartProduct = async (req, res, next) => {
  try {
    const product = req.params;

    if (product.userId !== req.userId) {
      throw new Error("unAuthorized action");
    }
    const cart = await Cart.findOne({
      userId: product.userId,
    });

    const index = cart.cartProducts.findIndex(
      (item) => item.prodCartId === product.prodCartId
    );

    // console.log(index);

    cart.cartProducts.splice(index, 1);

    await cart.save();

    res.status(200).json("Cart product deleted successfully.");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// DELETE user cart
export const deleteCartProductWithProduct = async (req, res, next) => {
  try {
    const productData = req.params;

    // console.log(productData);

    if (productData.userId !== req.userId) {
      throw new Error("unAuthorized action");
    }
    const cart = await Cart.findOne({
      userId: productData.userId,
    });

    let filteredProducts = cart.cartProducts.filter(
      (product) => product._id.toString() !== productData.prodId
    );

    // console.log(filteredProducts);

    cart.cartProducts = filteredProducts;

    await cart.save();

    res.status(200).json("Cart product deleted successfully.");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteClearCart = async (req, res) => {
  try {
    const productData = req.params;

    // console.log(productData);

    if (productData.userId !== req.userId) {
      throw new Error("unAuthorized action");
    }
    const cart = await Cart.findOne({
      userId: productData.userId,
    });

    cart.cartProducts = [];

    await cart.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
