import UsersRepository from "../../repositories/UsersRepository";
import { Request, Response } from "express";
import { UserService } from "../services/UserService";
export class UserController {
  static async addUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      await UserService.addUser(userData);
      res.status(201).json( { message: "tao thanh cong user", user: userData } );

    } catch (err) {
      console.log(err);
      res.status(404);

    }
  }
  static async getUser(req: Request, res: Response) {
    try {

      const userdata = await UserService.getUser();
      res.json(userdata)
      res.status(200).json({message: 'du lieu da duoc gui', status: "success"})
    } catch (err) {
      console.log(err);
      res.status(404);

    }
    
  }
  static async updateUser(req: Request, res: Response) {
    try {
      await UserService.updateUser();
      res.status(200).json({message: 'update thanhcong', status: "success"})
    } catch (err) {
      console.log(err);
      res.status(404);
    }
  }
}
