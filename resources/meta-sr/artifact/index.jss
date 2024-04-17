// import fs from 'node:fs'
import lodash from 'lodash'
import artiBuffs from './calc.js'
import { Data, Meta } from '#miao'
import { artiSetAbbr, aliasCfg, artiAbbr } from './alias.js'
import { mainAttr, subAttr, attrMap } from '../../../../miao-plugin/resources/meta-sr/artifact/meta.js'

import { usefulAttr } from '../../../../miao-plugin/resources/meta-sr/artifact/artis-mark.js'

let data = Data.readJSON('/resources/meta-sr/artifact/data.json', 'miao')
// let data = Data.readJSON('resources/meta-sr/artifact/data.json', 'wiki')
// if (!fs.existsSync(`./plugins/wiki/resources/meta-sr/artifact/data.json`)) {
//   data = Data.readJSON('resources/meta-sr/artifact/data.json', 'miao')
// }
let metaData = Data.readJSON('/resources/meta-sr/artifact/meta.json', 'miao')

let setMeta = Meta.create('sr', 'artiSet')
let artiMeta = Meta.create('sr', 'arti')

let idMap = {}
lodash.forEach(data, (setData) => {
  let artiSet = {
    name: setData.name,
    effect: setData.skill,
    idxs: {}
  }
  setMeta.addDataItem(artiSet.name, artiSet)

  lodash.forEach(setData.idxs, (ds, idx) => {
    artiMeta.addDataItem(ds.name, {
      ...ds,
      set: setData.name,
      setId: setData.id,
      idx
    })
    idMap[ds.name] = lodash.keys(ds.ids).join(',')
    artiSet.idxs[idx] = ds.name
  })
})

setMeta.addAbbr(artiSetAbbr)
setMeta.addAlias(aliasCfg)

artiMeta.addAbbr(artiAbbr)
artiMeta.addAlias(idMap, true)
artiMeta.addMeta({
  artiBuffs, metaData, usefulAttr, mainAttr, subAttr, attrMap
})
