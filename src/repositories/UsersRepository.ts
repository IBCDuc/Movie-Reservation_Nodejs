import { Admin } from "typeorm";
import { AppDataSource as dataSource } from "../data-source";
import { User } from "../entity/Users";

export default class UsersRepository {
  static async addUser(User_name, Email, Password) {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          user_name: User_name,
          email: Email,
          password: Password,
          create_at: new Date().toISOString().split('T')[0],
          update_at: null,
        },
      ])
      .execute();
  }
  static async getUser() {
    const user = await dataSource
      .getRepository(User)
      .createQueryBuilder("users")
      .getMany();

    return {data: user,
            total: user.length
};
  } 
  static async updateUser() {
    const updateUser = await dataSource
      .createQueryBuilder()
      .update(User)
      .set({
        name: "some name mb",
        email: "sth@",
        password: "myside",
      })
      .where("id = :id", { id: 7 })
      .execute();
    return updateUser;
  }
  static async deleteUser(id) {
    const deleteUser = await dataSource
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("User_id = :id", { id: id })
      .execute();
    return deleteUser;
  }


}
