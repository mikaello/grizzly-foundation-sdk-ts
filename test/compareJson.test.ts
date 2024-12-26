import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { describe, it } from "node:test";
import assert from "node:assert";

/**
 * This test generates JSON file from both Jsonnet (grafonnet + grizzly lib) and from
 * TypeScript (Foundation SDK + this lib which is the Grizzly converted lib), and compares
 * the output of both and expects them to be equal.
 */

let workDir = "."; // when running with `npm run test` dir will be root
if (execSync("pwd").toString().endsWith("test")) {
  workDir = "..";
}

const jsonnetFile = `${workDir}/jsonnet-example/compiled.json`;
const foundationSdkFile = `${workDir}/foundation-sdk-example/compiled.json`;

describe("JSON Generation", () => {
  it("should generate jsonnet compiled.json using Makefile", () => {
    execSync(`make -C ${workDir} generate-test-dashboards-grizzly`, {
      stdio: "inherit",
    });
    assert.ok(existsSync(jsonnetFile), `${jsonnetFile} should exist`);
    const content = JSON.parse(readFileSync(jsonnetFile, "utf8"));
    assert.ok(content, "jsonnet generated content should exist");
  });

  it("should generate Foundation SDK compiled.json using Makefile", () => {
    execSync(`make -C ${workDir} generate-test-dashboards-foundation-sdk`, {
      stdio: "inherit",
    });
    assert.ok(
      existsSync(foundationSdkFile),
      `${foundationSdkFile} should exist`,
    );
    const content = JSON.parse(readFileSync(jsonnetFile, "utf8"));
    assert.ok(content, "Foundation SDK generated content should exist");
  });
});

describe("JSON Comparison", () => {
  it("should compare jsonnet compiled.json and Foundation SDK compiled.json", () => {
    assert.ok(existsSync(jsonnetFile), `${jsonnetFile} should exist`);
    assert.ok(
      existsSync(foundationSdkFile),
      `${foundationSdkFile} should exist`,
    );

    const jsonnetContent = JSON.parse(readFileSync(jsonnetFile, "utf8"));
    const foundationSdkContent = JSON.parse(
      readFileSync(foundationSdkFile, "utf8"),
    );

    // @ts-ignore
    //assert.partialDeepStrictEqual(
    assert.deepStrictEqual(
      jsonnetContent,
      foundationSdkContent,
      "jsonnet compiled.json should match Foundation SDK compiled.json",
    );
  });
});
