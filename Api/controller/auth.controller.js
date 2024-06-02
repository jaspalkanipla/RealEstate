import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { errorhandler } from "../utils/errors.js";
export const signup = async (req, res,next) => {
  try {
    const data = User(req.body);
    data.password = bcrypt.hashSync(req.body.password, 10);
    const result = await data.save();
    if (result) {
      res.status(201).send({ data: result });
    } else {
      res.status(400).send(result);
    }
} catch (error) {
    console.log(error);
    next(error)
    // next(errorhandler("520","absdbfhdsfb"))
    // res.status(500).send({message:error.message});
  }
};
