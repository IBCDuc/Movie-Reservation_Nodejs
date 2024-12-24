import { Admin } from "typeorm";
import { AppDataSource as dataSource } from "../data-source";
import { User } from "../entity/Users";
import userDTO from "../app/DTO/userDTO";



export default class UsersRepository {
  static async addUser(
      User_name: string, 
      Email: string, 
      Password: string, 
      Address: string, 
      phone: number
    ) {
      await dataSource
          .createQueryBuilder()
          .insert()
          .into(User)
          .values([
              {
                  user_name: User_name,
                  email: Email,
                  password: Password,
                  address: Address,
                  phone: phone,
                  role: 'user',
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
  static async getUserById(userId: number) {
    const user = await dataSource
        .getRepository(User)
        .createQueryBuilder("users")
        .where("users.user_id = :userId", { userId })
        .getOne();
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
  static async deleteUser(id) {
    const deleteUser = await dataSource
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("User_id = :id", { id: id })
      .execute();
    return deleteUser;
  }

  static async login(email, password) {
    const user = await dataSource
      .getRepository(User)
      .createQueryBuilder("users")
      .where("email = :email", { email: email })
      .andWhere("password = :password", { password: password })
      .getOne();
    return user;
  }

  static async uploadAvatar(userId, avatarUrl) {
    await dataSource
            .getRepository(User)
            .update(userId, { avatar: avatarUrl });
  }

  static async updateUserInfo(userId: number, updateData: userDTO) {
    return await dataSource
        .getRepository(User)
        .update(userId, updateData);
  }

  





}
