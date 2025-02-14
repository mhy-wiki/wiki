import CharWiki from "./wiki/CharWiki.js"
import { Config } from "../components/index.js"

const expandwiki = Config.getCfg("wiki")?.expandWiki

export class wiki extends plugin {
  constructor() {
    super({
      name: "喵喵:角色资料",
      dsc: "喵喵:角色资料",
      event: "message",
      priority: -20,
      rule: [
        {
          reg: "^#喵喵扩展WIKI$",
          fnc: "wiki"
        }
      ]
    })
  }

  accept(e) {
    if (!expandwiki) return false
    e.original_msg = e.original_msg || e.msg
    if (CharWiki.check(e, e.original_msg) === true) return true
  }

  async wiki(e) {
    if (!expandwiki) return false
    await CharWiki.wiki(e)
  }
}
