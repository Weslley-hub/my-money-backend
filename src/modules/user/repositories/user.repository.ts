import { dbConnection } from "../../../database";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserModel } from "../models/user.model";

export class UserRepository {
  save(user: UserModel) {
    return dbConnection<UserModel>("users").insert(user);
  }

  findById(id: string) {
    return dbConnection<UserModel>("users")
      .select("*")
      .where("id", "=", id)
      .first();
  }

  findByEmail(email: string) {
    return dbConnection<UserModel>("users")
      .select("*")
      .where("email", "=", email)
      .first();
  }

  findAllByEmail(email: string) {
    return dbConnection<UserModel>("users")
      .select("*")
      .where("email", "=", email);
  }

  delete(id: string) {
    return dbConnection<UserModel>("users").delete().where("id", "=", id);
  }

  update(userData: UserModel) {
    return dbConnection<UserModel>("users")
      .update(userData)
      .where("id", "=", userData.id);
  }
}
