import mongoose from "mongoose"
import { User } from "../Models/user.model"
import { _userPagination, _userPaginator, user } from "../types/user"
import { QueryHelper } from "../Helpper/query.helper"

export const LikeService = {
    toggleLike: async function (user_id: string, target_id: string): Promise<boolean> {
        const target = await User.findById(target_id).select("_id").exec()
        if (!target)
            throw new Error("Invalid target_id")
        const likeTarget = await User.findOne({
            _id: new mongoose.Types.ObjectId(user_id),
            following: { $elemMatch: { $eq: target._id } }
        }).exec()
        if (likeTarget) {
            await User.findByIdAndUpdate(user_id, { $pull: { following: target_id } })
            await User.findByIdAndUpdate(target_id, { $pull: { followers: user_id } })
        } else {
            await User.findByIdAndUpdate(user_id, { $addToSet: { following: target_id } })
            await User.findByIdAndUpdate(target_id, { $addToSet: { followers: user_id } })
        }
        return true

    },
    getFollowers: async function (user_id: string, pagination: _userPagination): Promise<_userPaginator> {
        const _query = User.findById(user_id)
            .populate({
                path: "followers",
                match: { $and: QueryHelper.parseUserQuery(pagination) },
                select: '_id username display_name photos introduction dete_of_birth interest location gender ',
                populate: { path: "photos" }
            })
        const [docs, total] = await Promise.all([
            _query.exec(),
            User.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(user_id) } },
                { $project: { count: { $size: { $ifNull: ["$followers", []] } } } }
            ])
        ])
        pagination.length = total[0].count
        let followers: user[] = []
        if (docs) {
            followers = docs.toUser()['followers'] as user[]
        }
        return {
            pagination: pagination,
            items: followers
        }

    },
    getFollowing: async function (user_id: string, pagination: _userPagination): Promise<_userPaginator> {
        const _query = User.findById(user_id)
            .populate({
                path: "following",
                match: { $and: QueryHelper.parseUserQuery(pagination) },
                select: '_id username display_name photos introduction dete_of_birth interest location gender ',
                populate: { path: "photos" }
            })
        const [docs, total] = await Promise.all([
            _query.exec(),
            User.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(user_id) } },
                { $project: { count: { $size: { $ifNull: ["$following", []] } } } }
            ])
        ])
        pagination.length = total[0].count
        let following: user[] = []
        if (docs) {
            //following = docs.following as user[]
            following = docs.toUser()['following'] as user[]
        }
        return {
            pagination: pagination,
            items: following
        }

    },

}

