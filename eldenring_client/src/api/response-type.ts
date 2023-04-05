type ElEquipmentWeapon = {
  id: number,
  category: string,
  name: string,
  weaponType: string,
  attackTypes: string[],
  skillId: number | null,
  reqStatusStr: number | null,
  reqStatusDex: number | null,
  reqStatusInt: number | null,
  reqStatusFaith: number | null,
  reqStatusArc: number | null,
  damagePhysics: number | null,
  damageMagic: number | null,
  damageFire: number | null,
  damageThunder: number | null,
  damageDivinity: number | null,
  damageCritical: number | null,
  sideEffectCorruption: number | null,
  sideEffectFrozon: number | null,
  sideEffectBleeding: number | null,
  sideEffectPoison: number | null,
  specialFunction: string | null,
  memo: string | null,
  skillName: string
}

type ElSkill = {
  id: number,
  name: string,
  deteriorationType: string | null,
  availableWeaponCategory: string[],
  description: string | null,
  memo: string | null
}

type ElMagic = {
  id: number,
  name: string,
  consumeFp: number | null,
  useSlot: number | null,
  reqStatusStr: number | null,
  reqStatusDex: number | null,
  reqStatusInt: number | null,
  reqStatusFaith: number | null,
  reqStatusArc: number | null,
  description: string | null,
  memo: string | null
}

type ElPray = {
  id: number,
  name: string,
  consumeFp: number | null,
  useSlot: number | null,
  reqStatusStr: number | null,
  reqStatusDex: number | null,
  reqStatusInt: number | null,
  reqStatusFaith: number | null,
  reqStatusArc: number | null,
  description: string | null,
  memo: string | null
}

export type {
  ElEquipmentWeapon,
  ElSkill,
  ElMagic,
  ElPray
}