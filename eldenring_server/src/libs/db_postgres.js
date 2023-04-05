const { APP_ERROR_CODE, AppErrorBuilder } = require('./error');
const pg = require('pg');

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port : 5432
});

class DB_Utils {
  async defaultQuery(callback) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT')
      return result;

    } catch (error) {
      await client.query('ROLLBACK');

      if (error instanceof AppErrorBuilder) {
        throw error;
      } else {
        throw new AppErrorBuilder(error.name, error.message);
      }

    } finally {
      client.release();

    }
  };
}

const _db_utilsInstance = new DB_Utils();

module.exports = _db_utilsInstance;