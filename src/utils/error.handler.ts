import { Request, Response, NextFunction} from 'express';

export class AppError extends Error {
    public status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}


export const catchAsyncError = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>)=>{
  return (req: Request, res: Response, next: NextFunction) =>
  {
    fn(req, res, next).catch((error: Error) => next(error));
  };
};

