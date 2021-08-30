import { Request, Response } from "express";
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcryptjs'
import User, { IUser } from '../models/User';

export const signup = async (req: Request, res: Response) => {

    const body = req.body

    const user: IUser = new User({
        user: body.user,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    })

    const userDB = await user.save();

    const token: string = jwt.sign(
        { id: userDB._id }, 
        process.env.TOKEN_SECRET || 'tokenTest', 
        { expiresIn: '1h' }
    );

    res.status(200).json({
        userDB,
        token
    })
}

export const signin = async (req: Request, res: Response) => {
    try {
        const userDB = await User.findOne({ email: req.body.email });
    
        if (!userDB) {
            return res.status(400).json({ message: 'User! or password is wrong' })
        }
    
        if (!bcrypt.compareSync(req.body.password, userDB.password)) {
            res.status(400).json({ messsage: 'User or password! is wrong' })
        }

        const token: string =  jwt.sign(
            { id: userDB._id },
            process.env.TOKEN_SECRET || 'tokenTest', 
            { expiresIn: '1h' }
        )

        res.status(200).json({
            userDB,
            token
        })
    } catch (error) {
        res.status(400).json({ messageError: `Siging error ${error}`})
    }
}

export const profile = async (req: Request, res: Response) => {
    const userDB = await User.findById(req.userID)

    if (!userDB) return res.status(404).json('No user found')

    res.status(200).json(userDB)
}