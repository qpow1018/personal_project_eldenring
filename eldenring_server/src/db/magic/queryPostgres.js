const { APP_ERROR_CODE, AppErrorBuilder } = require('../../libs/error');

async function getMagicList(client) {
  const result = await client.query(`
    SELECT
      id,
      name,
      consume_fp AS "consumeFp",
      use_slot AS "useSlot",
      req_status_str AS "reqStatusStr",
      req_status_dex AS "reqStatusDex",
      req_status_int AS "reqStatusInt",
      req_status_faith AS "reqStatusFaith",
      req_status_arc AS "reqStatusArc",
      description,
      memo
    FROM t_magic
  `);

  return result.rows;
}

async function insertMagic(
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
) {
  await client.query(`
    INSERT INTO t_magic (
      name, consume_fp, use_slot, req_status_str, req_status_dex,
      req_status_int, req_status_faith, req_status_arc, description, memo,
      create_time
    )
    VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10,
      current_timestamp
    )
  `, [
      name, consumeFp, useSlot, reqStatusStr, reqStatusDex,
      reqStatusInt, reqStatusFaith, reqStatusArc, description, memo
  ]);
}

async function getMagicDetail(client, magicId) {
  const result = await client.query(`
    SELECT
      id,
      name,
      consume_fp AS "consumeFp",
      use_slot AS "useSlot",
      req_status_str AS "reqStatusStr",
      req_status_dex AS "reqStatusDex",
      req_status_int AS "reqStatusInt",
      req_status_faith AS "reqStatusFaith",
      req_status_arc AS "reqStatusArc",
      description,
      memo
    FROM t_magic
    WHERE id = $1
  `, [ magicId ]);

  if (result.rows.length === 0) {
    throw new AppErrorBuilder( APP_ERROR_CODE.APP_DATA_NOT_FOUND, 'magic detail not found' );
  }

  return result.rows[0];
}

async function updateMagic(
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
) {
  await client.query(`
    UPDATE
      t_magic
    SET
      name = $1,
      consume_fp = $2,
      use_slot = $3,
      req_status_str = $4,
      req_status_dex = $5,

      req_status_int = $6,
      req_status_faith = $7,
      req_status_arc = $8,
      description = $9,
      memo = $10

    WHERE
      id = $11
  `, [
      name, consumeFp, useSlot, reqStatusStr, reqStatusDex,
      reqStatusInt, reqStatusFaith, reqStatusArc, description, memo,
      magicId
  ]);
}

async function deleteMagic(client, magicId) {
  await client.query(`
    DELETE
    FROM t_magic
    WHERE id = $1
  `, [ magicId ]);
}

module.exports = {
  getMagicList,
  insertMagic,
  getMagicDetail,
  updateMagic,
  deleteMagic
}
