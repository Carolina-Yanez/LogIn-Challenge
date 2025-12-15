import fs from "fs";
import { User } from "../interfaces/user.interface";
import {generateToken} from "../utils/generateToken.util"
import path from "path";

const bd = path.join(__dirname, "..", "data", "data.json");

export const loginService = (email: string, password: string, isAdminLogin: boolean = false) => {
    const users: User[] = JSON.parse(fs.readFileSync(bd, "utf-8"))

    const user = users.find((u: User) => u.email === email)

    //Validate credentials
    if (!user || user.password !== password) {
        return null
    }

    // Validate role if admin login is requested
    if (isAdminLogin && user.role !== 'ADMIN') {
        throw new Error("Access denied. Admin credentials required.")
    }

    const generatedToken = generateToken({email: user.email, role: user.role})
    user.token = generatedToken

    // Update login counter and last login time
    user.counterLogIn += 1
    user.lastLogIn = new Date()

    // Save updated data
    fs.writeFileSync(bd, JSON.stringify(users, null, 2), "utf-8")

    return user
}

export const signupService = (name: string, email: string, password: string) => {
    //Read file
    const users: User[] = JSON.parse(fs.readFileSync(bd, "utf-8"))

    // Check if user already exists
    const existingUser = users.find((u: User) => u.email === email)
    if (existingUser) {
        throw new Error("User with this email already exists")
    }

    const generatedToken = generateToken({email: email, role:'USER'})

    const user: User = {
        name: name,
        email: email,
        password: password,
        token: generatedToken,
        counterLogIn: 1,
        lastLogIn: new Date(),
        role: 'USER'
    }

    //Add new user
    users.push(user)

    // Save new data
    fs.writeFileSync(bd, JSON.stringify(users, null, 2), "utf-8")

    return user
}
