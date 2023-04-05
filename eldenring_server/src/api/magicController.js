const checker = require('../libs/checker');
const magicDAO = require('../db/magic/magicDAO');

module.exports.route = function ({ app, api }) {
  api.get('/api/magic', getMagicList);
  api.post('/api/magic', insertMagic);
  api.get('/api/magic/:magicId', getMagicDetail);
  api.put('/api/magic/:magicId', updateMagic);
  api.delete('/api/magic/:magicId', deleteMagic);
}

async function getMagicList() {
  return await magicDAO.getMagicList();
}

async function insertMagic({ body }) {
  checker.checkRequiredString(body.name);
  checker.checkPositiveIntegerOrNull(
    body.consumeFp, body.useSlot, body.reqStatusStr, body.reqStatusDex, body.reqStatusInt, body.reqStatusFaith, body.reqStatusArc
  );
  checker.checkStringOrNull(body.description, body.memo);

  await magicDAO.insertMagic(
    body.name,
    body.consumeFp,
    body.useSlot,
    body.reqStatusStr,
    body.reqStatusDex,
    body.reqStatusInt,
    body.reqStatusFaith,
    body.reqStatusArc,
    body.description,
    body.memo
  );
}

async function getMagicDetail({ params }) {
  const magicId = Number(params.magicId);

  checker.checkRequiredPositiveInteger(magicId);

  return await magicDAO.getMagicDetail(magicId);
}

async function updateMagic({ params, body }) {
  const magicId = Number(params.magicId);

  checker.checkRequiredPositiveInteger(magicId);
  checker.checkRequiredString(body.name);
  checker.checkPositiveIntegerOrNull(
    body.consumeFp, body.useSlot, body.reqStatusStr, body.reqStatusDex, body.reqStatusInt, body.reqStatusFaith, body.reqStatusArc
  );
  checker.checkStringOrNull(body.description, body.memo);

  await magicDAO.updateMagic(
    magicId,
    body.name,
    body.consumeFp,
    body.useSlot,
    body.reqStatusStr,
    body.reqStatusDex,
    body.reqStatusInt,
    body.reqStatusFaith,
    body.reqStatusArc,
    body.description,
    body.memo
  );
}

async function deleteMagic({ params }) {
  const magicId = Number(params.magicId);

  checker.checkRequiredPositiveInteger(magicId);

  return await magicDAO.deleteMagic(magicId);
}