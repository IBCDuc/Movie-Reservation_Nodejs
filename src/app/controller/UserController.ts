import UsersRepository from "../../repositories/UsersRepository";
import { Request, Response } from "express";
import { UserService } from "../services/UserService";
export class UserController {
  static async addUser(req: Request, res: Response) {
    try {
      const {User_name, Email, Password} = req.body;
      await UserService.addUser(User_name, Email, Password);
      res.status(201).json( { message: "tao thanh cong user", user: User_name } );

    } catch (err) {
      console.log(err + "lỗi ở đây hahaha");
      res.status(404);
    }
  } 
  static async getUser(req: Request, res: Response) {
    try {

      const userdata = await UserService.getUser();
      res.json(userdata)
      // res.status(200).json({message: 'du lieu da duoc gui', status: "success"})
    } catch (err) {
      console.log(err);
      res.status(500).send('server error');

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
  static async deleteUser(req: Request, res: Response) {
    const id = req.query.id
    // const id = req.query.params
    // const id2 = req.params.params
    
    try {
      await UserService.deleteUser(id);
      res.status(200).json({message: 'delete thanh cong', status: "success"})
    } catch (err) {
      console.log(err);
      res.status(404);
    }
  }
  
}
