# BLD

Simple query string builder for Deno Postgres. 🏗

## Usage

```ts
const bld = new bld.Query();

const query = bld
  .table("foo")
  .select()
  .where("id", "=", 1)
  .build();

// query = "SELECT * FROM foo WHERE id = 1;"
```

```ts
const bld = new bld.Query();

const d = {name: "wralith", ready: true}

const query.bld
  .table("foo")
  .update(d)
  .where("id", "=", "123")
  .returning("id");

// query = "UPDATE foo SET name = 'wralith' SET ready = TRUE WHERE id = '123' RETURNING id;"
```

Look `query.test.ts` for more examples.

## Todo

- [ ] Integration test with `deno-postgres` driver
- [ ] Create table, Drop table
