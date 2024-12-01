import UsersRepository from "../../repositories/UsersRepository";

export class UserService {
    static async addUser(userData: {name, email, password}) {
        await UsersRepository.addUser(userData);
    }
    static async getUser() {
        const userDate = await UsersRepository.getUser();
        return userDate
    }
    static async updateUser() {
        await UsersRepository.updateUser()
    }

}