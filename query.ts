import {
  objectToKeyValueArrays,
  toSQLKeyValuePair,
  toSQLValueType,
  valuePlaceholders,
} from "./helpers.ts";

type WhereCondition = "=" | ">" | "<" | ">=" | "<=" | "!=" | "LIKE" | "IN";

export class Query<T extends Record<string, unknown>> {
  private _table = "";
  private _query = "";
  private _placeholderCount = 1;

  public select(...fields: string[]) {
    const keys = fields.length > 0 ? fields.join(", ") : "*";

    this._query = `SELECT ${keys} FROM ${this._table}`;
    return this;
  }

  public insert(data: T) {
    const [keys, values] = objectToKeyValueArrays(data);

    const keysSQL = `(${keys.join(", ")})`;

    this._query = `INSERT INTO ${this._table} ${keysSQL} VALUES ${
      valuePlaceholders(values, this._placeholderCount++)
    }`;
    return this;
  }

  public update(data: T) {
    const [keys, values] = objectToKeyValueArrays(data);

    let result = "";
    for (let i = 0; i < keys.length; i++) {
      result += ` ${toSQLKeyValuePair(keys[i], values[i])}`;
      if (i != keys.length - 1) {
        result += ",";
      }
    }

    this._query += ` UPDATE ${this._table} SET ${result.trim()}`;
    return this;
  }

  public delete() {
    this._query = `DELETE FROM ${this._table}`;
    return this;
  }

  // TODO: This is the most basic form of where, need to improve.
  // Should I use value or placeholder?
  public where(
    key: string,
    condition: WhereCondition,
    value: string | number | boolean,
  ) {
    const valueSQL = toSQLValueType(value);
    this._query += ` WHERE ${key} ${condition} ${valueSQL}`;
    return this;
  }

  public returning(...fields: string[]) {
    const keys = fields.length > 0 ? fields.join(", ") : "*";

    this._query += ` RETURNING ${keys}`;
    return this;
  }

  public table(name: string) {
    this._table = name;
    return this;
  }

  public build() {
    const res = this._query.trim() + ";";
    this._query = "";
    return res;
  }
}
