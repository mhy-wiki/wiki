import fs from "node:fs"
import wikiPath from "./wikiPath.js"
import Config from "./Config.js"
import Version from "./Version.js"

let packageJson = JSON.parse(fs.readFileSync(wikiPath.getDir("miao-plugin/package.json"), "utf8"))
let isFork = packageJson.isFork

export { wikiPath, Config, Version, isFork }
