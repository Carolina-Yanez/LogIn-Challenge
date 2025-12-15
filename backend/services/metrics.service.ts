import fs from "fs"
import path from "path"
import { User } from "../interfaces/user.interface"

const db = path.join(__dirname, "../data/data.json")

export const getUserMetrics = (email: string) => {
    const users: User[] = JSON.parse(fs.readFileSync(db, "utf-8"))
    const user = users.find(user => user.email === email)

    if(!user) throw new Error("User not found")

    return{
        name: user.name,
        email: user.email,
        role: user.role,
        counterLogin: user.counterLogIn,
        lastLogin: user.lastLogIn
    }
}

export const getAdminMetrics = (email: string) => {
    const users: User[] = JSON.parse(fs.readFileSync(db, "utf-8"))
    const user = users.find(user => user.email === email)

    const totalUsers = users.length

    if(!user) throw new Error("User not found")

    return{
        user: {
            name: user.name,
            email: user.email,
            role: user.role,
            counterLogIn: user.counterLogIn,
            lastLogIn: user.lastLogIn
        },
        totalUsers,
        users: users.map(u => ({
            name: u.name,
            email: u.email,
            role: u.role,
            counterLogin: u.counterLogIn,
            lastLogin: u.lastLogIn
        }))
    }
}
