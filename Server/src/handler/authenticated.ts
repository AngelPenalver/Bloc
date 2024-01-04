import { expressjwt } from "express-jwt";
// const secretKey: string = process.env?.SECRET_KEY;
import { Request, Response, NextFunction } from "express";
function authenticateJwt(req: Request, res:Response, next: NextFunction) {
  expressjwt({ secret: 'ElDollar.12', algorithms: ['HS256'] })(req, res, next);
}

export default authenticateJwt;
