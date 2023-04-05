const checker = require('../libs/checker');
const prayDAO = require('../db/pray/prayDAO');

module.exports.route = function ({ app, api }) {
  api.get('/api/pray', getPrayList);
  api.post('/api/pray', insertPray);
  api.get('/api/pray/:prayId', getPrayDetail);
  api.put('/api/pray/:prayId', updatePray);
  api.delete('/api/pray/:prayId', deletePray);
}

async function getPrayList() {
  return await prayDAO.getPrayList();
}

async function insertPray({ body }) {
  checker.checkRequiredString(body.name);
  checker.checkPositiveIntegerOrNull(
    body.consumeFp, body.useSlot, body.reqStatusStr, body.reqStatusDex, body.reqStatusInt, body.reqStatusFaith, body.reqStatusArc
  );
  checker.checkStringOrNull(body.description, body.memo);

  await prayDAO.insertPray(
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

async function getPrayDetail({ params }) {
  const prayId = Number(params.prayId);

  checker.checkRequiredPositiveInteger(prayId);

  return await prayDAO.getPrayDetail(prayId);
}

async function updatePray({ params, body }) {
  const prayId = Number(params.prayId);

  checker.checkRequiredPositiveInteger(prayId);
  checker.checkRequiredString(body.name);
  checker.checkPositiveIntegerOrNull(
    body.consumeFp, body.useSlot, body.reqStatusStr, body.reqStatusDex, body.reqStatusInt, body.reqStatusFaith, body.reqStatusArc
  );
  checker.checkStringOrNull(body.description, body.memo);

  await prayDAO.updatePray(
    prayId,
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

async function deletePray({ params }) {
  const prayId = Number(params.prayId);

  checker.checkRequiredPositiveInteger(prayId);

  return await prayDAO.deletePray(prayId);
}