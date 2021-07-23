import { Request, Response } from "express";
import {
  findUserByDni,
  createCredentials,
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  findChildren,
} from "../../infrastructure/repositories";
import { User, Credentials } from "../../domain/entities";
import { httpStatus } from "../../domain/enums";
import { ResponseDto } from "../../presentation/dtos/response.dto";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { extractTokenFromHeader, generateToken, validateToken } from "../../infrastructure/utils/jwt";
import { classToPlain, plainToClass } from "class-transformer";
import { isFather } from "../../infrastructure/utils/user";

export const createUserController = async (req: Request, res: Response) => {
  const credentials = new Credentials(req.body.email, bcrypt.hashSync(req.body.password, 12), uuid());
  const user = new User(req.body.nombre, req.body.apellido, req.body.dni, credentials.id, false);
  try {
    await createCredentials(credentials);
    await createUser(user);
    return res.status(201).json(new ResponseDto(httpStatus.CREATED, "Creado con éxito"));
  } catch (err) {
    return res
      .status(500)
      .json(new ResponseDto(httpStatus.INTERNAL_SERVER_ERROR, "Error al crear el recurso", err.message));
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const userInfo: any = validateToken(extractTokenFromHeader(req.headers));
    await updateUser(req.body, userInfo.id);
    return res.status(200).json(new ResponseDto(httpStatus.OK, "Modificación exitosa"));
  } catch (err) {
    return res.status(401).json(new ResponseDto(httpStatus.UNAUTHORIZED, "No está autorizado..."));
  }
};

export const updateChildController = async (req: Request, res: Response) => {
  try {
    const userInfo: any = validateToken(extractTokenFromHeader(req.headers));
    if (isFather(await findUserById(userInfo.id), req.params.id)) {
      await updateUser(req.body, req.params.id);
      return res.status(200).json(new ResponseDto(httpStatus.OK, "Modificación exitosa"));
    } else {
      throw new Error();
    }
  } catch (err) {
    return res.status(401).json(new ResponseDto(httpStatus.UNAUTHORIZED, "No está autorizado..."));
  }
};

export const findUserController = async (req: Request, res: Response) => {
  try {
    const user = plainToClass(User, await findUserByDni(req.params.dni));
    const childrenId = [];
    for (let child of user.children) {
      childrenId.push(findUserById(child));
    }
    const childrenInfo = await Promise.all(childrenId);
    const userWithChildren = classToPlain(user);
    userWithChildren.children = childrenInfo;
    if (user) return res.status(200).json(new ResponseDto(httpStatus.OK, "Usuario Encontrado", userWithChildren));

    return res.status(404).json(new ResponseDto(httpStatus.NOT_FOUND, "Usuario no encontrado"));
  } catch (err) {
    return res
      .status(500)
      .json(new ResponseDto(httpStatus.INTERNAL_SERVER_ERROR, "Error al encontrar el recurso", err.message));
  }
};

export const createChildController = async (req: Request, res: Response) => {
  try {
    const userInfo: any = validateToken(extractTokenFromHeader(req.headers));
    const father = plainToClass(User, await findUserById(userInfo.id));
    const credentials = new Credentials(req.body.email, bcrypt.hashSync(req.body.password, 12), uuid());
    const child = new User(req.body.nombre, req.body.apellido, req.body.dni, credentials.id, true);
    await createCredentials(credentials);
    await createUser(child);
    father.addChildren(child.credentials);
    await updateUser(father, father.credentials);
    return res.status(201).json(new ResponseDto(httpStatus.CREATED, "Hijo creado con éxito"));
  } catch (err) {
    return res
      .status(500)
      .json(new ResponseDto(httpStatus.INTERNAL_SERVER_ERROR, "Error al crear el recurso", err.message));
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  const credentials = await findUserByEmail(req.body.email);
  if (credentials && bcrypt.compareSync(req.body.password, credentials.password)) {
    let user = await findUserById(credentials.id);
    if (user) {
      return res.status(200).json({
        response: new ResponseDto(httpStatus.OK, "Usuario"),
        token: generateToken({ email: credentials.email, id: credentials.id }),
      });
    }
  }
  return res.status(400).json(new ResponseDto(httpStatus.BAD_REQUEST, "Email y/o contraseña incorrectos"));
};

export const listChildren = async (req: Request, res: Response) => {
  try {
    validateToken(extractTokenFromHeader(req.headers));
    const childrenList = await findChildren();
    return res.status(200).json(new ResponseDto(httpStatus.OK, "Encontrado", childrenList));
  } catch (err) {
    return res.status(400).json(new ResponseDto(httpStatus.BAD_REQUEST, "Error"));
  }
};
