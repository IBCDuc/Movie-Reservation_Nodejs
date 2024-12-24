import AdminRepository from "../../repositories/AdminRepository";
import UsersRepository from "../../repositories/UsersRepository";
import { AppDataSource as dataSource } from "../../data-source";
import { User } from "../../entity/Users";
import userDTO from "../DTO/userDTO";



export class UserService {
    static async addUser (User_name, Email, Password, Address, phone) {
        await UsersRepository.addUser(User_name, Email, Password, Address, phone);
    }
    static async getUser() {
        const userDate = await UsersRepository.getUser();
        return userDate
    }



    static async updateUser() {
        await UsersRepository.updateUser()
    }
    static async deleteUser(id) {
        await UsersRepository.deleteUser(id)
    }

    static async login(email, password) {
        const user = await UsersRepository.login(email, password);
        return user;
    }

    static async uploadAvatar(id,avatar) {
        await UsersRepository.uploadAvatar(id,avatar)
    }

    static async updateUserInfo(userId: number, updateData: userDTO) {
        return await dataSource
            .getRepository(User)
            .update(userId, updateData);
    }

    static async getUserById(userId: number) {
        return await UsersRepository.getUserById(userId);
    }

    //ADMIN


}