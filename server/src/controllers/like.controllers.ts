import Elysia from "elysia"
import { Authmiddleware, authPayload } from "../middleware/auts.middleware"
import { UserDto } from "../types/user"
import { LikeService } from "../service/like.service"

export const LikeController = new Elysia({
    prefix: "api/like",
    tags: ['Like']
})
    .use(Authmiddleware)
    .use(UserDto)
    .put('/', async ({ body: { target_id }, set, Auth }) => {
        try {
            const user_id = (Auth.payload as authPayload).id
            await LikeService.toggleLike(user_id, target_id)
            set.status = "No Content"
        } catch (error) {
            set.status = "Bad Request"
            throw error
        }
    }, {
        detail: { summary: "Toggle Like" },
        isSignIn: true,
        body: "target_id"
    })
    .get('/followers', async ({ Auth, query }) => {
        const user_id = (Auth.payload as authPayload).id
        const user_pagination = await LikeService.getFollowers(user_id, query)
        return user_pagination
    }, {
        detail: { summary: "Get Followers" },
        isSignIn: true,
        query: "pagination",
        response: "users"
    })
    .get('/following', async ({ Auth, query }) => {
        const user_id = (Auth.payload as authPayload).id
        const user_pagination = await LikeService.getFollowing(user_id, query)
        return user_pagination
    }, {
        detail: { summary: "Get Following" },
        isSignIn: true,
        query: "pagination",
        response: "users"
    })