import express, { NextFunction, Request, Response } from "express";
import { chatUser } from "../Models/typs/users";
import { dataChatConnect, disconnectAdmin, disconnectUser, getEmail, getUserSocketConnection } from "../Logics/chat";

const router = express.Router();


router.post('/chatData', async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {
        const newApplication = req.body as chatUser;
        const response = await dataChatConnect(newApplication);
       res.status(201).json(response);
    } catch (err) {
        nextfunc(err);
    }
});


router.get('/adminConnection', async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {
        const response = await getEmail();
       res.status(201).json(response);
    } catch (err) {
        nextfunc(err);
    }
});

router.post('/disconnect/user', async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {
        const newApplication = req.body.socketID;
        const response = await disconnectUser(newApplication);
       res.status(201).json(response);
    } catch (err) {
        nextfunc(err);
    }
});

router.get('/disconnect/admin', async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {
        const response = await disconnectAdmin();
       res.status(201).json(response);
    } catch (err) {
        nextfunc(err);
    }
});

router.post('/getUserConnection', async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {
        const email = req.body.email
        const response = await getUserSocketConnection(email);
       res.status(201).json(response);
    } catch (err) {
        nextfunc(err);
    }
});
export default router