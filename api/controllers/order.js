import mongoose from "mongoose";
import { Order } from "../models/Order.js";

// GET user Order
/*================= Get User Order  ============== */
export const getOrder = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (userId !== req.userId) {
      throw new Error("unAuthorized action");
    }

    // Update orders older than three days to status "Delivered"
    await Order.updateMany(
      {
        userId: userId,
        orderDate: {
          $lte: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
      },
      [
        {
          $addFields: {
            products: {
              $map: {
                input: "$products",
                as: "product",
                in: {
                  $cond: [
                    {
                      $in: [
                        "$$product.status",
                        ["Cancelled", "Refunded", "Returned", "Delivered"],
                      ],
                    },
                    "$$product",
                    {
                      $mergeObjects: ["$$product", { status: "Delivered" }],
                    },
                  ],
                },
              },
            },
          },
        },
      ]
    );

    // Update return order to status "Returned"
    await Order.updateMany(
      {
        userId: userId,
        "products.status": "Returned",
        "products.returnedDate": {
          $lte: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
      },
      {
        $set: {
          "products.$.status": "Refunded",
        },
      }
    );

    const currentOrder = await Order.find({
      userId: userId,
      orderDate: { $gte: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    })
      .populate("products.productId")
      .sort({ orderDate: -1 });

    const threeDayOldOrders = await Order.find({
      userId: userId,
      orderDate: { $lte: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    });

    res.status(200).json({ currentOrder, threeDayOldOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Three Day Old Orders
/*================= Get Three Day Old Orders  ============== */
export const getThreeDayOldOrders = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page } = req.query;

    const limit = 2;
    const skip = (page - 1) * limit;

    if (userId !== req.userId) {
      throw new Error("unAuthorized action");
    }

    const query = {
      userId: userId,
      orderDate: { $lte: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    };

    // Fetch orders older than three days
    const threeDayOldOrders = await Order.find(query)
      .populate("products.productId")
      .skip(skip)
      .limit(limit)
      .sort({ orderDate: -1 });

    const totalThreeDayOldOrders = await Order.countDocuments(query);

    res.status(200).json({
      threeDayOldOrders,
      totalPage: Math.ceil(totalThreeDayOldOrders / limit),
      currentPage: +page,
      totalOrders: totalThreeDayOldOrders,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel Order
/*================= Cancel Order  ================== */
export const putCancelOrder = async (req, res, next) => {
  try {
    const { orderId, amount, productId } = req.body;
    // console.log(orderId, amount, productId);

    const order = await Order.findOneAndUpdate(
      {
        _id: orderId,
        "products._id": productId,
      },
      {
        $set: {
          "products.$.status": "Cancelled",
        },
        $inc: { amount: -amount },
      },
      { new: true }
    );

    res.status(200).json({ message: "Order Cancelled" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Return Order
/*================= Return Order  ================== */
export const putReturnOrder = async (req, res, next) => {
  try {
    const { orderId, productId } = req.body;
    // console.log(orderId, amount, productId);

    const order = await Order.findOneAndUpdate(
      {
        _id: orderId,
        "products._id": productId,
      },
      {
        $set: {
          "products.$.status": "Returned",
          "products.$.returnedDate": new Date(),
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Order Returned" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//GET Admin Orders
/*================= Get Admin Orders  ================== */
export const getAdminOrders = async (req, res, next) => {
  try {
    const { adminId } = req.params;
    const { page } = req.query;

    const limit = 3;

    if (adminId !== req.userId) {
      throw new Error("unAuthorized action");
    }

    const pipeline = [
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "matchedProducts",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $unwind: "$matchedProducts",
      },
      {
        $match: {
          $expr: {
            $eq: ["$products.productId", "$matchedProducts._id"],
          },
          "matchedProducts.productAdminId": new mongoose.Types.ObjectId(
            adminId
          ),
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          amount: { $first: "$amount" },
          address: { $first: "$address" },
          orderDate: { $first: "$orderDate" },
          phone: { $first: "$phone" },
          pin: { $first: "$pin" },
          products: {
            $push: {
              productId: "$products.productId",
              color: "$products.color",
              size: "$products.size",
              quantity: "$products.quantity",
              status: "$products.status",
              _id: "$products._id",
              matchedProducts: {
                $cond: {
                  if: { $eq: ["$products.productId", "$matchedProducts._id"] },
                  then: "$matchedProducts",
                  else: null,
                },
              },
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          amount: { $first: "$amount" },
          address: { $first: "$address" },
          orderDate: { $first: "$orderDate" },
          phone: { $first: "$phone" },
          pin: { $first: "$pin" },
          products: { $push: "$products" },
        },
      },
      {
        $sort: { orderDate: -1 },
      },
      {
        $facet: {
          metadata: [{ $count: "totalDocs" }, { $addFields: { page: +page } }],
          orders: [{ $skip: (+page - 1) * limit }, { $limit: limit }],
        },
      },
      {
        $unwind: "$metadata",
      },
      {
        $project: {
          totalDocs: "$metadata.totalDocs",
          totalPage: { $ceil: { $divide: ["$metadata.totalDocs", limit] } },
          currentPage: "$metadata.page",
          orders: 1,
        },
      },
    ];

    const result = await Order.aggregate(pipeline);

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Set Status
/*================= Set Or Change Status  ================== */
export const putUpdateOrderStatus = async (req, res, next) => {
  try {
    const { orderId, status, prodObjId } = req.body;
    // console.log(orderId, status, prodObjId);

    if (status === "Returned") {
      await Order.findOneAndUpdate(
        {
          _id: orderId,
          "products._id": prodObjId,
        },
        {
          $set: {
            "products.$.status": "Returned",
            "products.$.returnedDate": new Date(),
          },
        }
      );
    } else {
      await Order.findOneAndUpdate(
        {
          _id: orderId,
          "products._id": prodObjId,
        },
        {
          $set: {
            "products.$.status": status,
          },
        }
      );
    }

    res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create Order
/*================= Create Order  ================== */
export const createOrder = async (req, res, next) => {
  try {
    const order = req.body;

    const newOrder = await Order.create(order);

    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*================= ================= ================== */

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

// GET ALL user Order
export const getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
