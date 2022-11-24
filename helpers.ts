export function valuePlaceholders(values: unknown[], count: number) {
  const placeholders = values
    .map((value) => {
      if (value === undefined) return "NULL";
      else return `$${count++}`;
    })
    .join(", ");

  return `(${placeholders})`;
}

export function toSQLValueType(value: unknown): string {
  if (typeof value === "string") {
    return `'${value}'`;
  }
  if (value == true) {
    return "TRUE";
  }
  if (value == false) {
    return "FALSE";
  }

  return `${value}`;
}

export function toSQLKeyValuePair(key: string, value: unknown): string {
  return `${key} = ${toSQLValueType(value)}`;
}

// TODO: Find better name
export function objectToKeyValueArrays<T>(
  data: T,
): [keys: string[], values: unknown[]] {
  const keys = Object.keys(data as Record<string, unknown>);
  const values = Object.values(data as Record<string, unknown>);
  return [keys, values];
}
