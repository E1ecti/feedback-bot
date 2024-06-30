import { Composer } from "grammy"
import { MessagesMap } from "../.."

const composer = new Composer()
export default composer

const BanList = new Set<number>()
export { BanList }


composer.command("ban",
	ctx => {
		let message = MessagesMap.get(ctx.message!.reply_to_message!.message_id)
		if (!message) return ctx.reply("Unable to find")

		BanList.add(message.chat)
		ctx.api.sendMessage(message.chat, "You have been blocked, your further messages will not be delivered")

		return ctx.reply("Success!")
	}
)