import mongoose from "mongoose"
import { register,  } from "../types/account.type"
import { user } from "../types/user"


type userWithOutId = Omit<user, 'id'>
export interface IUserDocument extends mongoose.Document, userWithOutId {

    password_hash: string
    verifyPassword: (Password: string) => Promise<boolean>
    toUser: () => user
}
export interface IUserModel extends mongoose.Model<IUserDocument> {
    createUser: (registerData: register) => Promise<IUserDocument>

}