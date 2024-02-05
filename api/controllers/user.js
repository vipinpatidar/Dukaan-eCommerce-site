import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

// GET user
export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById({ _id: userId });

    const { password, ...otherInfo } = user._doc;

    res.status(200).json(otherInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL user
export const getAllUser = async (req, res, next) => {
  try {
    const query = req.query.new;

    const users = query
      ? await User.find().sort({ createdAt: -1 }).limit(5)
      : await User.find();

    const allUsers = users.map((user) => {
      const { password, ...otherInfo } = user._doc;
      return otherInfo;
    });

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET USER STATS
export const getUserStats = async (req, res, next) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    console.log(lastYear);

    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//UPDATE user
export const updateUser = async (req, res, next) => {
  try {
    const { password, username, email, firstName, lastName, profileImg } =
      req.body;
    const { userId } = req.params;
    // console.log(req.body);

    const oldData = await User.findById({ _id: userId });

    if (userId !== req.userId) {
      throw "unAuthorized action";
    }

    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    } else {
      req.body.password = oldData.password;
    }

    if (profileImg) {
      req.body.profileImg = profileImg;
    } else {
      req.body.profileImg = oldData.profileImg;
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $set: req.body,
      },
      { new: true }
    );

    // console.log(updatedUser);

    const { password: pass, ...userOtherInfo } = updatedUser._doc;

    res.status(200).json(userOtherInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE user
export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (userId !== req.userId) {
      throw "unAuthorized action";
    }

    const user = await User.findByIdAndDelete({ _id: userId });

    res.status(200).json("User deleted successfully.");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
