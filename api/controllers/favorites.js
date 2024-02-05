import { User } from "../models/User.js";

export const postAddFavorite = async (req, res, next) => {
  try {
    const productId = req.params.prodId;
    const userId = req.userId;

    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $addToSet: { favoriteProducts: productId },
      }
    );

    res.status(200).json("Product added to favorites successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRemoveFavorite = async (req, res, next) => {
  try {
    const productId = req.params.prodId;
    const userId = req.userId;

    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $pull: { favoriteProducts: productId },
      }
    );

    res.status(200).json("Product removed to favorites successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
