import express, { NextFunction, Request, Response } from "express";
import { getMessages, insertOrUpdateMessage } from "../Logics/message";
import { MessaeType } from "../Models/typs/users";

const router = express.Router();


router.post('/message', async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {
        const newApplication = req.body as MessaeType;
        const response = await insertOrUpdateMessage(newApplication);
       res.status(201).json(response);
    } catch (err) {
        nextfunc(err);
    }
});


router.post('/message/data', async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {
        let sender = req.body.sender;
        let rciver = req.body.reciver
        const response = await getMessages(sender, rciver);
       res.status(201).json(response);
    } catch (err) {
        nextfunc(err);
    }
});
export default router