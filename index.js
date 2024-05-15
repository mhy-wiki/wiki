import fs from 'node:fs'
import { Version } from './components/index.js'

if (!global.segment) global.segment = (await import('oicq')).segment

const files = fs.readdirSync('./plugins/wiki/apps').filter(file => file.endsWith('.js'))

let ret = []

if (Bot?.logger?.info) {
  Bot.logger.info('---------^_^---------')
  Bot.logger.info(`喵喵扩展_wiki插件${Version.version}初始化~`)
} else {
  console.log(`喵喵扩展_wiki插件${Version.version}初始化~`)
}

files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')

  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
export { apps }
