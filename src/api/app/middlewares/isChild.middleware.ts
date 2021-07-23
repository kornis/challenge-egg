import { Request, Response, NextFunction } from "express";
import { httpStatus } from "../../../domain/enums";
import { findUserById } from "../../../infrastructure/repositories";
import { extractTokenFromHeader, validateToken } from "../../../infrastructure/utils/jwt";
import { ResponseDto } from "../../../presentation/dtos/response.dto";
export const isChildMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInfo: any = validateToken(extractTokenFromHeader(req.headers));
    const user = await findUserById(userInfo.id);
    if (user && !user.isChild) {
      next();
    } else {
      return res.json(401).json(new ResponseDto(httpStatus.UNAUTHORIZED, "Acceso denegado."));
    }
  } catch (err) {
    return res.json(400).json(new ResponseDto(httpStatus.BAD_REQUEST, "Error interno"));
  }
};
