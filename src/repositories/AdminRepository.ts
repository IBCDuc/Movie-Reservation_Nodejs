
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
}
