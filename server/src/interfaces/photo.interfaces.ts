import mongoose from "mongoose"
import { photo } from "../types/photo.type"
import { user } from "../types/user"

type photoWithOutID = Omit<photo, 'id'>
export interface IphotoDocument extends mongoose.Document, photoWithOutID {
    user: mongoose.Types.ObjectId,
    created_at?: Date,
    toPhoto: () => photo

}
export interface IphotoModel extends mongoose.Model<IphotoDocument> {
    setAvatar: (photo_id: string, user_id: string) => Promise<boolean>
}