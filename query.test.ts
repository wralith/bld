import { Query } from "./query.ts";
import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";

type Dummy = { id: string; bar: string };
const d: Dummy = { id: "1", bar: "bar" };
const bld = new Query();

Deno.test("Query.insert()", () => {
  const got = bld.table("foo").insert(d).build();
  const want = `INSERT INTO foo (id, bar) VALUES ($1, $2);`;
  assertEquals(got, want);
});

Deno.test("Query.select()", () => {
  let got = bld.table("foo").select().build();
  let want = "SELECT * FROM foo;";
  assertEquals(got, want);

  got = bld.table("foo").select("id").build();
  want = "SELECT id FROM foo;";
  assertEquals(got, want);
});

Deno.test("Query.where()", () => {
  let got = bld.table("foo").select().where("id", "=", "1").build();
  let want = "SELECT * FROM foo WHERE id = '1';";
  assertEquals(got, want);

  got = bld.table("foo").select().where("age", ">=", 24).build();
  want = "SELECT * FROM foo WHERE age >= 24;";
  assertEquals(got, want);

  got = bld.table("foo").select().where("isAdmin", "=", true).build();
  want = "SELECT * FROM foo WHERE isAdmin = TRUE;";
  assertEquals(got, want);
});

Deno.test("Query.update and Query.returning()", () => {
  const d: Dummy = { id: "1", bar: "not-bar" };
  let got = bld.table("foo").update(d).where("id", "=", "1").returning("id")
    .build();
  let want =
    `UPDATE foo SET id = '1' SET bar = 'not-bar' WHERE id = '1' RETURNING id;`;
  assertEquals(got, want);

  got = bld.table("foo").update(d).where("id", "=", "1").returning()
    .build();
  want =
    `UPDATE foo SET id = '1' SET bar = 'not-bar' WHERE id = '1' RETURNING *;`;
  assertEquals(got, want);
});

Deno.test("Query.delete()", () => {
  const got = bld.table("foo").delete().where("id", "=", "1").build();
  const want = `DELETE FROM foo WHERE id = '1';`;
  assertEquals(got, want);
});
