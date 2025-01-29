import { Static, t, TSchema } from "elysia"

export const _pagination = t.Object({
    pageSize: t.Number(),//100
    currentPage: t.Number(),//2
    length: t.Optional(t.Number()),//1000000
})

export type pagination = Static<typeof _pagination>

export function CreatePagination<T extends TSchema, U extends TSchema>(itemType: T, paginationType: U) {
    return t.Object({
        items: t.Array(itemType),
        pagination: paginationType
    })
}