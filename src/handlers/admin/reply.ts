import { Composer } from "grammy"
import { MessagesMap } from "../.."

const composer = new Composer()
export default composer


composer.on("message", ctx => {
	const { chat, id } = MessagesMap.get(ctx.message.reply_to_message?.message_id || 0) ?? {}
	if (!chat || !id) return ctx.reply("Unable to find")

	return ctx.copyMessage(chat)
		// .then(r => MessagesMap.delete(r.message_id))
		// .then(() => ctx.reply("Sent"))
		.catch(err => ctx.reply("Failed: " + err.message))
})