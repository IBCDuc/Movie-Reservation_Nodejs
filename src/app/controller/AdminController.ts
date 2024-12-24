import { generateToken } from '../../jwt';
import { CookieOptions } from 'express';
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

    static async loginAdmin(req: Request, res: Response) {
      const { email, password } = req.body;
      try {
          const admin = await AdminService.loginAdmin(email, password);
          
          // Generate JWT token
          const token = generateToken({ 
              id: admin.admin_id,
              email: admin.Admin_email,
              role: 'admin'
          });
  
          // Set cookie options
          const cookieOptions: CookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 12 * 60 * 60 * 1000, // 12 hours
            sameSite: 'strict' as const
          };
  
          // Set token in cookie
          res.cookie('token', token, cookieOptions);
  
          // Return user data
          res.status(200).json({
              success: true,
              admin,
              token,
              role: 'admin'
          });
      } catch (err) {
          console.log(err);
          res.status(401).json({
              success: false,
              message: 'Invalid credentials'
          });
      }
    }
}
