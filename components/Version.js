import fs from "node:fs"
import lodash from "lodash"
import { wikiPath } from "./index.js"

let logs = {}
let changelogs = []
let currentVersion
let versionCount = 3

const _logPath = wikiPath.getDir("wiki/CHANGELOG.md")

let packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))

const getLine = function(line) {
  line = line.replace(/(^\s*\*|\r)/g, "")
  line = line.replace(/\s*`([^`]+`)/g, "<span class=\"cmd\">$1")
  line = line.replace(/`\s*/g, "</span>")
  line = line.replace(/\s*\*\*([^*]+\*\*)/g, "<span class=\"strong\">$1")
  line = line.replace(/\*\*\s*/g, "</span>")
  line = line.replace(/ⁿᵉʷ/g, "<span class=\"new\"></span>")
  line = line.replace(/(~~([^~]+)~~)/g, "<del>$2</del>")
  return line
}

try {
  if (fs.existsSync(_logPath)) {
    logs = fs.readFileSync(_logPath, "utf8") || ""
    logs = logs.split("\n")

    let temp = {}
    let lastLine = {}
    lodash.forEach(logs, (line) => {
      if (versionCount <= -1) return false
      let versionRet = /^#\s*([0-9a-zA-Z\\.~\s]+?)\s*$/.exec(line)
      if (versionRet && versionRet[1]) {
        let v = versionRet[1].trim()
        if (!currentVersion) {
          currentVersion = v
        } else {
          changelogs.push(temp)
          if (/0\s*$/.test(v) && versionCount > 0) {
            versionCount = 0
          } else {
            versionCount--
          }
        }

        temp = {
          version: v,
          logs: []
        }
      } else {
        if (!line.trim()) return
        if (/^\*/.test(line)) {
          lastLine = {
            title: getLine(line),
            logs: []
          }
          temp.logs.push(lastLine)
        } else if (/^\s{2,}\*/.test(line)) {
          lastLine.logs.push(getLine(line))
        }
      }
    })
  }
} catch (err) {
  logger.error(err)
}

let yunzaiName = "Yunzai-Bot"
if (packageJson.name === "miao-yunzai") {
  yunzaiName = "Miao-Yunzai"
} else if (packageJson.name === "trss-yunzai") {
  yunzaiName = "TRSS-Yunzai"
} else if (packageJson.name === "a-yunzai") {
  yunzaiName = "A-Yunzai"
}

let Version = {
  get version() {
    return currentVersion
  },
  get copyright() {
    return {
      yunzaiName,
      yunzaiVersion: packageJson.version,
      pluginName: "wiki",
      pluginsVersion: changelogs[0].version
    }
  },
  get changelogs() {
    return changelogs
  }
}

export default Version
