import path from 'path'

const _path = process.cwd().replace(/\\/g, '/')

const miaoPath = path.join(_path, 'plugins', 'miao-plugin')
const pluginPath = path.join(_path, 'plugins', 'wiki')
const pluginReplace = path.join(pluginPath, 'replace')
const pluginResources = path.join(pluginPath, 'resources')
const miaoResources = path.join(miaoPath, 'resources')

export {
  _path,
  miaoPath,
  pluginPath,
  pluginReplace,
  pluginResources,
  miaoResources
}