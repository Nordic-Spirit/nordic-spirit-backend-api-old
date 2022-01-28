import pool from '../config/pool';
import { CustomError } from '../errors/CustomError';
import { ErrorNames } from '../errors';

export class ModelRepo {
  async query<T>(sql: string, params?: any[]): Promise<T[]> {
    const client = await pool.connect();

    const result = client
      .query(sql, params)
      .then(({ rows }) => {
        return this.toCamelCase<T>(rows);
      })
      .catch(err => {
        throw new CustomError(err.message, ErrorNames.databaseError, err.code);
      })
      .finally(() => {
        client.release();
      });

    return result;
  }

  toCamelCase<T>(rows: any[]): T[] {
    return rows.map((row: { [key: string]: any }): T => {
      const replaced = {} as T;

      for (let key in row) {
        const camelCase = key.replace(/([-_][a-z])/gi, $1 => {
          return $1.toUpperCase().replace('_', '');
        });

        replaced[camelCase as keyof T] = row[key];
      }

      return replaced;
    });
  }
}
