const postgres = require('../../libs/db_postgres');
const query = require('./queryPostgres');

async function getMagicList() {
  return await postgres.defaultQuery(async function (client) {
    return await query.getMagicList(client);
  });
}

async function insertMagic(
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
    await query.insertMagic(
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

async function getMagicDetail(magicId) {
  return await postgres.defaultQuery(async function (client) {
    return await query.getMagicDetail(client, magicId);
  });
}

async function updateMagic(
  magicId,
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
    await query.updateMagic(
      client,
      magicId,
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

async function deleteMagic(magicId) {
  return await postgres.defaultQuery(async function (client) {
    return await query.deleteMagic(client, magicId);
  });
}

module.exports = {
  getMagicList,
  insertMagic,
  getMagicDetail,
  updateMagic,
  deleteMagic
}