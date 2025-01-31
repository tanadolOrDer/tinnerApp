import { User } from "../_models/user"
import { Paginator, UserQueryPagination } from "../_models/pagination"
import { parseUserPhoto } from "./helper"
const data = new Map()
type cachOpt = 'members' | 'chat' | 'follower' | 'following'
type cacheValue = Paginator<UserQueryPagination, User>
export const cacheManager = {
    createKey: function <T extends { [key: string]: any }>(query: T): string {
        return Object.values(query).join('-')
    },
    load: function (key: string, opt: cachOpt): cacheValue | undefined {
        return data.get(opt + key)


    },
    save: function (key: string, opt: cachOpt, value: cacheValue) {
        if (opt === "chat")
            value.item = value.item.map(u => parseUserPhoto(u))
        data.set(opt + key, value)
    },
    clear: function (opt: cachOpt | 'all') {
        if (opt === "all")

            data.clear()
        else
            for (const key of data.keys()) {
                if (key.startsWith(opt))
                    data.delete(key)

            }


    }


}