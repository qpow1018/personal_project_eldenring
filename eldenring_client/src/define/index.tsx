export enum FormPageType {
  create = 'create',
  update = 'update'
}

export enum WeaponCategory {
  dagger = 'dagger',
  straightSword = 'straight-sword',
  greatSword = 'great-sword',
  colossalSword = 'colossal-sword',
  thrustingSword = 'thrusting-sword',
  thrustingGreatSword = 'thrusting-great-sword',
  curvedSword = 'curved-sword',
  curvedGreatSword = 'curved-great-sword',
  katana = 'katana',
  twinblade = 'twinblade',
  axe = 'axe',
  greatAxe = 'great-axe',
  hammer = 'hammer',
  flail = 'flail',
  greatHammer = 'great-hammer',
  colossalWeapon = 'colossal-weapon',
  spear = 'spear',
  greatSpear = 'great-spear',
  halberd = 'halberd',
  reaper = 'reaper',
  whip = 'whip',
  fist = 'fist',
  claw = 'claw',
  staff = 'staff',
  sacredSeal = 'sacred-seal'
}

export const WeaponCategorys = [
  {
    code: WeaponCategory.dagger,
    displayText: '단검'
  },
  {
    code: WeaponCategory.straightSword,
    displayText: '직검'
  },
  {
    code: WeaponCategory.greatSword,
    displayText: '대검'
  },
  {
    code: WeaponCategory.colossalSword,
    displayText: '특대검'
  },
  {
    code: WeaponCategory.thrustingSword,
    displayText: '자검'
  },
  {
    code: WeaponCategory.thrustingGreatSword,
    displayText: '대자검'
  },
  {
    code: WeaponCategory.curvedSword,
    displayText: '곡검'
  },
  {
    code: WeaponCategory.curvedGreatSword,
    displayText: '대곡검'
  },
  {
    code: WeaponCategory.katana,
    displayText: '도'
  },
  {
    code: WeaponCategory.twinblade,
    displayText: '쌍날검'
  },
  {
    code: WeaponCategory.axe,
    displayText: '도끼'
  },
  {
    code: WeaponCategory.greatAxe,
    displayText: '대형 도끼'
  },
  {
    code: WeaponCategory.hammer,
    displayText: '망치'
  },
  {
    code: WeaponCategory.flail,
    displayText: '철퇴'
  },
  {
    code: WeaponCategory.greatHammer,
    displayText: '대형 망치'
  },
  {
    code: WeaponCategory.colossalWeapon,
    displayText: '특대형 무기'
  },
  {
    code: WeaponCategory.spear,
    displayText: '창'
  },
  {
    code: WeaponCategory.greatSpear,
    displayText: '대형 창'
  },
  {
    code: WeaponCategory.halberd,
    displayText: '도끼창'
  },
  {
    code: WeaponCategory.reaper,
    displayText: '낫'
  },
  {
    code: WeaponCategory.whip,
    displayText: '채찍'
  },
  {
    code: WeaponCategory.fist,
    displayText: '주먹'
  },
  {
    code: WeaponCategory.claw,
    displayText: '손톱'
  },
  {
    code: WeaponCategory.staff,
    displayText: '지팡이'
  },
  {
    code: WeaponCategory.sacredSeal,
    displayText: '성인'
  }
];

export enum WeaponType {
  basic = 'basic',
  special = 'special'
}

export const DefaultWeaponType = {
  code: WeaponType.basic,
  displayText: '기본'
}

export const WeaponTypes = [
  { ...DefaultWeaponType },
  {
    code: WeaponType.special,
    displayText: '특수'
  }
];

export enum AttackType {
  standard = 'standard',
  slash = 'slash',
  penetrate = 'penetrate',
  blow = 'blow'
}

export const AttackTypes = [
  {
    code: AttackType.standard,
    displayText: '표준'
  },
  {
    code: AttackType.slash,
    displayText: '참격'
  },
  {
    code: AttackType.penetrate,
    displayText: '관통'
  },
  {
    code: AttackType.blow,
    displayText: '타격'
  }
];

export enum DeteriorationType {
  default = 'default',
  heavy = 'heavy',
  sharp = 'sharp',
  expert = 'expert',
  magic = 'magic',
  fire = 'fire',
  fireTech = 'fireTech',
  thunder = 'thunder',
  divinity = 'divinity',
  poison = 'poison',
  blood = 'blood',
  frozon = 'frozon',
  arc = 'arc',
  empty = 'empty'
}

export const DeteriorationTypes = [
  {
    code: DeteriorationType.default,
    displayText: '기본'
  },
  {
    code: DeteriorationType.heavy,
    displayText: '중후'
  },
  {
    code: DeteriorationType.sharp,
    displayText: '예리'
  },
  {
    code: DeteriorationType.expert,
    displayText: '상질'
  },
  {
    code: DeteriorationType.magic,
    displayText: '마력'
  },
  {
    code: DeteriorationType.fire,
    displayText: '화염'
  },
  {
    code: DeteriorationType.fireTech,
    displayText: '화염술'
  },
  {
    code: DeteriorationType.thunder,
    displayText: '벼락'
  },
  {
    code: DeteriorationType.divinity,
    displayText: '신성'
  },
  {
    code: DeteriorationType.poison,
    displayText: '독'
  },
  {
    code: DeteriorationType.blood,
    displayText: '피'
  },
  {
    code: DeteriorationType.frozon,
    displayText: '냉기'
  },
  {
    code: DeteriorationType.arc,
    displayText: '신비'
  },
  {
    code: DeteriorationType.empty,
    displayText: '속성 없음'
  }
];