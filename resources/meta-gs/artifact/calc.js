const attr = function (key, val, elem = '', unit = '%') {
  const keyMap = {
    hp: '生命值',
    hpPlus: '生命值',
    atk: '攻击力',
    def: '防御力',
    cpct: '暴击率',
    dmg: '元素伤害',
    phy: '物理伤害',
    shield: '护盾强效',
    heal: '治疗',
    mastery: '元素精通'
  }
  let ret = {
    title: `${keyMap[key]}提高${val}${unit}`,
    isStatic: true,
    data: {}
  }
  ret.data[key] = val
  if (elem) {
    ret.elem = elem
  }
  return ret
}

const buffs = {
//1星

  初学者: {},

//3星

  冒险家: {
    2: attr('hpPlus', 1000, '', '点'),
    4: {
      title: '开启各类宝箱后,恢复[_restore]生命值',
      data: {
        _restore: ({ attr }) => ( attr.hp.base + attr.hp.plus + attr.hp.pct * attr.hp.base ) * 30 / 100
      }
    }
  },

  幸运儿: {
    2: attr('defPlus', 100, '', '点'),
    4: {
      title: '拾取摩拉时,恢复[_restore]生命值',
      data: {
        _restore: 300
      }
    }
  },

  游医: {
    2: {
      title: '角色受到的治疗效果提高[healInc]%',
      data: {
        healInc: 20
      }
    },
    4: {
      check: ({ params }) => params.BurstProgress === true,
      title: '施放元素爆发时,恢复[_restore]生命值',
      data: {
        _restore: ({ attr }) => ( attr.hp.base + attr.hp.plus + attr.hp.pct * attr.hp.base ) * 20 / 100
      }
    }
  },

//4星

  勇士之心: {
    2: attr('atkPct', 18),
    4: {
      title: '攻击生命值为[buffCount]%的敌人，造成的伤害增加[dmg]%',
      data: {
        buffCount: ({ params , weapon }) => ( weapon.name === '狼的末路' ? ( params.TargetHp || 25 ) : ( params.TargetHp || 100 ) ) ,
        dmg: ({ params , weapon }) => ( ( params.TargetHp || 100 ) >= 50 ? 1 : 0 ) * ( weapon.name === '狼的末路' ? ( ( params.TargetHp || 25 ) >= 50 ? 1 : 0 ) : 0 ) * 30
      }
    }
  },

  奇迹: {
    2: {
      title: '所有元素抗性提高[_res]%',
      data: {
  	    _res: 20
      }
    },
    4: {
      title: '受到某个元素类型的伤害后,相应的抗性提升[_res]%',
      data: {
  	    _res: 30
      }
    }
  },

  学士: {
    2: attr('recharge', 20),
    4: {
      check: ({ weaponTypeName }) => ['弓', '法器'].includes(weaponTypeName),
      title: '获得元素微粒或元素晶球时,队伍中所有弓箭和法器角色额外恢复[_energyevery]点元素能量',
      data: {
        _energyevery: 3
      }
    }
  },

  守护之心: {
    2: attr('defPct', 30),
    4: {
      title: '队伍中不同一种元素类型的自己的角色,至多提升[_res]%相应的元素抗性',
      data: {
            buffCount: ({ params }) => ( params.ElementDifferent || 3 ) ,
  	    _res:  ({ params }) => ( params.ElementDifferent || 3 ) * 30
      }
    }
  },

  战狂: {
    2: attr('cpct', 12),
    4: {
      title: '生命值为[buffCount]%，暴击率提升[cpct]%',
      data: {
        buffCount: ({ params , weapon }) => ( weapon.name === '黎明神剑' ? ( params.OwnHp || 100 ) : ( params.OwnHp || 25 ) ) ,
        cpct: ({ params , weapon }) => ( ( params.OwnHp || 25 ) < 70 ? 1 : 0 ) * ( weapon.name === '黎明神剑' ? ( ( params.OwnHp || 100 ) < 70 ? 1 : 0 ) : 0 ) * 24
      }
    }
  },

  教官: {
    2: attr('mastery', 80),
    4: {
      check: ({ params }) => params.ReactionTime !== false && ( params.ReactionTime || 1 ) <=  8 ,
      title: '触发元素反应后，队伍中所有角色的元素精通提高[mastery]点',
      data: {
        mastery:  ({ params }) => ( ( params.ReactionTime || 1 ) <=  8 ? 120 : 0 ) ,
        masteryInc: ({ params }) =>  ( ( params.ReactionTime || 1 ) <=  8 ? 120 : 0 ) 
      }
    }
  },

  武人: {
    2: {
      title: '普攻与重击造成的伤害提高[aDmg]%',
      data: {
        aDmg: 15 ,
        a2Dmg: 15
      }
    },
    4: {
      check: ({ params }) => ( params.SkillsUse || 1 ) > 0 ,
      title: '施放元素战技后,普通攻击和重击造成的伤害提升[aDmg]%',
      data: {
        aDmg: ({ params }) => ( ( params.SkillsUse || 1 ) > 0 ? 25 : 0 ) ,
        a2Dmg: ({ params }) => ( ( params.SkillsUse || 1 ) > 0 ? 25 : 0 ) 
      }
    }
  },

  流放者: {
    2: attr('recharge', 20)
  },

  行者之心: {
    2: attr('atkPct', 18),
    4: {
      title: '重击的暴击率提高[a2Cpct]%',
      data: {
        a2Cpct: 30
      }
    }
  },

  赌徒: {
    2: {
      title: '元素战技造成的伤害提升[eDmg]%',
      data: {
        eDmg: 20
      }
    },
    4: {
      check: ({ params }) => ( params.Arbitrarilykill || 1 ) > 0 || ( params.Normalkill || 1 ) > 0 || ( params.ChargedKill || 1 ) > 0 || ( params.Plungingkill || 1 ) > 0 || ( params.Skillskill || 1 ) > 0 || ( params.BurstKill || 1 ) > 0  ,
      title: '击败敌人时,有100%概率清除元素战技的冷却时间',
      data: {
        _eCd: 100
      }
    }
  },

//5星

  冰之川与雪之砂 : {
    2: attr('dmg', 15, '冰'),
    4: {
      title: '超导反应造成的伤害提升[overloaded]%，融化反应的加成系数提高[vaporize]%,施放元素爆发后，获得[dmg]%元素伤害加成',
      data: {
        superConduct: 50 ,
        melt: 15,
        dmg: ({ element }) => element === '冰' ? 25 : 0
      }
    }
  },

  如雷的盛怒: {
    2: attr('dmg', 15, '雷'),
    4: {
      title: '超载、感电、超导反应造成的伤害提升[overloaded]%，超激化反应带来的伤害提升提高[aggravate]%,触发上述元素反应或原激化反应时,元素战技冷却时间减少[_ecdPlus]秒',
      data: {
        overloaded: 40 ,
        electroCharged: 40 ,
        superConduct: 40 ,
        hyperBloom: 40 ,
        aggravate: 20 ,
        _ecdPlus: 1
      }
    }
  },

  平息鸣雷的尊者: {
    2: {
      title: '雷元素抗性提高[_electroRes]%',
      data: {
  	    _electroRes: 40
      }
    },
    4: {
      check: ({ params }) => params.FireAttachment !== 1 && params.IceAttachment !== 1 && params.WindAttachment !== 1 && params.WaterAttachment !== 1,
      title: '对处于雷元素影响下的敌人造成的伤害提升[dmg]%',
      data: {
        dmg: 35
      }
    }
  },

  悠古的磐岩: {
    2: attr('dmg', 15, '岩'),
    4: {
      check: ({ element }) => element !== '岩' && element !== '风' && element !== '草' && ( params.CrystallizeNumber || 1 ) >= 1 ,
      title: '获得结晶反应形成的晶片时，队伍中所有角色获得[dmg]%对应元素伤害加成',
      data: {
        dmg: 35
      }
    }
  },

  昔日宗室之仪: {
    2: {
      title: '元素爆发造成的伤害提升[qDmg]%',
      data: {
        qDmg: 20
      }
    },
    4: {
      check: ({ params }) => params.BurstProgress !== false,
      title: '施放元素爆发后，队伍中所有角色攻击力提升[atkPct]%',
      data: {
        atkPct: 20
      }
    }
  },

  染血的骑士道: {
    2: attr('phy', 25),
    4: {
      check: ({ params }) => ( params.Arbitrarilykill || 1 ) > 0 || ( params.Normalkill || 1 ) > 0 || ( params.ChargedKill || 1 ) > 0 || ( params.Plungingkill || 1 ) > 0 || ( params.Skillskill || 1 ) > 0 || ( params.BurstKill || 1 ) > 0  ,
      title: '击败敌人后，重击不消耗体力且造成的伤害提升[a2Dmg]%',
      data: {
        a2Dmg: 50 ,
        _a2Stamina: 100
      }
    }
  },

  流浪大地的乐团: {
    2: attr('mastery', 80),
    4: {
      check: ({ weaponTypeName }) => ['法器', '弓'].includes(weaponTypeName),
      title: '角色重击造成的伤害提高[a2Dmg]%',
      data: {
        a2Dmg: 35
      }
    }
  },

  渡过烈火的贤人: {
    2: {
      title: '火元素抗性提高[_pyroRes]%',
      data: {
  	    _pyroRes: 40
      }
    },
    4: {
      check: ({ params }) => params.IceAttachment !== 1 && params.WaterAttachment !== 1 && params.MineAttachment !== 1 && params.WindAttachment !== 1 && params.GrassAttachment !== 1,
      title: '对处于火元素影响下的敌人造成的伤害提升[dmg]%' ,
      data: {
        dmg: 35
      }
    }
  },

  炽烈的炎之魔女: {
    2: attr('dmg', 15, '火'),
    4: {
      title: '超载、燃烧、烈绽放反应造成的伤害提升[overloaded]%，蒸发、融化反应的加成系数提高[vaporize]%，释放元素战技[buffCount]次提高[dmg]%元素伤害加成，',
      data: {
        vaporize: 15,
        melt: 15,
        overloaded: 40,
        burning: 40,
        burgeon: 40,
        dmg: ({ params , element }) => Math.min( element === '火' ? ( params.SkillsUse || 1 ) * 7.5 : 0 , 22.5 ) ,
        buffCount: ({ params }) => params.SkillsUse || 1
      }
    }
  },

  翠绿之影: {
    2: attr('dmg', 15, '风'),
    4: {
      title: '扩散反应造成的伤害提升[swirl]%，根据扩散的元素类型，降低受到影响的敌人[fykx]%的对应元素抗性',
      data: {
        swirl: 60 ,
        fykx: 40
      }
    }
  },

  被怜爱的少女: {
    2: attr('heal', 15),
    4: {
      check: ({ params }) => ( params.BurstUse || 1 ) >= 1 || ( params.BurstUse || 1 ) >= 1 ,
      title: '施放元素战技或元素爆发后，队伍中所有角色受治疗效果加成提高[healInc]%',
      data: {
        healInc: 20
      }
    }
  },

  角斗士的终幕礼: {
    2: attr('atkPct', 18),
    4: {
      check: ({ weaponTypeName }) => ['单手剑', '双手剑', '长柄武器'].includes(weaponTypeName),
      title: '角色普通攻击造成的伤害提高[aDmg]%',
      data: {
        aDmg: 35
      }
    }
  },

  逆飞的流星: {
    2: attr('shield', 35),
    4: {
      title: '处于护盾庇护下时，额外获得[aDmg]%普通攻击和重击伤害加成',
      data: {
        aDmg: 40 ,
        a2Dmg: 40
      }
    }
  },

  冰风迷途的勇士: {
    2: attr('dmg', 15, '冰'),
    4: {
      title: '攻击处于冰元素影响下的敌人时，暴击率提高，若敌人处于冻结状态下，则暴击率额外提高，合计提高[cpct]%暴击率',
      data: {
        cpct: ({ params }) => ( params.IceAttachment || 1 ) * 20 * ( ( params.FreezeDetermine || 0 ) + 1 )
      }
    }
  },

  沉沦之心: {
    2: attr('dmg', 15, '水'),
    4: {
      title: '施放元素战技后，普通攻击与重击造成的伤害提高[aDmg]%',
      data: {
        aDmg: 30 ,
        a2Dmg: 30
      }
    }
  },

  千岩牢固: {
    2: attr('hpPct', 20),
    4: {
      title: '元素战技命中敌人后，使队伍中附近的所有角色攻击力提升[atkPct]%，护盾强效提升[shield]%',
      data: {
        atkPct: 20 ,
        shield: 30
      }
    }
  },

  苍白之火: {
    2: attr('phy', 25),
    4: {
      title: '元素战技命中敌人[buffCount]次后,攻击力提升[atkPct]%,造成的物理伤害提高[phy]%',
      data: {
        buffCount: ({ params }) => params.SkillsHit || 1 ,
        atkPct: ({ params }) => Math.min( ( params.SkillsHit || 1 ) * 9 , 18 ),
        phy: ({ params }) => Math.min( Math.max( 0 , ( params.SkillsHit || 0 ) - 1 ) * 25 , 25 )
      }
    }
  },

  绝缘之旗印: {
    2: attr('recharge', 20),
    4: {
      title: '提高元素爆发造成的伤害[qDmg]%',
      sort: 4,
      data: {
        qDmg: ({ attr }) => Math.min( 75, ( attr.recharge.base + attr.recharge.plus ) * 0.25 )
      }
    }
  },

  追忆之注连: {
    2: attr('atkPct', 18),
    4: {
      title: '角色拥有[buffCount]点元素能量,施放元素战技后,则会恢复[_energyevery]点元素能量,使接下来的普通攻击、重击、下落攻击造成的伤害提高[aDmg]%',
      data: {
        buffCount: ({ params }) => params.EnergyDetermine || 100 ,
        _energyevery: ({ params }) => ( params.EnergyDetermine || 100 ) >= 15 ?  -15 : 0 ,
        aDmg: ({ params }) => ( params.EnergyDetermine || 100 ) >= 15 ?  50 : 0 ,
        a2Dmg: ({ params }) => ( params.EnergyDetermine || 100 ) >= 15 ?  50 : 0 ,
        a3Dmg: ({ params }) => ( params.EnergyDetermine || 100 ) >= 15 ?  50 : 0 
      }
    }
  },

  华馆梦醒形骸记: {
    2: attr('defPct', 30),
    4: {
      title: '[buffCount]层问答,提供[defPct]%防御与[dmg]%元素伤害加成',
      data: {
        buffCount: ({ params }) =>Math.min( 4 , ( ( params.TruceTime || 0 ) / 3 + ( params.RockDmg || 0 ) ) ) ,
        defPct: ({ params }) => Math.min( 4 , ( ( params.TruceTime || 0 ) / 3 + ( params.RockDmg || 0 ) ) ) * 6 ,
        dmg: ({ params , element }) =>  element === '岩' ? ( Math.min( 4 , ( ( params.TruceTime || 0 ) / 3 + ( params.RockDmg || 0 ) ) ) * 6 ) : 0
      }
    }
  },

  海染砗磲: {
    2: attr('heal', 15)
  },

  来歆余响: {
    2: attr('atkPct', 18),
    4: {
      title: '普通攻击命中敌人时,普通攻击造成的伤害提高[_aPlus]，当前效果触发概率[buffCount]%',
      sort: 9,
      data: {
        buffCount: ({ params }) => ( params.EchoesProbability || 1 ) * 100,
        _aPlus: ({ attr }) => attr.atk * 0.7,
        aPlus: ({ params , attr }) => attr.atk * 0.7 * ( params.EchoesProbability || 1 )
      }
    }
  },

  辰砂往生录: {
    2: attr('atkPct', 18),
    4: {
      title: '施放元素爆发后攻击力提升,并在角色的生命值降低时,攻击力进一步提升.通过[buffCount]层「潜光」提升合计[atkPct]%攻击力',
      data: {
        buffCount: ({ params }) => params.ChangeHp || 0 ,
        atkPct: ({ params }) => Math.min( 4 , ( params.ChangeHp || 0 ) ) * 10 + 8
      }
    }
  },

  深林的记忆: {
    2: attr('dmg', 15, '草'),
    4: {
      title: '元素战技或元素爆发命中敌人后，使命中目标的草元素抗性降低[kx]%',
      check: ({ element }) => element === '草',
      data: {
        kx: 30
      }
    }
  },

  饰金之梦: {
    2: attr('mastery', 80),
    4: {
      title: '触发元素反应后，队伍存在不同元素类型角色[buffCount]个，元素精通提升[mastery]点，攻击力提升[atkPct]%',
      data: {
        buffCount: ({ params }) => ( params.ElementDifferent || 3 ) ,
        mastery: ({ params }) => ( params.ElementDifferent || 3  ) * 50 ,
        atkPct: ({ params }) => ( 3 - ( params.ElementDifferent || 3 ) ) * 14
      }
    }
  },

  乐园遗落之花: {
    2: attr('mastery', 80),
    4: {
      title: '装备者触发绽放、超绽放、烈绽放[buffCount]次，使上述反应伤害提高[bloom]%',
      data: {
        buffCount: ({ params }) => params.ReactionDmg || 4 ,
        bloom: ({ params }) => 40 + ( params.ReactionDmg || 4 ) * 40 * 0.25 ,
        burgeon: ({ params }) => 40 + ( params.ReactionDmg || 4 ) * 40 * 0.25 ,
        hyperBloom: ({ params }) => 40 + ( params.ReactionDmg || 4 ) * 40 * 0.25
      }
    }
  },

  沙上楼阁史话: {
    2: attr('dmg', 15, '风'),
    4: {
      title: '重击命中敌人后，普通攻击速度提升[_aSpeed]%，普通攻击、重击与下落攻击造成的伤害提升[aDmg]%',
      data: {
        _aSpeed: 10 ,
        aDmg: 40 ,
        a2Dmg: 40 ,
        a3Dmg: 40
      }
    }
  },

  水仙之梦: {
    2: attr('dmg', 15, '水'),
    4: {
      title: '拥有[atkPct]层镜中水仙,攻击力提高[atkPct]%,元素伤害加成提升[dmg]%',
      data: {
        buffCount: ({ params }) =>  Math.min( 3 , Math.min( 1 , params.BurstHit || 0 ) + Math.min( 1 , params.SkillsHit || 0 ) + Math.min( 1 , params.ChargedHit || 0 ) + Math.min( 1 , params.NormalHit || 0 ) ) ,
        atkPct: ({ params }) =>  ( 0 - 1 / 3 ) * Math.pow( Math.min( 3 , Math.min( 1 , params.BurstHit || 0 ) + Math.min( 1 , params.SkillsHit || 0 ) + Math.min( 1 , params.ChargedHit || 0 ) + Math.min( 1 , params.NormalHit || 0 ) ) , 3 ) + 2 * Math.pow( Math.min( 3 , Math.min( 1 , params.BurstHit || 0 ) + Math.min( 1 , params.SkillsHit || 0 ) + Math.min( 1 , params.ChargedHit || 0 ) + Math.min( 1 , params.NormalHit || 0 ) ) , 2 ) + ( 16 / 3 ) * Math.min( 3 , Math.min( 1 , params.BurstHit || 0 ) + Math.min( 1 , params.SkillsHit || 0 ) + Math.min( 1 , params.ChargedHit || 0 ) + Math.min( 1 , params.NormalHit || 0 ) ) ,
        dmg:({ params , element }) =>  element === '水' ? ( ( 1 / 2 ) * Math.pow( Math.min( 3 , Math.min( 1 , params.BurstHit || 0 ) + Math.min( 1 , params.SkillsHit || 0 ) + Math.min( 1 , params.ChargedHit || 0 ) + Math.min( 1 , params.NormalHit || 0 ) ) , 2 )+ ( 7 / 2 ) * Math.min( 3 , Math.min( 1 , params.BurstHit || 0 ) + Math.min( 1 , params.SkillsHit || 0 ) + Math.min( 1 , params.ChargedHit || 0 ) + Math.min( 1 , params.NormalHit || 0 ) ) ) : 0
      }
    }
  },

  花海甘露之光: {
    2: attr('hpPct', 20),
    4: {
      title: '装备者受到伤害[buffCount]次伤害后,元素战技与元素爆发造成的伤害提升[eDmg]%',
      data: {
        buffCount: ({ params }) => ( params.BurstHit || 0 ) ,
        eDmg: ({ params }) =>  10 + 10 * 0.8 * Math.min( 5 , ( params.BurstHit || 0 ) ) ,
        qDmg: ({ params }) =>  10 + 10 * 0.8 * Math.min( 5 , ( params.BurstHit || 0 ) )
      }
    }
  },

  逐影猎人: {
    2: {
      title: '普通攻击与重击造成的伤害提高[aDmg]%',
      data: {
        aDmg: 15 ,
        a2Dmg: 15
      }
    },
    4: {
      title: '当前生命值提升或降低[buffCount]次，暴击率提升[cpct]%',
      data: {
        buffCount: ({ params }) => ( params.ChangeHp || 5 ) ,
        cpct: ({ params }) => 12 * Math.min( 3 , ( params.ChangeHp || 5 ) )
      }
    }
  },

  黄金剧团: {
    2: {
      title: '元素战技造成的伤害提升[eDmg]%',
      data: {
        eDmg: 20
      }
    },
    4: {
      title: '元素战技造成的伤害提升，处于队伍后台时还将进一步提升，合计提升[eDmg]%',
      data: {
        eDmg: ({ params }) => ( params.gotr || 1 ) * 25
      }
    }
  },

  昔时之歌: {
    2: attr('heal', 15),
    4: {
      title: '装备者对队伍中的角色进行治疗时，记录治疗的生命值回复量，使队伍中自己的当前场上角色的普通攻击、重击、下落攻击、元素战技与元素爆发命中敌人时造成的伤害提高[aPlus]',
      sort: 9,
      data: {
        aPlus: ({ params }) => ( params.soda || 0 ) * 1200 ,
        a2Plus: ({ params }) => ( params.soda || 0 ) * 1200 ,
        a3Plus: ({ params }) => ( params.soda || 0 ) * 1200 ,
        ePlus: ({ params }) => ( params.soda || 0 ) * 1200 ,
        qPlus: ({ params }) => ( params.soda || 0 ) * 1200
      }
    }
  },

  回声之林夜话: {
    2: attr('atkPct', 18 ),
    4: {
      check: ({ element }) => element === '岩',
      title: '施放元素战技后，岩元素伤害加成提升；若处于结晶反应产生的护盾庇护下将进一步提高。合计提高[dmg]%',
      data: {
        dmg: 50
      }
    }
  },

  谐律异想断章: {
    2: attr('atkPct', 18 ),
    4: {
      title: '生命之契的数值提升或降低时，角色造成的伤害提升[dmg]%',
      data: {
        dmg: 18 * 3
      }
    }
  },

  未竟的遐思: {
    2: attr('atkPct', 18 ),
    4: {
      title: '存在处于燃烧状态下的敌人时，伤害提升[dmg]%',
      data: {
        dmg: 10 * 5
      }
    }
  }
}

export default buffs