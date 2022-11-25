import { dbConnection } from "../../../database";
import { UserRepositoryDto } from "../dto/UserRepository";

export class UserRepository {
  save(user: UserRepositoryDto) {
    return dbConnection<UserRepositoryDto>("users").insert(user);
  }

  findById(id: string) {
    return dbConnection<UserRepositoryDto>("users")
      .select("*")
      .where("id", "=", id)
      .first();
  }

  findByEmail(email: string) {
    return dbConnection<UserRepositoryDto>("users")
      .select("*")
      .where("email", "=", email)
      .first();
  }

  findAllByEmail(email: string) {
    return dbConnection<UserRepositoryDto>("users")
      .select("*")
      .where("email", "=", email);
  }

  delete(id: string) {
    return dbConnection<UserRepositoryDto>("users")
      .delete()
      .where("id", "=", id);
  }

  update(userData: UserRepositoryDto) {
    return dbConnection<UserRepositoryDto>("users")
      .update(userData)
      .where("id", "=", userData.id);
  }
  verificationEmailPassword(userEmail: string, userPassword: string) {
    return dbConnection<UserRepositoryDto>("users")
      .where({
        email: userEmail,
        password: userPassword
      })
      .select("*")
      .first();
  }
  verificationEmail(userEmail: string) {
    return dbConnection<UserRepositoryDto>("users")
      .where({
        email: userEmail
      })
      .select("email");
  }
}
