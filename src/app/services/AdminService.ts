import AdminRepository from "../../repositories/AdminRepository";


export class AdminService {

    //ADMIN
    static async getAdmin() {
        return await AdminRepository.getAdmin()
    }

}