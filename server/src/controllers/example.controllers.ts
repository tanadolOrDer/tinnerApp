import Elysia, { t } from "elysia"


export const example = new Elysia()
    .get("/", () => "Hello Elysia", {
        detail: {
            tags: ["Example"],
            summary: "get/Hello",
            description: "Bra bra"
        }
    })
    .post("/about", ({ body }) => {
        return {
            id: 'xxx',
            msg: 'hello' + body.name
        }
    }, {
        body: t.Object({
            name: t.String()
        }), detail: {
            tags: ["Example"],
            summary: "abput",
            description: "Numbertwo"
        }
    })