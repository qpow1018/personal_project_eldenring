const checker = require('../libs/checker');
const weaponDAO = require('../db/weapon/weaponDAO');

module.exports.route = function ({ app, api }) {
  api.get('/api/weapons', getWeapons);
  api.post('/api/weapon', insertWeapon);
  api.get('/api/weapon/:weaponId', getWeaponDetail);
  api.put('/api/weapon/:weaponId', updateWeapon);
  api.delete('/api/weapon/:weaponId', deleteWeapon);
}

async function getWeapons() {
  return await weaponDAO.getWeapons();
}

async function getWeaponDetail({ params }) {
  const weaponId = Number(params.weaponId);

  checker.checkRequiredPositiveInteger(weaponId);

  return await weaponDAO.getWeaponDetail(weaponId);
}

async function insertWeapon({ body }) {
  checker.checkRequiredString(body.name, body.category, body.weaponType);
  checker.checkRequiredStringArray(body.attackTypes);
  checker.checkPositiveIntegerOrNull(
    body.skillId, body.reqStatusStr, body.reqStatusDex, body.reqStatusInt, body.reqStatusFaith, body.reqStatusArc,
    body.damagePhysics, body.damageMagic, body.damageFire, body.damageThunder, body.damageDivinity, body.damageCritical,
    body.sideEffectCorruption, body.sideEffectFrozon, body.sideEffectBleeding, body.sideEffectPoison
  );
  checker.checkStringOrNull(body.specialFunction, body.memo);

  await weaponDAO.insertWeapon(
    body.name,
    body.category,
    body.attackTypes,
    body.weaponType,
    body.skillId,
    body.reqStatusStr,
    body.reqStatusDex,
    body.reqStatusInt,
    body.reqStatusFaith,
    body.reqStatusArc,
    body.damagePhysics,
    body.damageMagic,
    body.damageFire,
    body.damageThunder,
    body.damageDivinity,
    body.damageCritical,
    body.sideEffectCorruption,
    body.sideEffectFrozon,
    body.sideEffectBleeding,
    body.sideEffectPoison,
    body.specialFunction,
    body.memo
  );
}

async function updateWeapon({ params, body }) {
  const weaponId = Number(params.weaponId);

  checker.checkRequiredPositiveInteger(weaponId);
  checker.checkRequiredString(body.name, body.category, body.weaponType);
  checker.checkRequiredStringArray(body.attackTypes);
  checker.checkPositiveIntegerOrNull(
    body.skillId, body.reqStatusStr, body.reqStatusDex, body.reqStatusInt, body.reqStatusFaith, body.reqStatusArc,
    body.damagePhysics, body.damageMagic, body.damageFire, body.damageThunder, body.damageDivinity, body.damageCritical,
    body.sideEffectCorruption, body.sideEffectFrozon, body.sideEffectBleeding, body.sideEffectPoison
  );
  checker.checkStringOrNull(body.specialFunction, body.memo);

  await weaponDAO.updateWeapon(
    weaponId,
    body.name,
    body.category,
    body.attackTypes,
    body.weaponType,
    body.skillId,
    body.reqStatusStr,
    body.reqStatusDex,
    body.reqStatusInt,
    body.reqStatusFaith,
    body.reqStatusArc,
    body.damagePhysics,
    body.damageMagic,
    body.damageFire,
    body.damageThunder,
    body.damageDivinity,
    body.damageCritical,
    body.sideEffectCorruption,
    body.sideEffectFrozon,
    body.sideEffectBleeding,
    body.sideEffectPoison,
    body.specialFunction,
    body.memo
  );
}

async function deleteWeapon({ params }) {
  const weaponId = Number(params.weaponId);

  checker.checkRequiredPositiveInteger(weaponId);

  return await weaponDAO.deleteWeapon(weaponId);
}