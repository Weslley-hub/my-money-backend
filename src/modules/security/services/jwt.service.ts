import jwt from "jsonwebtoken";

import { TokenPayloadDto } from "../dto/token-payload.dto";
const TOKEN_GENERATION_SECRET = "secret_hash_code";

export class JwtService {
  static generateAccessToken(userId: string) {
    const WEEK_SECONDS_TOTAL = 7 * 24 * 60;

    const token = jwt.sign({}, TOKEN_GENERATION_SECRET, {
      expiresIn: WEEK_SECONDS_TOTAL,
      subject: userId,
    });

    return token;
  }

  static verifyTokenValidation(token: string) {
    try {
      const tokenPayload = jwt.verify(token, TOKEN_GENERATION_SECRET);
      return tokenPayload as TokenPayloadDto;
    } catch (error) {
      throw new Error("Token de accesso inválido");
    }
  }
}
