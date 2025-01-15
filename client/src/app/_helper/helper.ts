import { User } from "../_models/user"

const defaultAvater = '/assets/Davatar.png'
const Image_not_found = '/assets/lmage-not-found.png'
function getAvatar(user: User): string {
    if (user.photos) {
        const avatar = user.photos.find(p => p.is_avatar === true)
        if (avatar) {
            return avatar.url
        }
    }
    return defaultAvater
}
function getPhotoOfTheday(user: User) {
    if (user.photos && user.photos.length > 0) {
        const index = Math.floor(Math.random() * user.photos.length)
        return user.photos[index].url

    }
    return Image_not_found
}
export function parseUserPhoto(user: User): User {
    user.avatar = getAvatar(user)
    user.photoOfTheDay = getPhotoOfTheday(user)
    return user
}