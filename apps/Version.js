/* eslint-disable import/no-unresolved */
import { Common } from "#miao"
import { Version } from "../components/index.js"

export class wikiVersion extends plugin {
  constructor() {
    super({
      name: "扩展wiki版本",
      dsc: "wikiVersion",
      event: "message",
      priority: -20,
      rule: [
        {
          reg: "#扩展wiki版本",
          fnc: "version"
        }
      ]
    })
  }

  async version(e) {
    return await Common.render("wiki", "help/version-info", {
      currentVersion: Version.version,
      changelogs: Version.changelogs,
      ...Version.copyright
    }, { e, scale: 1.2 })
  }
}
