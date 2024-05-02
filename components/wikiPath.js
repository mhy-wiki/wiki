import path from 'path'

let wikiPath = {
  getDir(_path, isres = false) {
    return path.join(process.cwd().replace(/\\/g, '/'), 'plugins', _path, isres ? 'resources' : '')
  }
}

export default wikiPath