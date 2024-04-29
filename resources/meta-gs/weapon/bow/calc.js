export default function (step, staticStep) {
  return {
    猎弓: false,

    历练的猎弓: false,

    鸦羽弓: {
      check: ({ params }) => params.MineAttachment !== 1 && params.IceAttachment !== 1 && params.WindAttachment !== 1 ,
      title: '对处于水或火元素影响下的敌人，造成的伤害提高[dmg]%',
      refine: {
        dmg: step(12)
      }
    },

    神射手之誓: {
      check: ({ params }) => params.WeaknessDetermine === true ,
      title: '针对要害造成的伤害提升[a2Dmg]%',
      refine: {
        a2Dmg: step(24)
      }
    },

    反曲弓: false,

    弹弓: {
      title: '普通攻击与重击的箭矢在发射后的[a2Dmg]秒击中敌人，伤害增加[a2Dmg]%',
      data: {
        buffCount: ({ params }) =>  ( params.ChargedAfter || 0.3 ) ,
        aDmg: ({ params , refine }) =>    ( params.ChargedAfter || 0.3 ) > 0.3 ? 0 : step(36, 6)[refine] ,
        a2Dmg: ({ params , refine }) =>    ( params.ChargedAfter || 0.3 ) > 0.3 ? 0 : step(36, 6)[refine]
      }
    },

    信使:{
      title: '重击若命中要害，则额外造成伤害，该伤害必定暴击。'
    },

    黑檀弓: {
      check: ({ params }) => params.RelicInstitution !== false ,
      title: '对遗迹机关类敌人造成的伤害提高[dmg]%',
      refine: {
        dmg: step(40)
      }
    },

    西风猎弓: false,

    绝弦: {
      title: '元素战技与元素爆发的伤害提高[eDmg]%',
      refine: {
        eDmg: step(24),
        qDmg: step(24)
      }
    },

    祭礼弓: false,

    宗室长弓: {
      title: '攻击造成[buffCount]次伤害,暴击率提升[cpct]%',
      data: {
         buffCount: ({ params }) => Math.max( ( params.ArbitrarilyDmg || 0 ) , ( params.BurstDmg || 0 ) + ( params.SkillsDmg || 1 ) + ( params.PlungingDmg || 0 ) + ( params.ChargedDmg || 0 ) + ( params.NormalDmg || 1 ) ),
        cpct:  ({ params , refine }) => step(8)[refine] * Math.min( 5 , Math.max( params.ArbitrarilyDmg || 0 ) , ( params.BurstDmg || 0 ) + ( params.SkillsDmg || 1 ) + ( params.PlungingDmg || 0 ) + ( params.ChargedDmg || 0 ) + ( params.NormalDmg || 1 ) )
      }
    },

    弓藏: {
      title: '普通攻击造成的伤害提升[aDmg]%，重击造成的伤害下降10%',
      refine: {
        aDmg: step(40),
        a2Dmg: -10
      }
    },

    试作澹月: {
      check: ({ params }) => params.WeaknessDetermine !== false ,
      title: '重击若命中要害，则提升10%移动速度与[atkPct]%攻击力',
      refine: {
        atkPct: step(36)
      }
    },

    钢轮弓: {
      title: '普通攻击与重击命中[buffCount]次，提升[atkPct]%攻击力与[_aSpeed]%普通攻击速度。',
      data: {
        buffCount: ({ params }) => ( params.ChargedDmg || 0 ) + ( params.NormalDmg || 1 ) ,
        atkPct: ({ params , refine }) => step(4)[refine] * Math.min( 4 , ( params.ChargedDmg || 0 ) + ( params.NormalDmg || 1 ) ) ,
        _aSpeed: ({ params , refine }) => step(1.2)[refine] * Math.min( 4 , ( params.ChargedDmg || 0 ) + ( params.NormalDmg || 1 ) )
      }
    },

    黑岩战弓: {
      title: '击败[buffCount]个敌人，攻击力提升[atkPct]%',
      data: {
        buffCount: ({ params }) => Math.max( ( params.ArbitrarilyKill || 5 ) , ( params.BurstKill || 1 ) + ( params.SkillsKill || 1 ) + ( params.PlungingKill || 1 ) + ( params.ChargedKill || 1 ) + ( params.NormalKill || 1 ) ),
        atkPct: ({ params , refine }) => step(12)[refine] * Math.min( 3 , Math.max( ( params.ArbitrarilyKill || 5 ) , ( params.BurstKill || 1 ) + ( params.SkillsKill || 1 ) + ( params.PlungingKill || 1 ) + ( params.ChargedKill || 1 ) + ( params.NormalKill || 1 ) ) )
      }
    },

    苍翠猎弓: {
      check: ({ params }) => ( params.NormalHit || 1 ) > 0 || ( params.ChargedHit || 0 ) > 0 ,
      title: '普通攻击与重击命中时，生成一个风之眼持续吸引周围敌人，并对其中的敌人造成伤害。'
    },

    暗巷猎手: {
      title: '角色处于队伍后台[buffCount]秒,角色造成的伤害提升[dmg]%',
      data: {
        buffCount: ({ params }) => ( params.TruceTime || 0 ) ,
        dmg: ({ params , refine }) =>  step(2)[refine] * Math.min( 10 , ( params.TruceTime || 0 ) )
      }
    },

    落霞: {
      title: '处于流霞状态，使造成的伤害提升[dmg]%',
      refine: {
        dmg: step(10, 2.5)
      }
    },

    幽夜华尔兹: {
      title: '普通攻击命中敌人[buff]次,元素战技造成的伤害提升[eDmg]%,元素战技命中敌人[buffCount]次,普通攻击造成的伤害提升[aDmg]%',
      data: {
        buff: ({ params }) => ( params.NormalHit || 1 ) ,
        buffCount: ({ params }) =>( params.SkillsHit || 1 ) ,
        aDmg: ({ params , refine }) => step(20)[refine] * Math.min( 1 , ( params.SkillsHit || 1 ) ) ,
        eDmg: ({ params , refine }) => step(20)[refine] * Math.min( 1 ,  ( params.NormalHit || 1 ) ) 
      }
    },

    风花之颂: {
      check: ({ params }) => params.SkillsProgress !== false ,
      title: '施放元素战技时，攻击力提升[atkPct]%',
      data: {
        atkPct: ({ params , refine }) => step(16)[refine] * Math.min( 1 , ( params.SkillsHit || 1 ) )
      }
    },

    破魔之弓: {
      title: '角色拥有[buffCount]元素能量,普攻伤害提高[aDmg]%，重击伤害提高[a2Dmg]%', 
      data: {
        buffCount: ({ params , artis }) => ( params.EnergyDetermine || 100 ) >= 15 ? ( ( params.EnergyDetermine || 100 ) - ( artis['追忆之注连'] === 4 ? ( ( params.SkillsUse || 1 ) > 0 ? 15 : 0 ) : ( 0 ) ) ) : ( params.EnergyDetermine ) ,
        aDmg: ({ params , artis , refine }) => ( ( ( params.EnergyDetermine || 100 ) >= 15 ? ( ( params.EnergyDetermine || 100 ) - ( artis['追忆之注连'] === 4 ? ( ( params.SkillsUse || 1 ) > 0 ? 15 : 0 ) : ( 0 ) ) ) : ( params.EnergyDetermine ) ) >= 0 ? 2 : 1 ) * step(16)[refine] ,
        a2Dmg: ({ params , artis , refine }) => ( ( ( params.EnergyDetermine || 100 ) >= 15 ? ( ( params.EnergyDetermine || 100 ) - ( artis['追忆之注连'] === 4 ? ( ( params.SkillsUse || 1 ) > 0 ? 15 : 0 ) : ( 0 ) ) ) : ( params.EnergyDetermine ) ) >= 0 ? 2 : 1 ) *  step(12)[refine]
      }
    },

    掠食者: {
      title: '对敌人造成冰元素伤害[buffCount]次后，普通攻击与重击造成的伤害提高[aDmg]%，埃洛伊装备时，攻击力提升[atkPlus]点',
      data: {
        buffCount: ({ params }) => ( params.IcekDmg || 2 ),
        aDmg: ({ params }) => ( params.IcekDmg || 2 ) * 10,
        atkPlus: 66
      }
    },

    曚云之月: {
      title: '队伍中所有角色的元素能量上限的总和[buffCount]点,元素爆发造成的伤害提高[qDmg]%',
      data: {
        buffCount: ({ params }) =>  ( params.EnergyTeammate || 240 ),
        qDmg: ({ params , refine }) => Math.min( ( params.EnergyTeammate || 240 ) * step(0.12)[refine] , step(40)[refine] )
      }
    },

    王下近侍: {
      check: ({ params }) => (  ( params.SkillsUse || 1 ) > 0 ) ||  ( ( params.BurstUse || 0 ) > 0 ) ,
      title: '施放元素战技或元素爆发时，将获得「森林教诲」的效果，元素精通提升[mastery]点。森林教诲的持续时间结束或被移除时，将对附近一名敌人造成伤害。',
      refine: {
        mastery: step(60, 20)
      }
    },

    竭泽: {
      check: ({ params }) => ( params.SkillsUse || 1 ) > 0 ,
      title: '施放元素战技后，将触发「沿洄」效果，在攻击命中敌人时造成范围伤害'
    },

    天空之翼: [staticStep('cdmg', 20), {
      title: '暴击伤害提高[_cdmg]%',
      refine: {
        _cdmg: step(20)
      }
    }, {
      check: ({ params }) => (  ( params.SkillsHit || 1 ) > 0 ) ||  ( ( params.BurstHit || 0 ) > 0 ) || ( ( params.PlungingHit || 0 ) > 0 ) || ( ( params.ChargedHit || 0 ) > 0 ) || ( ( params.NormalHit || 1 ) > 0 ) ,
      title: '攻击命中时造成小范围物理伤害'
    }],
    阿莫斯之弓: [{
      title: '普通攻击与重击造成的伤害提升[a2Dmg]%',
      refine: {
        aDmg: step(12),
        a2Dmg: step(12)
      }
    }, {
      check: ({ params }) => ( params.ChargedAfter || 0.3 ) >= 0.1 ,
      title: '普通攻击与重击的箭矢发射后经过[buffCount]秒，伤害还会提升[a2Dmg]%',
      data: {
        buffCount:  ({ params }) => ( params.ChargedAfter || 0.3 ),
        aDmg: ({ params , refine }) => Math.min( 5 , ( params.ChargedAfter || 0.3 ) * 10 ) * step(8)[refine],
        a2Dmg: ({ params , refine }) => Math.min( 5 , ( params.ChargedAfter || 0.3 ) * 10 ) * step(8)[refine]
      }
    }],

    终末嗟叹之诗: [staticStep('mastery', 60),  {
      title: '元素精通提高[_mastery]%',
      refine: {
        _mastery: step(60)
      }
    }, {
      check: ({ params }) => params.MovementMastery !== false ,
      title: '[buffCount]枚追思之符, 元素精通提高[mastery] { 该效果不可叠加 }',
      sort: 0,
      data: {
        buffCount:  ({ params }) => ( params.BurstHit || 0 ) + ( params.SkillsHit || 1 ) ,
        mastery: ({ params , refine }) => ( ( params.BurstHit || 0 ) + ( params.SkillsHit || 1 ) ) >= 4 ? step(100)[refine] : 0 
      }
    }, {
      check: ({ params }) => params.MovementAtk !== false ,
      title: '[buffCount]枚追思之符, 攻击力提升[atkPct]% { 该效果不可叠加 }',
      sort: 0,
      data: {
        buffCount:  ({ params }) => ( params.BurstHit || 0 ) + ( params.SkillsHit || 1 ) ,
        atkPct: ({ params , refine }) => ( ( params.BurstHit || 0 ) + ( params.SkillsHit || 1 ) ) >= 4 ? step(20)[refine] : 0 
      }
    }],

    冬极白星: [{
      title: '元素战技与元素爆发伤害提高[eDmg]%',
      refine: {
        eDmg: step(12),
        qDmg: step(12)
      }
    }, {
      title: '普通攻击、重击、元素战技或元素爆发命中敌人[buffCount]次，攻击力将提高[atkPct]%',
      data: {
        buffCount: ({ params }) => Math.min( 1 , ( params.BurstDmg || 0 ) ) + Math.min( 1 , ( params.SkillsDmg || 1 ) ) + Math.min( 1 , ( params.ChargedDmg || 0 ) ) + Math.min( 1 , ( params.NormalDmg || 1 ) ),
        atkPct: ({ params , refine }) => ( Math.min( 1 , ( params.BurstDmg || 0 ) ) + Math.min( 1 , ( params.SkillsDmg || 1 ) ) + Math.min( 1 , ( params.ChargedDmg || 0 ) ) + Math.min( 1 , ( params.NormalDmg || 1 ) ) ) >= 4 ? ( step(48, 12)[refine] ) : ( ( step(10, 12)[refine] ) * ( Math.min( 1 , ( params.BurstDmg || 0 ) ) + Math.min( 1 , ( params.SkillsDmg || 1 ) ) + Math.min( 1 , ( params.ChargedDmg || 0 ) ) + Math.min( 1 , ( params.NormalDmg || 1 ) ) ) )
      }
    }],

    飞雷之弦振: [staticStep('atkPct', 20), {
      title: '攻击力提高[_atkPct]%',
      refine: {
        _atkPct: step(20)
      }
    },  {
      title: '[aDmg]层飞雷之巴印，普通攻击造成的伤害提高[aDmg]%',
      data: {
        buffCount: ({ params , artis }) => Math.min( 1 , ( params.NormalDmg || 1 ) ) + Math.min( 1 , ( params.SkillsUse || 1 ) ) + Math.min( 1 , ( params.EnergyDetermine || 0 ) >= 100 ? ( artis['追忆之注连'] === 4 ? 1 : 0 ) : 1 ),
        aDmg: ({ params , artis , refine }) => ( Math.min( 1 , ( params.NormalDmg || 1 ) ) + Math.min( 1 , ( params.SkillsUse || 1 ) ) + Math.min( 1 , ( params.EnergyDetermine || 0 ) >= 100 ? ( artis['追忆之注连'] === 4 ? 1 : 0 ) : 1) ) >= 3 ? step(40)[refine] : (step(12)[refine] * ( Math.min( 1 , ( params.NormalDmg || 1 ) ) + Math.min( 1 , ( params.SkillsUse || 1 ) ) + Math.min( 1 , ( params.EnergyDetermine || 0 ) >= 100 ? ( artis['追忆之注连'] === 4 ? 1 : 0 ) : 1) ) )
      }
    }],

    若水: [staticStep('hpPct', 16), {
      title: '生命值提升[_hpPct]%',
      refine: {
        _hpPct: step(20)
      }
    }, {
      title: '周围存在[buffCount]个敌人，角色造成的伤害都会提升[dmg]%',
      refine: {
        buffCount:  ({ params }) => ( params.EnemiesNumber || 4 )  ,
        dmg:  ({ params , refine }) => ( params.EnemiesNumber || 4 ) > 0 ? step(20)[refine] : 0
      }
    }],

    陨龙之梦: [staticStep('shield', 20), {
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

    猎人之径: {
      title: '元素伤害提高[dmg]%，重击命中敌人后，重击造成的伤害值提高[a2Plus]',
      sort: 9,
      data: {
        dmg: ({ refine }) => step(12)[refine],
        a2Plus: ({ attr, calc, refine }) => calc(attr.mastery) * step(160)[refine] / 100
      }
    },

    鹮穿之喙: {
      title: '重击命中敌人[buffCount]次，元素精通提升[mastery]点',
      data: {
        buffCount:  ({ params }) => ( params.ChargedHit || 0 )  ,
        mastery: ({ params , refine }) => Math.min( 2 , ( params.ChargedHit || 0 )  ) * step(40)[refine]
      }
    },

    最初的大魔术: [{
      title: '重击造成的伤害提升[a2Dmg]%',
      refine: {
        a2Dmg: step(16)
      }
    }, {
      title: '队伍中存在[buff]位与装备者元素类型相同的角色, [buffCount]位与装备者元素类型不同的角色，攻击力提升[atkPct]%，移动速度提升[_jSpeed]%',
      data: {
        buff:  ({ params }) => ( params.ElementSame || 2 )  ,
        buffCount:  ({ params }) => ( params.ElementDifferent || 1 )  ,
        atkPct: ({ params , refine }) => step(16)[refine] * Math.min( 3 , ( ( params.ElementSame || 2 ) + 1 ) ) ,
        _jSpeed: ({ params , refine }) => step(4)[refine] * Math.min( 3 , ( params.ElementDifferent || 1 ) ) 
      }
    }],

    烈阳之嗣: [{
      check: ({ params }) => params.ChargedHit > 0 ,
      title: '重击命中敌人后，将降下阳炎矢，造成伤害。'
    },{
      check: ({ params }) => params.Scorching !== false ,
      title: '阳炎矢命中敌人后，将使该敌人承受的装备者的重击造成的伤害提升[dmg]%',
      refine: {
        dmg: step(28)
      }
    }],

    测距规: {
      check: ({ params }) => params.SubjectedHeal !== false && (  ( params.SkillsUse || 1 ) > 0 ) ||  ( ( params.BurstUse || 0 ) > 0 ),
      title: '施放元素战技或元素爆发时，将消耗3枚团结标记，提高[atkPct]%攻击力与[dmg]%所有元素伤害加成',
      refine: {
        atkPct: [3 * 3, 4 * 3, 5 * 3, 6 * 3, 7 * 3],
        dmg: [7 * 3, 8.5 * 3, 10 * 3, 11.5 * 3, 13 * 3]
      }
    },

    静谧之曲: {
      check: ({ params }) => params.SubjectedHeal !== false ,
      title: '受到治疗后，造成的伤害提升[dmg]%',
      refine: {
        dmg: step(16)
      }
    },

    筑云: {
      title: '元素能量减少时，装备者的元素精通提升[mastery]点',
      refine: {
        mastery: step(40 * 2)
      }
    },

    白雨心弦: {
      title: '满层下，生命值上限提升[hpPct]%元素爆发的暴击率提[qCpct]%',
      refine: {
        hpPct: step(40),
        qCpct: step(28)
      }
    }
  }
}