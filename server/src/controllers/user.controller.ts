import Elysia from "elysia"
import { UserDto } from "../types/user.type"
import { AuthMiddleWare, AuthPayload } from "../middleware/auth.middleware"
import { UserService } from "../service/user.service"


export const UserController = new Elysia({
    prefix: "/api/user",
    tags: ['User']
})
    .use(UserDto)
    .use(AuthMiddleWare)

    .get('/all', () => {
        return {
            user: [
                { id: '1212', name: 'a' },
                { id: '1211', name: 'b' },
            ]
        }
    })

    .get('/', ({ query, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        return UserService.get(query, user_id)
    }, {
        detail: { summary: "Get User" },
        query: "pagination",
        response: "users",
        isSignIn: true,
    })

    .patch('/', async ({ body, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await UserService.updateProfile(body, user_id)
            set.status = "No Content"
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw new Error(error.message)
            set.status = 500
            throw new Error('Something went wrong, try again later')
        }
    }, {
        detail: { summary: "Update Profile" },
        body: "updateProfile",
        // response: "user",
        isSignIn: true
    })