
import { Request, Response } from "express";
import { AdminService } from "../services/AdminService";

export class AdminController {

  static async getAdmin(req: Request, res: Response) {
    try {
      const resData = await AdminService.getAdmin();
      return res.json(resData);
    } catch(err) {
      res.status(404).json("something wrong here!!!")
    }
  }
}
