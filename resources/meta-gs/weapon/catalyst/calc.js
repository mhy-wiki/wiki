export default function (step, staticStep) {
  return {
    翡玉法球: {
      check: ({ element , params }) => element !== '岩' && params.ReactionTime !== false ,
      title: '触发蒸发、感电、冰冻、绽放或水元素扩散反应后，攻击力提高[atkPct]%',
      refine: {
        atkPct: step(20)
      }
    },

    魔导绪论: {
      check: ({ params }) => params.FireAttachment !== 1&& params.IceAttachment !== 1 && params.WindAttachment !== 1,
      title: '对处于水元素或雷元素影响下的敌人，造成的伤害提高[dmg]%',
      refine: {
        dmg: step(12)
      }
    },

    甲级宝珏: {
      title: '击败敌人后,攻击力提升[atkPct]%移动速度提升[_jSpeed]%',
      refine: {
        atkPct: step(12, 2),
        _jSpeed: step(12, 2)
      }
    },

    黑岩绯玉: {
      title: '击败[buffCount]个敌人，攻击力提升[atkPct]%',
      data: {
        buffCount: ({ params }) => Math.max( ( params.ArbitrarilyKill || 5 ) , ( params.BurstKill || 1 ) + ( params.SkillsKill || 1 ) + ( params.PlungingKill || 1 ) + ( params.ChargedKill || 1 ) + ( params.NormalKill || 1 ) ),
        atkPct: ({ params , refine }) => step(12)[refine] * Math.min( 3 , Math.max( ( params.ArbitrarilyKill || 5 ) , ( params.BurstKill || 1 ) + ( params.SkillsKill || 1 ) + ( params.PlungingKill || 1 ) + ( params.ChargedKill || 1 ) + ( params.NormalKill || 1 ) ) )
      }
    },

    万国诸海图谱: {
      check: ({ params }) => params.ReactionTime !== false ,
      title: '触发元素反应[buffCount]次后，满层提高[dmg]%的元素伤害',
      data: {
        buffCount: ( params.ReactionDmg || 4 ) ,
        dmg:  ({ params , refine }) => Math.min( 2 , ( params.ReactionDmg || 4 ) ) * step(8)[refine]
      }
    },

    宗室秘法录: {
      title: '攻击造成[buffCount]次伤害,暴击率提升[cpct]%',
      data: {
         buffCount: ({ params }) => Math.max( ( params.ArbitrarilyDmg || 0 ) , ( params.BurstDmg || 0 ) + ( params.SkillsDmg || 1 ) + ( params.PlungingDmg || 0 ) + ( params.ChargedDmg || 0 ) + ( params.NormalDmg || 1 ) ),
        cpct:  ({ params , refine }) => step(8)[refine] * Math.min( 5 , Math.max( params.ArbitrarilyDmg || 0 , ( ( params.BurstDmg || 0 ) + ( params.SkillsDmg || 1 ) + ( params.PlungingDmg || 0 ) + ( params.ChargedDmg || 0 ) + ( params.NormalDmg || 1 ) ) ) )
      }
    },

    匣里日月: {
      title: '普通攻击命中[buff]次，元素战技命中[buffCount]次 ，元素战技与爆发伤害提高[eDmg]%，普通攻击伤害提高[aDmg]%',
      data: {
         buff: ({ params }) => ( params.NormalDmg || 1 ) ,
         buffCount: ({ params }) => ( params.SkillsDmg || 1 ) ,
        aDmg: ({ params , refine }) => ( params.SkillsDmg || 1 ) > 0 ? step(20)[refine] : 0 ,
        eDmg: ({ params , refine }) => ( params.NormalDmg || 1 ) > 0 ? step(20)[refine] : 0 ,
        qDmg: ({ params , refine }) => ( params.NormalDmg || 1 ) > 0 ?  step(20)[refine] : 0
      }
    },

    流浪乐章: {
      check: ({ params }) => ( params.FightTime || 8  ) <= 10 ,
      title: '角色登场后触发咏叹调，全元素伤害提升[dmg]%',
      refine: {
        dmg: step(48, 12)
      }
    },

    暗巷的酒与诗:  [{
      check: ({ params }) => ( params.NormalHit || 1 ) > 0 ,
      title: '普通攻击命中敌人后，冲刺或替代冲刺消耗的体力降低[_sInterruption]%',
      refine: {
          _sInterruption: step(14)
      }
    },{
      title: '使用冲刺或替代冲刺后，攻击力提升[atkPct]%',
      refine: {
        atkPct: step(20)
      }
    }],

    嘟嘟可故事集: {
      title: '普通攻击命中[buff]次，重击命中[buffCount]次 ，重击造成的伤害提升[a2Dmg]%，攻击力提升[atkPct]%',
      dmg: {
         buff: ({ params }) => ( params.NormalDmg || 1 ) ,
         buffCount: ({ params }) => ( params.ChargedHit || 0 ) ,
        a2Dmg: ({ params , refine }) => ( params.NormalDmg || 1 ) > 0 ? step(16)[refine] : 0,
        atkPct: ({ params , refine }) => ( params.NormalDmg || 1 ) > 0 ? step(8)[refine] : 0
      }
    },

    白辰之环: {
      check: ({ params }) => params.ReactionTime !== false ,
      title: '触发雷元素反应后，获得与该元素反应相关的元素伤害加成[dmg]%',
      refine: {
        dmg: step(10, 2.5)
      }
    },

    证誓之明瞳: {
      check: ({ params }) => ( params.SkillsUse || 1 ) > 0 ,
      title: '施放元素战技后，元素充能效率提升[recharge]%',
      refine: {
        recharge: step(24)
      }
    },

    四风原典: [{
      title: '移动速度提高[_jSpeed]%',
      dmg: {
        _jSpeed:10
      }
    },{
      check: ({ params }) =>( params.TruceTime || 0 ) < 1,
      title: '在场上[buffCount]秒获得[dmg]%元素伤害加成',
      dmg: {
         buffCount: ({ params }) => ( params.FightTime || 8 ) ,
        dmg: ({ params , refine }) => Math.min( 4 , Math.floor( ( ( params.FightTime || 8 ) / 4 ) ) ) * step(8)[refine]
      }
    }],

    天空之卷: [{
      title: '元素伤害加成提升[dmg]%',
      refine: {
        dmg: step(12)
      }
    },{
      check: ({ params }) => ( params.NormalHit || 1 ) > 0 ,
      title: '普通攻击命中时，主动攻击附近的敌人，造成伤害。',
    }],

    尘世之锁: [staticStep('shield', 20), {
      title: '护盾强效提升[_shield]%',
      refine: {
        _shield: step(20)
      }
    }, {
      title: '处于护盾下[buff]秒，进行[buffCount]次攻击，攻击力提升[atkPct]%',
      data: {      
        buff: ({ params }) => ( params.ShieldTime || 12 ) ,
        buffCount: ({ params }) => Math.max( ( params.ArbitrarilyDmg || 0 ) , ( params.BurstDmg || 0 ) + ( params.SkillsDmg || 1 ) + ( params.PlungingDmg || 0 ) + ( params.ChargedDmg || 0 ) + ( params.NormalDmg || 1 ) ) ,
        atkPct: ({ params , refine }) => Math.max( 5 , Math.max( ( params.ArbitrarilyDmg || 0 ) , ( params.BurstDmg || 0 ) + ( params.SkillsDmg || 1 ) + ( params.PlungingDmg || 0 ) + ( params.ChargedDmg || 0 ) + ( params.NormalDmg || 1 ) ) ) * ( ( params.ShieldTime || 12 ) > 0 ? 2 : 1 ) * step(4)[refine]
      }
    }],

    不灭月华: [staticStep('heal', 10, 2.5), {
      title: '治疗加成提升[_heal]%',
      refine: {
        _heal: step(10, 2.5)
      }
    }, {
      check: ({ params }) => ( params.BurstUse || 0 ) > 0 ,
      title: '释放元素爆发后, 普通攻击造成的伤害增加[aPlus]，命中时恢复[aPlus]点元素能量',
      sort: 9,
      data: {
        aPlus: ({ attr, calc, refine }) => calc(attr.hp) * step(1, 0.5)[refine] / 100 ,
       _energyevery: 0.6
      }
    }],

    神乐之真意: {
      title: '释放[buffCount]次元素战技，元素战技造成的伤害提高[eDmg]%，获得[dmg]%所有元素伤害加成',
      data: {     
        buffCount: ({ params }) => ( params.SkillsUse || 1 ) ,
        eDmg: ({ params , refine }) => Math.min( 3 , ( params.SkillsUse || 1 ) ) * step(12)[refine] ,
        dmg: ({ params , refine }) => ( params.SkillsUse || 1 ) > 3 ? step(12)[refine] : 0
      }
    },

    盈满之实: {
      check: ({ params }) => params.ReactionTime !== false ,
      title: '触发[buffCount]次元素反应，元素精通提升[mastery]，攻击力提升[atkPct]%',
      data: {
        buffCount: ({ params }) => ( params.ReactionDmg || 4 ) ,
        mastery: ({ params , refine }) => Math.min( 5 , ( params.ReactionDmg || 4 ) )  * step(24, 3) ,
        atkPct: ({ params }) => Math.min( 5 , ( params.ReactionDmg || 4 ) ) * -5
      }
    },

    流浪的晚星: {
      title: '提升角色攻击力[atkPlus]，为队伍中附近的其他角色提升攻击力[_atkPlus]',
      sort: 6,
      data: {
        atkPlus: ({ attr, calc, refine }) => step(24)[refine] * calc(attr.mastery) / 100 ,
        _atkPlus: ({ attr, calc, refine }) => step(24)[refine] * calc(attr.mastery) / 100 * 0.3
      }
    },

    图莱杜拉的回忆: [{
      title: '普通攻击速度提升[_aSpeed]%',
      refine: {
        _aSpeed: step(10,2.5)
      }
    },{
      check: ({ params }) => ( params.SkillsUse || 1 ) > 0 && ( params.SkillsAfter || 2 ) <= 14 ,
      title: '释放元素战技后[buff]秒,普通攻击命中敌人[buffCount]次，普通攻击造成的伤害提升[aDmg]%',
      data: {
        buff:  ({ params }) => ( params.SkillsAfter || 2 ) ,
        buffCount: ({ params }) => ( params.NormalHit || 1 ) ,
        aDmg: ({ params , refine }) = Math.min( step(48)[refine] , ( ( params.SkillsAfter || 2 ) *  step(4.8,1.2)[refine] + ( params.NormalHit || 1 ) * step(9.6,2.4)[refine] ) )
      }
    }],

    千夜浮梦: {
      title: '队伍中存在[buff]位与装备者元素类型相同的角色, [buffCount]位与装备者元素类型不同的角色，元素精通提升[mastery]，元素伤害提高[dmg]%，队伍中附近的角色元素精通提升[_mastery]点',
      data: {
        buff:  ({ params }) => ( params.ElementSame || 2 ) ,
        buffCount:  ({ params }) => ( params.ElementDifferent || 1 ) ,
        mastery: ({ params , refine }) => step(32)[refine] * Math.min( 3 , ( ( params.ElementSame || 2 ) ) ) ,
        dmg: ({ params , refine }) => step(10, 4)[refine] * Math.min( 3 , ( params.ElementDifferent || 1 ) ) ,
        mastery: ({ refine }) => step(40,2)[refine] 
      }
    },

    碧落之珑: {
      check: ({ params }) => ( ( params.BurstUse || 0 ) > 0 && ( params.BurstAfter || 0 ) <= 3 ) || ( params.ShieldDetermine === true ),
      title: '释放元素爆发或创造护盾后，恢复[buffCount]点元素能量，使对应元素伤害加成提高[dmg]%',
      sort: 9,
      data: {
        buffCount:  ({ refine }) => step(4.5, 0.5)[refine] ,
        dmg: ({ attr, calc, refine }) => Math.min(Math.floor(calc(attr.hp) / 1000) * step(0.3, 0.2)[refine], step(12, 8)[refine])
      }
    },

    纯水流华: [{
      check: ({ params }) => ( params.SkillsUse || 1 ) > 0 ,
      title: '释放元素战技时，所有元素伤害加成提升[dmg]%',
      refine: {
        dmg: step(8)
      }
    },{
      check: ({ params }) => ( params.SkillsUse || 1 ) > 0 ,
      title: '赋予[buffCount]点生命之契，清除时提供[dmg]%所有元素伤害加成',
      sort: 9,
      data: {
        buffCount:  ({ attr }) => ( attr.hp.base + attr.hp.plus + attr.hp.pct * attr.hp.base ) * 24 / 100 ,
        dmg: ({ attr, calc, refine }) => Math.min(Math.floor(calc(attr.hp) / 1000) * 2 * step(0.24)[refine], step(12)[refine])
      }
    }],

    金流监督: [staticStep('atkPct', 16), {
      title: '攻击力提升[_atkPct]%',
      refine: {
        _atkPct: step(16)
      }
    }, {
      title: '当前生命值提升或降低[buffCount]次，普通攻击造成的伤害提升[aDmg]%，重击造成的伤害提升[a2Dmg]%, 攻击速度提升[_aSpeed]%',
      refine: {
        buffCount: ({ params }) => ( ChangeHp || 5 ) ,
        aDmg:   ({ params , refine }) => Math.min( 3 , ( ChangeHp || 5 ) ) * step(16)[refine] ,
        a2Dmg:  ({ params , refine }) => Math.min( 3 , ( ChangeHp || 5 ) ) * step(14 , 3.5)[refine] ,
       _aSpeed:  ({ params , refine }) => ( ChangeHp || 5 ) >= 3 ? step(8)[refine] : 0
      }
    }],

    遗祀玉珑: [{
      check: ({ params }) => ( params.FightTime || 8  ) <= 10 ,
      title: '生命值上限提升[hpPct]%，元素精通提升[mastery]点',
      refine: {
        hpPct: step(32),
        mastery: step(40)
      }
    }],

    万世流涌大典: [staticStep('hpPct', 16), {
      title: '生命值提升[_hpPct]%',
      refine: {
        _hpPct: step(16)
      }
    }, {
      title: '当前生命值提升或降低[buffCount]次，重击造成的伤害提升[a2Dmg]%, 恢复[_energyevery]点元素能量',
      data: {
        buffCount: ({ params }) => ( ChangeHp || 5 ) ,
        a2Dmg: ({ params , refine }) => Math.min( 3 , ( ChangeHp || 5 ) ) * step(14 , 4)[refine] ,
       _energyevery:  ({ params , refine }) => ( ChangeHp || 5 ) >= 3 ? step(8 , 1)[refine] : 0
      }
    }],

    无垠蔚蓝之歌: [{
      title: '普通攻击与重击命中[buffCount]次，普通攻击造成的伤害提升[aDmg]%，重击造成的伤害提升[a2Dmg]%',
      data: {
        buffCount: ({ params }) => ( params.ChargedDmg || 0 ) + ( params.NormalDmg || 1 ) ,
        aDmg: ({ params , refine }) => Math.min( 3 , ( params.ChargedDmg || 0 ) + ( params.NormalDmg || 1 ) ) * step(8)[refine] ,
        a2Dmg:  ({ params , refine }) => Math.min( 3 , ( params.ChargedDmg || 0 ) + ( params.NormalDmg || 1 ) ) *step(6)[refine]
      }
    }],

    鹤鸣余音: [{
      check: ({ params }) => ( params.PlungingHit || 0 ) > 0 ,
      title: '下落攻击命中敌人后，队伍中附近的所有角色下落攻击造成的伤害提高[a3Dmg]%',
      refine: {
        a3Dmg: step(28)
      }
    }]

  }
}