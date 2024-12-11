import Elysia from "elysia"
import { UserService } from "../service/user.service"
import { Authmiddleware, authPayload } from "../middleware/auts.middleware"
import { UserDto } from "../types/user"



export const UserController = new Elysia({
    prefix: "/api/user",
    tags: ['User']
})
    .use(UserDto)
    .use(Authmiddleware)


    .get('/all', () => {
        return {
            text: "hello wond"
        }
    }, {
        isSignIn: true
    })
    .get('/', ({ query, Auth }) => {
        const user_id = (Auth.payload as authPayload).id
        return UserService.get(query, user_id)
    }, {
        detail: { summary: "Get User" },
        query: "pagination",
        response: "users",
        isSignIn: true,
    })
    .patch('/', async ({ body, set, Auth }) => {
        try {
            const user_id =  (Auth.payload as authPayload).id
            await UserService.updateProfile(body, user_id)
            set.status = "No Content"
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw new Error(error.message)
            set.status = 500
            throw new Error("Something went wrong, try agin later")
        }
    }, {
        detail: { summary: "Update Profile" },
        body: "updateProfile",
        //response: "user",
        isSignIn: true
    }) 
