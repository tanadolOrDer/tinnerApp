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