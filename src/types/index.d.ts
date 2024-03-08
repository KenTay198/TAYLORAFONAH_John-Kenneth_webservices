declare namespace Express {
    export interface Request {
       role?: "user" | "admin"
    }
 }