import { execSync } from "child_process";
import test, { describe, it } from "node:test";
import assert from "node:assert";

describe("Check correct tools are installed", () => {
  test("jsonnet should be installed", () => {
    try {
      execSync("jsonnet --version", { stdio: "ignore" });
    } catch (e) {
      assert.fail("Jsonnet is not installed");
    }
  });
  test("jsonnet-bundler should be installed", () => {
    try {
      execSync("jb --version", { stdio: "ignore" });
    } catch (e) {
      assert.fail("jsonnet-bundler is not installed");
    }
  });
  test("node version 22.6.0 or higher should be installed", () => {
    const nodeVersion = execSync("node --version").toString();
    const version = nodeVersion.split("v")[1].split(".");
    assert.ok(
      Number(version[0]) >= 22,
      "Node version should be 22.6.0 or higher. Current version is " +
        nodeVersion,
    );
  });
});
