import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll()
    res.json({ users })
};


export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
        res.status(404).json({
            msg: `User with id : ${id} not found`
        })
    } else {
        res.json({ user });
    }
};


export const postUser = async (req: Request, res: Response) => {
    const { body } = req;

    try {

        const found = await User.findOne({
            where: {
                email: body.email
            }
        });

        if (found) {
            return res.status(400).json({
                msg: `There's already an account created with ${body.email}. Try another one.`
            })
        } else {
            const newUser = await User.create(body)
            return res.json(newUser);
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: 'Something went wrong. Talk to the administrator'
        })
    }


};


export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const found = await User.findByPk(id);
        if(!found) return res.status(404).json({msg:`User with id : ${id} not found`})

        await found.update(body);
        res.json(found)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: 'Something went wrong. Talk to the administrator'
        })
    }
};


export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const found = await User.findByPk(id);
    if(!found) return res.status(404).json({msg:`User with id : ${id} not found`})

    await found.update({status:false});

    await User.destroy({
        where: {
            id: id
        }
    });
    
    return res.send('User succesfully deleted')
};