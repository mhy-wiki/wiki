export default function(staticIdx, keyIdx) {
  return {
    "「我」的诞生": [
      (tables) => {
        return {
          title: "敌方目标当前生命值百分比小于等于50%追加伤害提高[tDmg]%",
          data: {
            tDmg: tables[1] + tables[2]
          }
        }
      }
    ],
    "今日亦是和平的一日": (tables) => {
      return {
        title: "根据能量上限提高数据",
        data: {
          dmg: ({ attr }) => tables[1] * Math.min(attr.sp, 160)
        }
      }
    },
    "别让世界静下来": [
      staticIdx(1, "recharge"),
      keyIdx("终结技造成的伤害提高[qDmg]%", "qDmg", 2)
    ],
    "天才们的休憩": [
      staticIdx(1, "atkPct"),
      keyIdx("消灭敌方目标后爆伤提高[cdmg]%", "cdmg", 2)
    ],
    "拂晓之前": [
      staticIdx(1, "cdmg"),
      keyIdx("战技和终结技造成的伤害提高[eDmg]%，追加攻击造成的伤害提高[tDmg]%", { eDmg: 2, qDmg: 2, tDmg: 3 })
    ],
    "早餐的仪式感": [
      staticIdx(1, "dmg"),
      (tables) => {
        return {
          title: "3层Buff下提高攻击力[atkPct]%",
          data: {
            atkPct: tables[2] * 3
          }
        }
      }
    ],
    "智库": [ keyIdx("使装备者终结技造成的伤害提高[qDmg]%", "qDmg", 1) ],
    "灵钥": [],
    "睿见": [ keyIdx("施放终结技时攻击力提高[atkPct]%", "atkPct", 1) ],
    "银河铁道之夜": [
      (tables) => {
        return {
          title: "3个敌方目标提高攻击力[atkPct]%，弱点击破时伤害提高[dmg]%",
          data: {
            atkPct: tables[1] * 3,
            dmg: tables[2]
          }
        }
      }
    ],
    "片刻，留在眼底": [
      staticIdx(1, "cdmg"),
      (tables) => {
        return {
          title: "根据装备者的能量上限提高伤害[qDmg]%",
          data: {
            qDmg: ({ attr }) => tables[2] * Math.min(attr.sp, 180)
          }
        }
      }
    ],
    "银河沦陷日": [
      staticIdx(1, "atkPct"),
      keyIdx("提高暴击伤害[cdmg]%", "cdmg", 2)
    ],
    "偏偏希望无价": [
      staticIdx(1, "cpct"),
      (tables) => {
        return {
          title: "装备者暴击伤害超过120%，追加攻击造成的伤害提升[tDmg]%，普通攻击无视敌人[aIgnore]%的防御力",
          data: {
            tDmg: ({ attr }) => attr.cdmg >= 120 ? Math.min(Math.floor((attr.cdmg - 120) / 20) * tables[2], tables[2] * 4) : 0,
            aIgnore: ({ attr }) => attr.cdmg >= 200 ? tables[3] : 0
          }
        }
      }
    ],
    "不息的演算": [
      staticIdx(1, "atkPct"),
      (tables) => {
        return {
          title: "释放攻击击中敌方目标，使攻击力提升[atkPct]%，击中3名或3名以上敌方目标使速度提高[speedPct]%",
          data: {
            atkPct: tables[2] * 5,
            speedPct: tables[3]
          }
        }
      }
    ]
  }
}
