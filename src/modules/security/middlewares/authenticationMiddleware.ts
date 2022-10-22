import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../api/types/api-error.type";
import { StatusCode } from "../../api/types/status-code.type";

import { TokenPayloadDto } from "../dto/token-payload.dto";
import { JwtService } from "../services/jwt.service";

export function authenticationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const token = getTokenFromRequestAuthorizationHeader(request);
    const tokenPayload = JwtService.verifyTokenValidation(token);

    if (!hasSubjectParam(tokenPayload)) {
      throw new Error("Token de acesso inválido");
    }

    request.userId = tokenPayload.sub!;
    next();
  } catch (error) {
    const parsedError = error as Error;

    return response.status(StatusCode.UNAUTHORIZED).json({
      message: parsedError.message,
      statusCode: StatusCode.UNAUTHORIZED,
      errorType: ApiError.UNAUTHORIZED,
    });
  }
}

function getTokenFromRequestAuthorizationHeader(request: Request) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new Error("Token de acesso não informado");
  }

  const token = authorization.replace("Bearer", "").trim();
  return token;
}

function hasSubjectParam(tokenPayload: TokenPayloadDto) {
  return !!tokenPayload.sub;
}
