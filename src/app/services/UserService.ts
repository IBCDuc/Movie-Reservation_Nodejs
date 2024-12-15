import AdminRepository from "../../repositories/AdminRepository";
import UsersRepository from "../../repositories/UsersRepository";

export class UserService {
    static async addUser (User_name, Email, Password) {
        await UsersRepository.addUser(User_name, Email, Password);
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

    //ADMIN


}