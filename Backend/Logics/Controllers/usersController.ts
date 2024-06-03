import express, { NextFunction, Request, Response } from "express";
import {  registeration, userLogin } from "../Logics/users";
import { User } from "../Models/typs/users";


const router = express.Router();



router.post('/register/users', async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {
        const newApplication = req.body as User;
        const response = await registeration(newApplication);
       res.status(201).json(response);
    } catch (err) {
        nextfunc(err);
    }
});



router.post('/login/users', async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {
        const newApplication = req.body as User;
        const response = await userLogin(newApplication);
       res.status(201).json(response);
    } catch (err) {
        nextfunc(err);
    }
});

router.get('/get', async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {

    
        res.send("hlow word");
    } catch (err) {
        nextfunc(err);
    }
});
export default router