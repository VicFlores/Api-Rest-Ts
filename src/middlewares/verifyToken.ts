import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface IPayload {
    id: string;
    iat: number;
    exp: number;
}

export const tokenValidation = (req: Request, res: Response, next:NextFunction) => {
    
    const token = req.header('token');

    if (!token) return res.status(401).json('Acesso denegado')

    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokenTest') as IPayload

    req.userID = payload.id

    next();
}