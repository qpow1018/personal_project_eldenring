const postgres = require('../../libs/db_postgres');
const query = require('./queryPostgres');

async function getSkillList() {
  return await postgres.defaultQuery(async function (client) {
    return await query.getSkillList(client);
  });
}

async function insertSkill(
  name,
  deteriorationType,
  availableWeaponCategory,
  description,
  memo
) {
  await postgres.defaultQuery(async function (client) {
    await query.insertSkill(
      client,
      name,
      deteriorationType,
      availableWeaponCategory,
      description,
      memo
    )
  });
}

async function getSkillDetail(skillId) {
  return await postgres.defaultQuery(async function (client) {
    return await query.getSkillDetail(client, skillId);
  });
}

async function updateSkill(
  skillId,
  name,
  deteriorationType,
  availableWeaponCategory,
  description,
  memo
) {
  await postgres.defaultQuery(async function (client) {
    await query.updateSkill(
      client,
      skillId,
      name,
      deteriorationType,
      availableWeaponCategory,
      description,
      memo
    )
  });
}

async function deleteSkill(skillId) {
  return await postgres.defaultQuery(async function (client) {
    return await query.deleteSkill(client, skillId);
  });
}

module.exports = {
  getSkillList,
  insertSkill,
  getSkillDetail,
  updateSkill,
  deleteSkill
}