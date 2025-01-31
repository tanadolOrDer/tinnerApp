import { QueryPagination, UserQueryPagination } from "../_models/pagination"
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
export function parseQuery(query: QueryPagination | UserQueryPagination): string {
    let queryString = '?'
    if (query.pageSize)
        queryString += `&pageSize=${query.pageSize}`
    if (query.currentPage)
        queryString += `&currentPage=${query.currentPage}`
    if ('username' in query && query.username)
        queryString += `&username=${query.username}`
    if ('looking_for' in query && query.username)
        queryString += `&looking_for=${query.looking_for}`
    if ('min_age' in query && query.username)
        queryString += `&min_age=${query.min_age}`
    if ('max_age' in query && query.username)
        queryString += `&max_age=${query.max_age}`
    return queryString
}