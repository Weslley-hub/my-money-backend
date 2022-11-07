import crypto from "crypto";

export class UserPasswordService {
  private static encryptSalt = process.env.ENCRYPT_SALT;
  private static numberOfInterations = 1000;
  private static generatedKeyLength = 64;
  private static hashAlgorithm = "sha512";

  static encryptPassword(password: string) {
    const encryptedPassword = crypto
      .pbkdf2Sync(
        password,
        this.encryptSalt,
        this.numberOfInterations,
        this.generatedKeyLength,
        this.hashAlgorithm
      )
      .toString(`hex`);

    return encryptedPassword;
  }
}
