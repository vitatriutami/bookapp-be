import { Request, Response } from "express";
import { User } from "../models/userSchema";

export const authController = {
  createUser: async (req: Request, res: Response) => {
    const {name, email, password} = req.body

    const createUser = new User({
      name,
      email,
      password
    })

    const saved = await createUser.save()

    return res.json(saved)
  }
}