
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