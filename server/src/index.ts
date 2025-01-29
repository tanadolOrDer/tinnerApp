import { Elysia, t } from "elysia"

import { swaggerConfig } from "./config/swagger.config"
import { tlsConfig } from "./config/tls.config"
import cors from "@elysiajs/cors"
import { MongoDB } from "./config/database.config"
import { jwtConfig } from "./config/jwt.config"

import staticPlugin from "@elysiajs/static"
import { LikeController } from "./controllers/like.controller"
import { PhotoController } from "./controllers/photo.controller"
import { UserController } from "./controllers/user.controller"
import { AccountController } from "./controllers/account.controller"


MongoDB.connect()

const app = new Elysia()
  .use(AccountController)
  .use(LikeController)
  .use(jwtConfig)
  .use(swaggerConfig)
  .use(PhotoController)
  .use(UserController)
  .use(UserController)
  //.use(example)
  .use(cors())
  .use(staticPlugin({
    assets: "public/uploads",
    prefix: "img"
  }))
  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfig
  })

let protocol = 'http'
if ('cert' in tlsConfig)
  protocol = 'https'
console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)

