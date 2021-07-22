import { Request, Response } from "express";
import { createChild, createUser, findUser } from "../../infrastructure/repositories";
import { Child, User } from "../../domain/entities";
import { httpStatus } from "../../domain/enums";
import { ResponseDto } from "../../presentation/dtos/response.dto";
import { plainToClass } from "class-transformer";
import { connectDB } from "../../infrastructure/utils";

export const createUserController = async (req: Request, res: Response) => {
  const user = new User(req.body.nombre, req.body.apellido, req.body.dni);
  try {
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
    const user = await findUser(req.params.dni);
    if (user) return res.status(200).json(new ResponseDto(httpStatus.OK, "Usuario Encontrado", user));

    return res.status(404).json(new ResponseDto(httpStatus.NOT_FOUND, "Usuario no encontrado"));
  } catch (err) {
    return res
      .status(500)
      .json(new ResponseDto(httpStatus.INTERNAL_SERVER_ERROR, "Error al encontrar el recurso", err.message));
  }
};

export const createChildController = async (req: Request, res: Response) => {
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
