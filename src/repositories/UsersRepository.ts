import { AppDataSource as dataSource } from "../data-source";
import { User } from "../entity/Users";

export default class UsersRepository {
  static async addUser(userData) {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          user_name: userData.name,
          email: userData.email,
          password: userData.password,
          create_at: new Date().toISOString().split('T')[0],
          update_at: null,
        },
      ])
      .execute();
  }
  static async getUser() {
    const user = await dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .getMany();

    return user;
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
  static async deleteUser() {
    const deleteUser = await dataSource
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id: 1 })
      .execute();
    return deleteUser;
  }
}
