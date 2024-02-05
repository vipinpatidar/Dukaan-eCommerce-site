import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
/*================== REGISTER ======================= */

export const postRegisterUser = async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (user) {
      return res.status(409).json({
        error:
          "username or email already exists. Please use other username or email.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashPassword,
    });

    // console.log(newUser);

    res.status(200).json("User created successfully.");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*================== LOGIN ======================= */

export const postLoginUser = async (req, res, next) => {
  try {
    const { identity, password } = req.body;

    const user = await User.findOne({
      $or: [{ username: identity }, { email: identity }],
    });

    if (!user) {
      return res.status(404).json({
        error:
          "username or email not exist. Please user correct username or email",
      });
    }

    const doMatch = await bcrypt.compare(password, user.password);

    if (!doMatch) {
      return res.status(404).json({
        error: "password not match. Please user correct password.",
      });
    }

    const { password: pass, ...loggedInUser } = user._doc;

    // console.log(loggedInUser.isAdmin);

    const token = await jwt.sign(
      {
        id: loggedInUser._id,
        isAdmin: loggedInUser.isAdmin,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token, loggedInUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const putLogout = (req, res, next) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
