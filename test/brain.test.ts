import { expect, test } from "bun:test";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { leakScan } from "../src/cli.ts";

test("leakScan flags token-like content and passes clean notes", () => {
  const d = mkdtempSync(join(tmpdir(), "brain-"));
  writeFileSync(join(d, "clean.md"), "# note\nnothing secret here");
  expect(leakScan(d)).toEqual([]);
  writeFileSync(join(d, "bad.md"), "token ghp_" + "a".repeat(36));
  expect(leakScan(d).length).toBe(1);
});
