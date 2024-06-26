import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/errors.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const data = User(req.body);
    data.password = bcrypt.hashSync(req.body.password, 10);
    const result = await data.save();
    if (result) {
      res
        .status(201)
        .send({ data: result, message: "user created successfully" });
    } else {
      res.status(400).send(result);
    }
  } catch (error) {
    console.log(error);
    next(error);
    // next(errorhandler("520","absdbfhdsfb"))
    // res.status(500).send({message:error.message});
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (validUser) {
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (validPassword) {
        const token = jwt.sign({ id: validUser._id }, process.env.SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(rest);
      } else {
        return next(errorHandler(404, "Wrong Password"));
      }
    } else {
      return next(errorHandler(404, "User not Found"));
    }
  } catch (error) {
    console.log(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: email,
        password: hashedPassword,
        avatar: photo,
      });
      const newusercreated = await newUser.save();
      if (newusercreated) {
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET);
        const { password: pass, ...rest } = newUser._doc;
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(rest);
      }
    }
  } catch (error) {
    next(error);
  }
};
