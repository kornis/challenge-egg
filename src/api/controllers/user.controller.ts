import { Request, Response } from "express";
import {
  createChild,
  createCredentials,
  createUser,
  findUserByDni,
  findUserByEmail,
  findUserById,
} from "../../infrastructure/repositories";
import { Child, User, Credentials } from "../../domain/entities";
import { httpStatus } from "../../domain/enums";
import { ResponseDto } from "../../presentation/dtos/response.dto";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { generateToken } from "../../infrastructure/utils/jwt";

export const createUserController = async (req: Request, res: Response) => {
  const credentials = new Credentials(req.body.email, bcrypt.hashSync(req.body.password, 12), uuid());
  const user = new User(req.body.nombre, req.body.apellido, req.body.dni, credentials._id);
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

export const findUserController = async (req: Request, res: Response) => {
  try {
    const user = await findUserByDni(req.params.dni);
    if (user) return res.status(200).json(new ResponseDto(httpStatus.OK, "Usuario Encontrado", user));

    return res.status(404).json(new ResponseDto(httpStatus.NOT_FOUND, "Usuario no encontrado"));
  } catch (err) {
    return res
      .status(500)
      .json(new ResponseDto(httpStatus.INTERNAL_SERVER_ERROR, "Error al encontrar el recurso", err.message));
  }
};

/* export const createChildController = async (req: Request, res: Response) => {
  const child = new Child(req.body.nombre, req.body.apellido, req.body.dni);
  try {
    await createChild(child);
    return res.status(201).json(new ResponseDto(httpStatus.CREATED, "Hijo creado con éxito"));
  } catch (err) {
    return res
      .status(500)
      .json(new ResponseDto(httpStatus.INTERNAL_SERVER_ERROR, "Error al crear el recurso", err.message));
  }
};
 */
export const loginUserController = async (req: Request, res: Response) => {
  const credentials = await findUserByEmail(req.body.email);
  if (credentials && bcrypt.compareSync(req.body.password, credentials.password)) {
    let user = await findUserById(credentials._id);
    if (user) {
      return res.status(200).json({
        response: new ResponseDto(httpStatus.OK, "Usuario"),
        token: generateToken({ email: credentials.email, dni: user.dni }),
      });
    }
  }
  return res.status(400).json(new ResponseDto(httpStatus.BAD_REQUEST, "Email y/o contraseña incorrectos"));
};
