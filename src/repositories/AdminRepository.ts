
import { AppDataSource as dataSource } from "../data-source";
import { Admin } from "../entity/Admin";

export default class AdminRepository {
  static async getAdmin() {
    const getAdmin = await dataSource
          .getRepository(Admin)
          .createQueryBuilder("admin")
          .getMany()
    return getAdmin
  }

    static async loginAdmin(email, password) {
      const admin = await dataSource
        .getRepository(Admin)
        .createQueryBuilder("admin")
        .where("Admin_email = :email", { email: email })
        .andWhere("Password = :password", { password: password })
        .getOne();
      return admin;
    }
}
