import path from "path"

let wikiPath = {
  /**
   * 统一输出路径
   * @param _path - 插件名/文件(夹)路径
   * @param isres - 是否为resources目录
   */
  getDir(_path, isres = false) {
    return path.join(process.cwd().replace(/\\/g, "/"), "plugins", _path, isres ? "resources" : "")
  }
}

export default wikiPath
