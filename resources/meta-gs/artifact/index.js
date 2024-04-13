//import fs from 'node:fs'
import lodash from 'lodash'
//import calc from './calc.js'
import { Data, Meta } from '#miao'
import calc from '../../../../miao-plugin/resources/meta-gs/artifact/calc.js'
import { usefulAttr } from '../../../../miao-plugin/resources/meta-gs/artifact/artis-mark.js'
import { setAlias, setAbbr } from '../../../../miao-plugin/resources/meta-gs/artifact/alias.js'
import { mainAttr, subAttr, attrMap, attrNameMap, mainIdMap, attrIdMap } from '../../../../miao-plugin/resources/meta-gs/artifact/extra.js'

let setMeta = Meta.create('gs', 'artiSet')
let artiMeta = Meta.create('gs', 'arti')

let artis = Data.readJSON('resources/meta-gs/artifact/data.json', 'miao')
// let artis = Data.readJSON('resources/meta-gs/artifact/data.json', 'wiki')
// if (!fs.existsSync(`./plugins/wiki/resources/meta-gs/artifact/data.json`)) {
//   artis = Data.readJSON('resources/meta-gs/artifact/data.json', 'miao')
// }
let setIds = {}

lodash.forEach(artis, (ds) => {
  let artiSet = {
    name: ds.name,
    effect: ds.effect,
    idxs: {}
  }
  setMeta.addDataItem(ds.name, artiSet)

  lodash.forEach(ds.idxs, (as, idx) => {
    if (as.name) {
      let tmp = {
        set: ds.name,
        name: as.name,
        idx
      }
      artiSet.idxs[idx] = as.name
      artiMeta.addDataItem(as.name, tmp)

      setIds[artiSet.name] = setIds[artiSet.name] || as.id.toString().slice(0, 2)
    }
  })
})

setMeta.addAbbr(setAbbr)
setMeta.addAlias(setAlias)
setMeta.addAlias(setIds)
artiMeta.addMeta({
  mainAttr, subAttr, attrMap, attrNameMap, mainIdMap, attrIdMap,
  artiBuffs: calc,
  usefulAttr
})

setMeta.addMeta({
  artiBuffs: calc
})

