import "../../../config/env.config";

import jwt from "jsonwebtoken";
import { TokenPayloadDto } from "../dto/token-payload.dto";

const JWT_SECRET = process.env.JWT_SECRET;

export class JwtService {
  static generateAccessToken(userId: string) {
    const WEEK_SECONDS_TOTAL = 7 * 24 * 60 * 60;

    const token = jwt.sign({}, JWT_SECRET, {
      expiresIn: WEEK_SECONDS_TOTAL,
      subject: userId,
    });

    return token;
  }

  static verifyTokenValidation(token: string) {
    try {
      const tokenPayload = jwt.verify(token, JWT_SECRET);
      return tokenPayload as TokenPayloadDto;
    } catch (error) {
      throw new Error("Token de accesso inválido");
    }
  }
}
