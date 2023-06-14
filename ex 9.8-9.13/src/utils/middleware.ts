import { Request, Response, NextFunction } from "express";

const info = (req: Request, _res: Response, next: NextFunction): void => {
    console.log('Method: ', req.method);
    console.log('Path: ', req.url);
    console.log('Body: ', req.body);
    console.log('---');
    next();
};

export default {info};