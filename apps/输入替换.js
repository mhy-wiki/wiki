import { Data } from '#miao'
import { MysApi } from '#miao.models'

import { Config } from '../components/index.js'

const expandwiki = Config.getCfg('wiki')?.expandWiki
const wikiReg = /^#?(?:星铁)?(开拓者.*|(?:存护|毁灭|同谐|火|物理?|虚数)主|主角|星|琼|穹)(面板|面版|圣遗物|伤害|武器)(.*)/

export class wiki_replace extends plugin {
  constructor(e) {
    super({
      name: 'wiki替换',
      dsc: 'wiki_replace',
      event: 'message',
      priority: -5
    })
  }

  async accept(e) {
    if (!expandwiki) return false
    let msg = wikiReg.exec(e.msg)
    if (!msg) return false
    if (/开拓者.*|(存护|毁灭|同谐|火|物理?|虚数)主|星|琼|穹/.test(msg[1]) ) e.game = 'sr'
    if (!e.isSr) return false
    e.msg = /换/.test(msg[3]) ? e.msg.includes(msg[3], '') : e.msg
    let user = await MysApi.initUser(e);
    if (!user.uid) return false
    let json = Data.readJSON(`./data/PlayerData/sr/${user.uid}.json`)
    if (!json.avatars) return false
    let key = Object.keys(json.avatars)
    let keys = ['8001','8002','8003','8004','8005','8006']
    switch(msg[1]) {
      case '物主':
      case '物理主':
      case '毁灭主':
      case '开拓者物理':
      case '开拓者毁灭':
      case '开拓者•毁灭':
      case '开拓者·毁灭':
        keys = ['8001','8002']
        break
      case '火主':
      case '存护主':
      case '开拓者火':
      case '开拓者存护':
      case '开拓者•存护':
      case '开拓者·存护':
        keys = ['8003','8004']
        break
      case '虚数主':
      case '同谐主':
      case '开拓者虚数':
      case '开拓者同谐':
      case '开拓者•同谐':
      case '开拓者·同谐':
        keys = ['8005','8006']
        break
      default:
        keys = keys;
        break
    }
    let arr = key.filter(i => keys.includes(i))
    if (!arr[0]) return false
    e.original_msg = e.msg = json.avatars[arr[0]].name + msg[2] +msg[3]
    return false
  }
}