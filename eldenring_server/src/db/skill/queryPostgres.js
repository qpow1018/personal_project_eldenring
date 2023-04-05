const { APP_ERROR_CODE, AppErrorBuilder } = require('../../libs/error');

async function getSkillList(client) {
  const result = await client.query(`
    SELECT
      id,
      name,
      deterioration_type AS "deteriorationType",
      available_weapon_category AS "availableWeaponCategory",
      description,
      memo
    FROM t_skill
  `);

  return result.rows;
}

async function insertSkill(
  client,
  name,
  deteriorationType,
  availableWeaponCategory,
  description,
  memo
) {
  await client.query(`
    INSERT INTO t_skill (
      name, deterioration_type, available_weapon_category, description, memo,
      create_time
    )
    VALUES (
      $1, $2, $3, $4, $5,
      current_timestamp
    )
  `, [
      name, deteriorationType, availableWeaponCategory, description, memo
  ]);
}

async function getSkillDetail(client, skillId) {
  const result = await client.query(`
    SELECT
      id,
      name,
      deterioration_type AS "deteriorationType",
      available_weapon_category AS "availableWeaponCategory",
      description,
      memo
    FROM t_skill
    WHERE id = $1
  `, [ skillId ]);

  if (result.rows.length === 0) {
    throw new AppErrorBuilder( APP_ERROR_CODE.APP_DATA_NOT_FOUND, 'skill detail not found' );
  }

  return result.rows[0];
}

async function updateSkill(
  client,
  skillId,
  name,
  deteriorationType,
  availableWeaponCategory,
  description,
  memo
) {
  await client.query(`
    UPDATE
      t_skill
    SET
      name = $1,
      deterioration_type = $2,
      available_weapon_category = $3,
      description = $4,
      memo = $5
    WHERE
      id = $6
  `, [
      name, deteriorationType, availableWeaponCategory, description, memo,
      skillId
  ]);
}

async function deleteSkill(client, skillId) {
  await client.query(`
    DELETE
    FROM t_skill
    WHERE id = $1
  `, [ skillId ]);
}

module.exports = {
  getSkillList,
  insertSkill,
  getSkillDetail,
  updateSkill,
  deleteSkill
}
