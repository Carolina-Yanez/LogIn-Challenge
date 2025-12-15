import { verifyToken } from "../utils/generateToken.util"
import { loginService, signupService} from "../services/auth.service"
import { Request, Response } from "express"
import { User } from "../interfaces/user.interface"
import fs from "fs"
import path from "path";

const bd = path.join(__dirname, "..", "data", "data.json");

export const loginController = (req: Request, res: Response) => {
    const {email, password, isAdminLogin} = req.body

    try{
        const user = loginService(email, password, isAdminLogin)
        return res.json({
            message: "Login Succesful",
            token: user?.token,
            user:{
                name: user?.name,
                email: user?.email,
                role: user?.role
            }
        })
    }
    catch(err: any){
        return res.status(400).json({error: err.message})
    }
}

export const signupController = (req: Request, res: Response) => {
    const {name, email, password} = req.body

    try{
        const user = signupService(name, email, password)
        return res.json({
            message: "User Registered Succesfully",
            token: user?.token,
            user:{
                name: user?.name,
                email: user?.email
            }})
    }
    catch(err: any){
        return res.status(400).json({error: err.message})
    }
}

export const tokenController = (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader) return res.status(401).json({message: "Missing token"})

        const token = authHeader.split(" ")[1]
        const decoded = verifyToken(token)

        const users: User[] = JSON.parse(fs.readFileSync(bd, "utf-8"))
        const user = users.find(u => u.email === decoded.email)

        if(!user) return res.status(401).json({message: "user not found"})
        
        return res.json({ user })
    } catch (error: any) {
        return res.status(401).json({ message: "Invalid token" })
    }
}
