import AdminRepository from "../../repositories/AdminRepository";


export class AdminService {

    //ADMIN
    static async getAdmin() {
        return await AdminRepository.getAdmin()
    }

        static async loginAdmin(email, password) {
            const user = await AdminRepository.loginAdmin(email, password);
            return user;
        }

}