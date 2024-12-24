import UsersRepository from "../../repositories/UsersRepository";
import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { generateToken } from '../../jwt';
import { CookieOptions } from 'express';
import { User } from "../../entity/Users";


export interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

declare global {
    namespace Express {
        export interface Request {
            file?: MulterFile;
            user?: {
                id: number;
                email: string;
            };
        }
    }
}



export class UserController {
  static async addUser(req: Request, res: Response) {
    try {
      const {User_name, Email, Password, Address, phone} = req.body;
      await UserService.addUser(User_name, Email, Password, Address, phone);
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

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user = await UserService.login(email, password);
        
        // Generate JWT token
        const token = generateToken({ 
            id: user.user_id,
            email: user.email,
            role: 'user'
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
            user,
            token,
            role: 'user'
        });
    } catch (err) {
        console.log(err);
        res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
  }

  static async uploadAvatar(req: Request, res: Response) {
    try {
        if (!req.file || !req.user) {
            throw new Error('Missing file or user data');
        }

        const userId = req.user.id;
        const avatarUrl = `/uploads/${req.file.filename}`;
        
        await UserService.uploadAvatar(userId, avatarUrl);

        res.json({
            success: true,
            avatarUrl
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || 'Upload failed'
        });
    }
}
  static async updateUserInfo(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id)

        const {  user_name, address, phone } = req.body;
        console.log(id, user_name, address, phone);
        console.log(req.file);
        const updateData: any = {
            user_name,
            address,
            phone,
        };

        if (req.file) {
            const avatarUrl = `http://localhost:8000/uploads/${req.file.filename}`;
            updateData.avatar = avatarUrl;
        }

        await UserService.updateUserInfo(id, updateData);
        
        const updatedUser = await UserService.getUserById(id);
        
        res.status(200).json({
            status: 200,
            user: updatedUser,
            message: "User information updated successfully",
            role: 'user'
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }
  }
  static async getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    try {
        const user = await UserService.getUserById(parseInt(userId));
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({
            message: 'User not found'
        });
    }
  }
}
