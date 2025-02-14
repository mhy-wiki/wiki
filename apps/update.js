/* eslint-disable import/no-unresolved */
import lodash from "lodash"
import { exec, execSync } from "child_process"
import makemsg from "../../../lib/common/common.js"

import { wikiPath } from "../components/index.js"

const checkAuth = async function(e) {
  if (!e.isMaster) {
    e.reply("只有主人才能命令喵喵哦~ (*/ω＼*)")
    return false
  }
  return true
}
let timer
let uping = false
let isUp = false

export class updateWiki extends plugin {
  constructor() {
    super({
      name: "updateWiki",
      dsc: "扩展wiki更新",
      event: "message",
      priority: -20,
      rule: [
        {
          reg: "#扩展wiki((强制)?更新|更新日志)",
          fnc: "update"
        }
      ]
    })
  }

  async accept(e) {
    if (/^#(强制)?更新(日志)?wiki$/.test(e.msg)) e.msg = /日志/.test(e.msg) ? "#扩展wiki更新日志" : /强制/.test(e.msg) ? "#扩展wiki强制更新" : "#扩展wiki更新"
  }

  async update(e) {
    if (!await checkAuth(e)) return true
    if (e.msg.includes("更新日志")) return e.reply(await updatelog(e))
    if (uping) return e.reply("已有更新任务执行中...请勿重复操作")
    let isForce = e.msg.includes("强制")
    let update = await this.updatePlugin(e, "wiki", isForce)
    setTimeout(async() => {
      if (update) update = await this.updatePlugin(e, "miao-plugin", isForce)
    }, 1000)
    if (isUp && update) await this.restart(e)
    return true
  }

  async updatePlugin(e, plugin, isForce) {
    let command = "git  pull"
    if (isForce) command = "git  checkout . && git  pull"
    e.reply(`正在${isForce ? "强制" : ""}更新${plugin}，请稍等`)
    e.oldCommitId = getcommitId(plugin)
    let path = wikiPath.getDir(plugin)
    let msg
    exec(command, { cwd: path }, function(error, stdout, stderr) {
      if (/(Already up[ -]to[ -]date|已经是最新的)/.test(stdout)) return true
      if (error) {
        msg = plugin + "更新失败！\nError code: " + error.code + "\n" + error.stack + "\n 请稍后重试。"
        return false
      }
      isUp = true
    })
    e.reply(isUp ? await updatelog(e, plugin) : (msg || `目前已经是最新版${plugin}了~`))
    return !!msg
  }

  async restart(e) {
    e.reply("更新成功，正在尝试重新启动Yunzai以应用更新...")
    timer && clearTimeout(timer)
    await redis.set("miao:restart-msg", JSON.stringify({
      uin: e?.self_id || e.bot.uin,
      qq: e.user_id,
      isGroup: !!e.isGroup,
      id: e.group_id || e.user_id,
      time: new Date().getTime()
    }), { EX: 90 })
    let npm = checkPnpm()
    timer = setTimeout(function() {
      let command = `${npm} start`
      if (process.argv[1].includes("pm2")) command = `${npm} run restart`
      exec(command, { windowsHide: true }, function(error, stdout, stderr) {
        if (error) {
          logger.error(`重启失败\n${error.stack}`)
          return e.reply("自动重启失败，请手动重启以应用新版本。\nError code: " + error.code + "\n" + error.stack + "\n")
        } else if (stdout) {
          logger.mark(`重启成功，运行已转为后台，查看日志请用命令：${npm} run log`)
          logger.mark(`停止后台运行命令：${npm} stop`)
          process.exit()
        }
      })
    }, 1000)
  }
}

async function updatelog(e, plugin = "wiki") {
  let cm = `cd ./plugins/${plugin}/ && git log  -20 --oneline --pretty=format:"%h||[%cd]  %s" --date=format:"%F %T"`

  let logAll
  try {
    logAll = execSync(cm, { encoding: "utf-8", windowsHide: true })
  } catch (error) {
    logger.error(error.toString())
    e.reply(error.toString())
  }
  if (!logAll) return false
  logAll = logAll.split("\n")
  let log = []
  for (let str of logAll) {
    str = str.split("||")
    if (str[0] == e.oldCommitId) break
    if (str[1].includes("Merge branch")) continue
    log.push(str[1])
  }
  let line = log.length
  log = log.join("\n\n")
  if (log.length <= 0) return ""
  return await makemsg.makeForwardMsg(e, [ log ], `${plugin}更新日志，共${line}条`)
}

function getcommitId(plugin = "wiki") {
  const commitId = execSync(`cd plugins/${plugin} && git rev-parse --short HEAD`, { encoding: "utf-8" })
  return lodash.trim(commitId)
}

function checkPnpm() {
  let npm = "npm"
  let ret = execSync("pnpm -v")
  if (ret.stdout) npm = "pnpm"
  return npm
}
