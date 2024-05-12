import { Cfg } from '#miao'
import lodash from 'lodash'
import CharImg from './character/CharImg.js'
import ProfileAvatar from '../../miao-plugin/models/avatar/ProfileAvatar.js'

const Profile = {
  init() {
    ProfileAvatar.getCostumeSplash = (profile, game = 'gs') => {
      let { char, name } = profile
      if (!Cfg.get('costumeSplash', true)) {
      return char.getImgs(profile._costume).splash
      }

      let costume = profile._costume
      costume = profile.char.checkCostume(costume) ? '2' : ''
      if (!Cfg.get('costumeSplash', true)) {
      return this.char.getImgs(profile._costume).splash
      }
      
      let nPath = `meta-${game}/character/${name}`
      let isSuper = false
      let talent = profile.talent ? lodash.map(profile.talent, (ds) => ds.original).join('') : ''
      let isGs = game === 'gs'
      if (isGs && (profile.cons === 6 || ['ACE', 'MAX'].includes(profile.artis?.markClass) || talent === '101010')) {
        isSuper = true
      }

      let treeSet = ['101', '102', '103', '201', '202', '203', '204', '205', '206', '207', '208', '209', '210']
      let treeSuper = false
      if (!isGs && profile.trees) {
        treeSuper = true
        lodash.forEach(profile.trees, (tree, idx) => {
          if (!tree.includes(treeSet[idx])) {
            treeSuper = false
          }
        })
      }
      if (!isGs && (profile.cons === 6 || ['ACE', 'MAX'].includes(profile.artis?.markClass) || (talent === '6101010' && treeSuper))) {
        isSuper = true
      }
      let trailblazer
      if (char._id == 8001 || char._id == 8003 || char._id == 8005) trailblazer = '穹'
      if (char._id == 8002 || char._id == 8004 || char._id == 8006) trailblazer = '星'
      if (isSuper) {
        return CharImg.getRandomImg(
          [`profile/super-character/${trailblazer ? trailblazer : name}`, `profile/normal-character/${trailblazer ? trailblazer : name}`],
          [`${nPath}/imgs/splash0.webp`, `${nPath}/imgs/splash${costume}.webp`, `/${nPath}/imgs/splash.webp`]
        )
      } else {
        return CharImg.getRandomImg(
          [`profile/normal-character/${trailblazer ? trailblazer : name}`],
          [`${nPath}/imgs/splash${costume}.webp`, `/${nPath}/imgs/splash.webp`]
        )
      }
    }
  }
}

export default Profile