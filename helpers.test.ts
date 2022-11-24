import {
  objectToKeyValueArrays,
  toSQLKeyValuePair,
  toSQLValueType,
  valuePlaceholders,
} from "./helpers.ts";
import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";

Deno.test("valuePlaceholders()", () => {
  let got = valuePlaceholders(["foo", "bar"], 0);
  let want = "($0, $1)";
  assertEquals(got, want);

  got = valuePlaceholders(["foo", "bar"], 2);
  want = "($2, $3)";
  assertEquals(got, want);

  got = valuePlaceholders(["foo", undefined, "bar"], 2);
  want = "($2, NULL, $3)";
  assertEquals(got, want);
});

Deno.test("toSQLValueType", () => {
  let got = toSQLValueType("foo");
  assertEquals(got, "'foo'");

  got = toSQLValueType(24);
  assertEquals(got, "24");

  got = toSQLValueType(true);
  assertEquals(got, "TRUE");

  got = toSQLValueType(false);
  assertEquals(got, "FALSE");
});

Deno.test("toSQLValueKeyPair", () => {
  const got = toSQLKeyValuePair("key", true);
  assertEquals(got, "key = TRUE");
});

Deno.test("objectToKeyValueArrays", () => {
  const got = objectToKeyValueArrays({ id: 1, foo: "bar" });
  assertEquals(got, [["id", "foo"], [1, "bar"]]);
});
