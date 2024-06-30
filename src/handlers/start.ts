import { Composer } from "grammy"

const composer = new Composer()
export default composer


composer.command("start",
	ctx => {
		console.log(ctx.from)
		return ctx.reply("Hi!")
	}
)