import fs from 'node:fs'

import Base from './Base.js'
import Character from '../../wiki/models/Character.js'
import Artifact from '../../wiki/models/Artifact.js'
import ArtifactSet from './ArtifactSet.js'
import Abyss from './Abyss.js'
import Player from './Player.js'
import Avatar from './Avatar.js'
import ProfileDmg from './ProfileDmg.js'
import ProfileRank from './ProfileRank.js'
import Material from './Material.js'
import Weapon from '../../wiki/models/Weapon.js'
import User from './User.js'
import MysApi from './MysApi.js'
import Button from './Button.js'

for (let game of ['gs', 'sr']) {
  if (game == 'gs') {
    for (let type of ['artifact', 'character', 'material', 'weapon']) {
      let file = `./plugins/wiki/resources/meta-gs/${type}/index.js`;
      if (fs.existsSync(file)) {
        await import(`file://${process.cwd()}/${file}`)
      } else {
        file = `./plugins/miao-plugin/resources/meta-gs/${type}/index.js`
        await import(`file://${process.cwd()}/${file}`)
      }
    }
  } else {
    for (let type of ['artifact', 'character', 'weapon']) {
      let file = `./plugins/wiki/resources/meta-sr/${type}/index.js`
      if (fs.existsSync(file)) {
        await import(`file://${process.cwd()}/${file}`)
      } else {
        await import(`file://${process.cwd()}/plugins/miao-plugin/resources/meta-sr/${type}/index.js`)
      }
    }
  }
}

export {
  Base,
  Abyss,
  Button,
  Character,
  Artifact,
  ArtifactSet,
  Avatar,
  ProfileDmg,
  ProfileRank,
  Material,
  Weapon,
  User,
  MysApi,
  Player
}
