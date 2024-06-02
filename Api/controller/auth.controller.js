import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
export const signup = async (req, res) => {
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
    res.status(500).send({message:error.message});
  }
};
