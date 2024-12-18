
import Elysia, { error, t } from "elysia"
import { imageHelper } from "../Helpper/img.helpper"
import { PhotoDto } from "../types/photo.type"
import { Authmiddleware, authPayload } from "../middleware/auts.middleware"
import { PhotoService } from "../service/photo.service"
const _imgeDB: { id: string, data: string, type: string }[] = []
export const PhotoController = new Elysia({
    prefix: "api/photo",
    tags: ['Photo']
})
    .use(PhotoDto)
    .use(Authmiddleware)
    .patch('/:photo_id', async ({ params: { photo_id }, set, Auth }) => {
        try {
            const user_id = (Auth.payload as authPayload).id
            await PhotoService.setAvatar(photo_id, user_id)
            set.status = "No Content"
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw error
            throw new Error("Someting went wrong, try agin later !!")
        }
    }, {
        detail: { summary: "Set Avatar" },
        isSignIn: true,
        params: "photo_id"
    })
    .delete('/:photo_id', async ({ params: { photo_id }, set }) => {
        try {
            await PhotoService.delete(photo_id)
            set.status = "No Content"
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw error
            throw new Error("Someting went wrong, try agin later !!")
        }
    }, {
        detail: { summary: "Delete photo by photo_id" },
        isSignIn: true,
        params: "photo_id"
    }
    )
    .get('/', async ({ Auth }) => {
        const user_id = (Auth.payload as authPayload).id
        return await PhotoService.getPhotos(user_id)
    }, {
        detail: { summary: "Get photo[] by user_id" },
        isSignIn: true,
        response: "photos"
    })
    .post('/', async ({ body: { file }, set, Auth }) => {
        const user_id = (Auth.payload as authPayload).id
        try {
            return await PhotoService.upload(file, user_id)
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw error
            throw new Error("Someting went wrong, try agin later !!")
        }
    }, {
        datail: { summary: "Upload photo" },
        body: "upload",
        response: "photo"
    })