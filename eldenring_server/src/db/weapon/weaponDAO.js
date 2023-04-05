const postgres = require('../../libs/db_postgres');
const query = require('./queryPostgres');

async function getWeapons() {
  return await postgres.defaultQuery(async function (client) {
    return await query.getWeapons(client);
  });
}

async function getWeaponDetail(weaponId) {
  return await postgres.defaultQuery(async function (client) {
    return await query.getWeaponDetail(client, weaponId);
  });
}

async function insertWeapon(
  name,
  category,
  attackTypes,
  weaponType,
  skillId,
  reqStatusStr,
  reqStatusDex,
  reqStatusInt,
  reqStatusFaith,
  reqStatusArc,
  damagePhysics,
  damageMagic,
  damageFire,
  damageThunder,
  damageDivinity,
  damageCritical,
  sideEffectCorruption,
  sideEffectFrozon,
  sideEffectBleeding,
  sideEffectPoison,
  specialFunction,
  memo
) {
  await postgres.defaultQuery(async function (client) {
    await query.insertWeapon(
      client,
      name,
      category,
      attackTypes,
      weaponType,
      skillId,
      reqStatusStr,
      reqStatusDex,
      reqStatusInt,
      reqStatusFaith,
      reqStatusArc,
      damagePhysics,
      damageMagic,
      damageFire,
      damageThunder,
      damageDivinity,
      damageCritical,
      sideEffectCorruption,
      sideEffectFrozon,
      sideEffectBleeding,
      sideEffectPoison,
      specialFunction,
      memo
    )
  });
}

async function updateWeapon(
  weaponId,
  name,
  category,
  attackTypes,
  weaponType,
  skillId,
  reqStatusStr,
  reqStatusDex,
  reqStatusInt,
  reqStatusFaith,
  reqStatusArc,
  damagePhysics,
  damageMagic,
  damageFire,
  damageThunder,
  damageDivinity,
  damageCritical,
  sideEffectCorruption,
  sideEffectFrozon,
  sideEffectBleeding,
  sideEffectPoison,
  specialFunction,
  memo
) {
  await postgres.defaultQuery(async function (client) {
    await query.updateWeapon(
      client,
      weaponId,
      name,
      category,
      attackTypes,
      weaponType,
      skillId,
      reqStatusStr,
      reqStatusDex,
      reqStatusInt,
      reqStatusFaith,
      reqStatusArc,
      damagePhysics,
      damageMagic,
      damageFire,
      damageThunder,
      damageDivinity,
      damageCritical,
      sideEffectCorruption,
      sideEffectFrozon,
      sideEffectBleeding,
      sideEffectPoison,
      specialFunction,
      memo
    )
  });
}

async function deleteWeapon(weaponId) {
  return await postgres.defaultQuery(async function (client) {
    return await query.deleteWeapon(client, weaponId);
  });
}

module.exports = {
  getWeapons,
  getWeaponDetail,
  insertWeapon,
  updateWeapon,
  deleteWeapon
}