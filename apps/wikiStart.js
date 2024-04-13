import fs from 'node:fs'
import set from '../utils/setting.js'
import { Restart } from '../../other/restart.js'
import { pluginReplace, miaoPath } from '../utils/path.js'

var expandwiki = set.getCfg('wiki')?.expandWiki;

export class wikistart extends plugin {
  constructor() {
    super({
      name: '喵喵扩展wiki启动',
      dsc: 'wikiStar',
      event: 'message',
      priority: -5000,
      rule: [
        {
          reg: '^#?(扩展)?wiki([，,])?(启动|关闭(重启)?)([！!])?$',
          fnc: 'wikistar',
          permission: 'master'
        }
      ]
    })
  }

  async wikistar (e) {
    let msg = e.msg.replace(/^#?(扩展)?wiki([，,])?(强制)?([！!])?/g,'')
    if (msg == '启动') {
      if (expandwiki) return e.reply("喵喵扩展_wiki已启动,无需重复开启.")
      this.wikiPanel('star')
      await e.reply("喵喵扩展_wiki启动成功，正在执行重启操作以载入新wiki，请稍等...")
      this.restartApp()
      return true
    } else if (/关闭/.test(msg)) {
      if (!expandwiki) {
        e.reply("喵喵扩展_wiki未开启.")
        return true
      }
      if (/重启/.test(msg)) {
        this.wikiPanel('shut')
        this.wikiPanel('star')
        await e.reply("喵喵扩展_wiki关闭重启中，请稍等...")
        this.restartApp()
        return true
      }
      this.wikiPanel('shut')
      await e.reply("喵喵扩展_wiki已关闭，正在执行重启操作，请稍等...")
      this.restartApp()
      return true
    } else {
      return false
    }
  }

  async restartApp() {
    setTimeout(() => this.restart(), 1000);
  }

  restart() {
    new Restart(this.e).restart();
  }

  wikiPanel(type) {
    if (type === 'star') {
      let config = set.getCfg('wiki')
      config.expandWiki = true
      set.setCfg('wiki', config)
      fs.copyFileSync(`${pluginReplace}/models/index.js`,`${miaoPath}/models/index.js`)
    } else if (type === 'shut') {
      let config = set.getCfg('wiki')
      config.expandWiki = false
      set.setCfg('wiki', config)
      fs.copyFileSync(`${pluginReplace}/backup/apps/index.js`,`${miaoPath}/apps/index.js`)
      fs.copyFileSync(`${pluginReplace}/backup/models/index.js`,`${miaoPath}/models/index.js`)
    }
  }
}