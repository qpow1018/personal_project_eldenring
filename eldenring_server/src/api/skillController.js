const checker = require('../libs/checker');
const skillDAO = require('../db/skill/skillDAO');

module.exports.route = function ({ app, api }) {
  api.get('/api/skill', getSkillList);
  api.post('/api/skill', insertSkill);
  api.get('/api/skill/:skillId', getSkillDetail);
  api.put('/api/skill/:skillId', updateSkill);
  api.delete('/api/skill/:skillId', deleteSkill);
}

async function getSkillList() {
  return await skillDAO.getSkillList();
}

async function insertSkill({ body }) {
  checker.checkRequiredString(body.name);
  checker.checkStringOrNull(body.deteriorationType, body.description, body.memo);
  checker.checkRequiredStringArray(body.availableWeaponCategory);

  await skillDAO.insertSkill(
    body.name,
    body.deteriorationType,
    body.availableWeaponCategory,
    body.description,
    body.memo
  );
}

async function getSkillDetail({ params }) {
  const skillId = Number(params.skillId);

  checker.checkRequiredPositiveInteger(skillId);

  return await skillDAO.getSkillDetail(skillId);
}

async function updateSkill({ params, body }) {
  const skillId = Number(params.skillId);

  checker.checkRequiredPositiveInteger(skillId);
  checker.checkRequiredString(body.name);
  checker.checkStringOrNull(body.deteriorationType, body.description, body.memo);
  checker.checkRequiredStringArray(body.availableWeaponCategory);

  await skillDAO.updateSkill(
    skillId,
    body.name,
    body.deteriorationType,
    body.availableWeaponCategory,
    body.description,
    body.memo
  );
}

async function deleteSkill({ params }) {
  const skillId = Number(params.skillId);

  checker.checkRequiredPositiveInteger(skillId);

  return await skillDAO.deleteSkill(skillId);
}