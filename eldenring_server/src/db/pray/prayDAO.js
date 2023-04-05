const postgres = require('../../libs/db_postgres');
const query = require('./queryPostgres');

async function getPrayList() {
  return await postgres.defaultQuery(async function (client) {
    return await query.getPrayList(client);
  });
}

async function insertPray(
  name,
  consumeFp,
  useSlot,
  reqStatusStr,
  reqStatusDex,
  reqStatusInt,
  reqStatusFaith,
  reqStatusArc,
  description,
  memo
) {
  await postgres.defaultQuery(async function (client) {
    await query.insertPray(
      client,
      name,
      consumeFp,
      useSlot,
      reqStatusStr,
      reqStatusDex,
      reqStatusInt,
      reqStatusFaith,
      reqStatusArc,
      description,
      memo
    )
  });
}

async function getPrayDetail(prayId) {
  return await postgres.defaultQuery(async function (client) {
    return await query.getPrayDetail(client, prayId);
  });
}

async function updatePray(
  prayId,
  name,
  consumeFp,
  useSlot,
  reqStatusStr,
  reqStatusDex,
  reqStatusInt,
  reqStatusFaith,
  reqStatusArc,
  description,
  memo
) {
  await postgres.defaultQuery(async function (client) {
    await query.updatePray(
      client,
      prayId,
      name,
      consumeFp,
      useSlot,
      reqStatusStr,
      reqStatusDex,
      reqStatusInt,
      reqStatusFaith,
      reqStatusArc,
      description,
      memo
    )
  });
}

async function deletePray(prayId) {
  return await postgres.defaultQuery(async function (client) {
    return await query.deletePray(client, prayId);
  });
}

module.exports = {
  getPrayList,
  insertPray,
  getPrayDetail,
  updatePray,
  deletePray
}