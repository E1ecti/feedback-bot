import { Bot } from "grammy"
import { BanList } from "./handlers/admin/ban"

import start from "./handlers/start"
import admin from "./handlers/admin"

if (!process.env.TOKEN || !process.env.ADMIN_ROOM)
	throw new Error("Please, specify TOKEN and ADMIN_ROOM")

export const MessagesMap = new Map<number, { chat: number, id: number }>()
const bot = new Bot(process.env.TOKEN)

bot.use(start)
bot.use(admin)

bot
	.filter(ctx => ctx.chat?.type === "private")
	.filter(ctx => !BanList.has(ctx.from?.id || 0))
	.on("message", ctx =>
		ctx.api.forwardMessage(process.env.ADMIN_ROOM!, ctx.from.id, ctx.message.message_id)
			.then(r => MessagesMap.set(r.message_id, { chat: ctx.chat.id, id: ctx.from.id }))
			.catch(err => {
				console.error(err)
				ctx.reply("Failed")
			})
	)

bot.start()
