import { User } from "../Models/user.model"
import { _login, login, register } from "../types/account.type"
import { user } from "../types/user"

export const AccountService = {
    login: async function (loginDeta: login): Promise<user> {
        const user = await User.findOne({ username: loginDeta.username })
            .populate("photos")
            .populate({
                path: "following",
                select: "_id"
            })
            .populate({
                path: "followers",
                select: "_id"
            })
            .exec()
        if (!user)
            throw new Error("user does not exist")
        const verifyPassword = user.verifyPassword(loginDeta.password)
        if (!verifyPassword)
            throw new Error("password is incod")
        return user.toUser()

    },
    createNewUser: async function (registerData: register): Promise<user> {
        const user = await User.findOne({ username: registerData.username }).exec()
        if (user)
            throw new Error(`${registerData.username}already exists`)
        const newUser = await User.createUser(registerData)
        return newUser.toUser()

    }

}