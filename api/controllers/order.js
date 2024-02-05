import { Order } from "../models/Order.js";

// GET user Order
export const getOrder = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (userId !== req.userId) {
      throw new Error("unAuthorized action");
    }

    const order = await Order.find({ userId: userId });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL user Order
export const getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//GET MONTHLY ORDER STATs
export const getOrderStats = async (req, res, next) => {
  try {
    const productId = req.query.prodId;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: prevMonth },
          ...(productId && { products: { $elemMatch: { productId } } }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create Order

export const createOrder = async (req, res, next) => {
  try {
    const order = req.body;

    const newOrder = await Order.create(order);

    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
