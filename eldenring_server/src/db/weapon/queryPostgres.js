const { APP_ERROR_CODE, AppErrorBuilder } = require('../../libs/error');

async function getWeapons(client) {
  const result = await client.query(`
    SELECT
      m.id,
      m.name,
      m.category,
      m.attack_types AS "attackTypes",
      m.weapon_type AS "weaponType",
      m.skill_id AS "skillId",
      m.req_status_str AS "reqStatusStr",
      m.req_status_dex AS "reqStatusDex",
      m.req_status_int AS "reqStatusInt",
      m.req_status_faith AS "reqStatusFaith",
      m.req_status_arc AS "reqStatusArc",
      m.damage_physics AS "damagePhysics",
      m.damage_magic AS "damageMagic",
      m.damage_fire AS "damageFire",
      m.damage_thunder AS "damageThunder",
      m.damage_divinity AS "damageDivinity",
      m.damage_critical AS "damageCritical",
      m.side_effect_corruption AS "sideEffectCorruption",
      m.side_effect_frozon AS "sideEffectFrozon",
      m.side_effect_bleeding AS "sideEffectBleeding",
      m.side_effect_poison AS "sideEffectPoison",
      m.special_function AS "specialFunction",
      m.memo,
      s.name AS "skillName"
    FROM t_equipment_weapon AS m
      JOIN
        t_skill AS s
        ON m.skill_id = s.id
  `);

  return result.rows;
}

async function getWeaponDetail(client, weaponId) {
  const result = await client.query(`
    SELECT
      m.id,
      m.name,
      m.category,
      m.attack_types AS "attackTypes",
      m.weapon_type AS "weaponType",
      m.skill_id AS "skillId",
      m.req_status_str AS "reqStatusStr",
      m.req_status_dex AS "reqStatusDex",
      m.req_status_int AS "reqStatusInt",
      m.req_status_faith AS "reqStatusFaith",
      m.req_status_arc AS "reqStatusArc",
      m.damage_physics AS "damagePhysics",
      m.damage_magic AS "damageMagic",
      m.damage_fire AS "damageFire",
      m.damage_thunder AS "damageThunder",
      m.damage_divinity AS "damageDivinity",
      m.damage_critical AS "damageCritical",
      m.side_effect_corruption AS "sideEffectCorruption",
      m.side_effect_frozon AS "sideEffectFrozon",
      m.side_effect_bleeding AS "sideEffectBleeding",
      m.side_effect_poison AS "sideEffectPoison",
      m.special_function AS "specialFunction",
      m.memo,
      s.name AS "skillName"
    FROM t_equipment_weapon AS m
      JOIN
        t_skill AS s
        ON m.skill_id = s.id
    WHERE m.id = $1
  `, [ weaponId ]);

  if (result.rows.length === 0) {
    throw new AppErrorBuilder( APP_ERROR_CODE.APP_DATA_NOT_FOUND, 'weapon detail not found' );
  }

  return result.rows[0];
}

async function insertWeapon(
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
) {
  await client.query(`
    INSERT INTO t_equipment_weapon (
      name, category, attack_types, weapon_type, skill_id,
      req_status_str, req_status_dex, req_status_int, req_status_faith, req_status_arc,
      damage_physics, damage_magic, damage_fire, damage_thunder, damage_divinity,
      damage_critical, side_effect_corruption, side_effect_frozon, side_effect_bleeding, side_effect_poison,
      special_function, memo, create_time
    )
    VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15,
      $16, $17, $18, $19, $20,
      $21, $22, current_timestamp
    )
  `, [
      name, category, attackTypes, weaponType, skillId,
      reqStatusStr, reqStatusDex, reqStatusInt, reqStatusFaith, reqStatusArc,
      damagePhysics, damageMagic, damageFire, damageThunder, damageDivinity,
      damageCritical, sideEffectCorruption, sideEffectFrozon, sideEffectBleeding, sideEffectPoison,
      specialFunction, memo
  ]);
}

async function updateWeapon(
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
) {
  await client.query(`
    UPDATE
      t_equipment_weapon
    SET
      name = $1,
      category = $2,
      attack_types = $3,
      weapon_type = $4,
      skill_id = $5,

      req_status_str = $6,
      req_status_dex = $7,
      req_status_int = $8,
      req_status_faith = $9,
      req_status_arc = $10,

      damage_physics = $11,
      damage_magic = $12,
      damage_fire = $13,
      damage_thunder = $14,
      damage_divinity = $15,

      damage_critical = $16,
      side_effect_corruption = $17,
      side_effect_frozon = $18,
      side_effect_bleeding = $19,
      side_effect_poison = $20,

      special_function = $21,
      memo = $22
    WHERE
      id = $23
  `, [
      name, category, attackTypes, weaponType, skillId,
      reqStatusStr, reqStatusDex, reqStatusInt, reqStatusFaith, reqStatusArc,
      damagePhysics, damageMagic, damageFire, damageThunder, damageDivinity,
      damageCritical, sideEffectCorruption, sideEffectFrozon, sideEffectBleeding, sideEffectPoison,
      specialFunction, memo, weaponId
  ]);
}

async function deleteWeapon(client, weaponId) {
  await client.query(`
    DELETE
    FROM t_equipment_weapon
    WHERE id = $1
  `, [ weaponId ]);
}

module.exports = {
  getWeapons,
  getWeaponDetail,
  insertWeapon,
  updateWeapon,
  deleteWeapon
}
