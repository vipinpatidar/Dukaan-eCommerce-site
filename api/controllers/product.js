import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

// GET user
export const getAdminProducts = async (req, res, next) => {
  try {
    const { adminId } = req.params;

    const product = await Product.find({ productAdminId: adminId });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// GET user
export const getProduct = async (req, res, next) => {
  try {
    const { prodId } = req.params;

    const product = await Product.findById({ _id: prodId });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET Wishlist product

export const getWishListProduct = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const product = await User.findById({ _id: userId }).populate({
      path: "favoriteProducts",
    });

    res.status(200).json(product?.favoriteProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL user
export const getAllProduct = async (req, res, next) => {
  try {
    const sortQuery = req.query.sortIt;
    const categoryQuery = req.query.category;

    // console.log(sortQuery, categoryQuery);

    const query = {};

    const notCategoryQuery =
      categoryQuery !== "undefined" &&
      categoryQuery !== "" &&
      categoryQuery !== undefined &&
      categoryQuery !== false;

    if (notCategoryQuery) {
      query.categories = { $in: [categoryQuery] };
    }

    const notSortQuery =
      sortQuery === "newest" ||
      sortQuery === "" ||
      sortQuery === "undefined" ||
      sortQuery === undefined;

    const sortOptions = notSortQuery
      ? { createdAt: -1 }
      : sortQuery === "1"
      ? { price: -1 }
      : { price: 1 };

    // console.log(query, sortOptions);

    const products = await Product.find(query).sort(sortOptions);
    // console.log(products);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create Products

export const createProducts = async (req, res, next) => {
  try {
    const { productAdminId } = req.body;

    if (productAdminId !== req.userId) {
      throw "unAuthorized action";
    }

    const newProduct = await Product.create(req.body);

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//UPDATE user
export const updateProduct = async (req, res, next) => {
  try {
    const { prodId } = req.params;
    const { image, productAdminId } = req.body;

    // console.log(req.body);

    const oldData = await Product.findById({ _id: prodId });

    if (productAdminId.toString() !== req.userId) {
      throw "unAuthorized action";
    }

    if (image) {
      req.body.image = image;
    } else {
      req.body.image = oldData.image;
    }

    // console.log(image, productAdminId);

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: prodId },
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE user
export const deleteProduct = async (req, res, next) => {
  try {
    const { prodId } = req.params;

    const product = await Product.findByIdAndDelete({ _id: prodId });

    res.status(200).json(prodId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
