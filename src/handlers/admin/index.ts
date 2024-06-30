import { Composer } from "grammy"

import ban from "./ban"
import reply from "./reply"

const composer = new Composer()
export default composer

const filter = composer.filter(ctx =>
	ctx.chat?.id == process.env.ADMIN_ROOM &&
	ctx.message?.reply_to_message?.from?.id === ctx.me.id
)

filter.use(ban)
filter.use(reply)
