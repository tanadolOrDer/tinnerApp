import Elysia, { t } from "elysia"

export const example = new Elysia()

    .get("/", () => "Hello World", {
        detail: {
            tags: ["Example"],
            summary: "Get Hello World",
            description: " bla bla bla"
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
        }),
        detail: {
            tags: ["Example"],
            summary: "About",
            description: " bla bla bla"
        }
    })