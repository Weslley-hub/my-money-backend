import crypto from "crypto";
export class UserPasswordService {
  private static encryptSalt = "e4222f61065f46066c3c49d0c687391e";
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
    console.log(this.encryptSalt);
    return encryptedPassword;
  }
  static generateRandomPassword() {
    return Math.random().toString(36).slice(-10);
  }
}
