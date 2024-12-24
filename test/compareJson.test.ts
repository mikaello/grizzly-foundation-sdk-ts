import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { describe, it } from "node:test";
import assert from "node:assert";
//import { generateJson1 } from "../src/index";

const jsonnetFile = "../jsonnet-example/compiled.json";

describe("JSON Generation and Comparison Tests", () => {
  it("should generate jsonnet compiled.json using Makefile", () => {
    execSync("make -C .. generate-test-dashboards-grizzly", {
      stdio: "inherit",
    });
    console.log("after make");
    assert.ok(existsSync(jsonnetFile), `${jsonnetFile} should exist`);
    const content = JSON.parse(readFileSync(jsonnetFile, "utf8"));
    console.log(content);
    assert.deepStrictEqual(content, { message: "Hello from Makefile" });
  });

  /*
  it("should compare properties and values of data1.json and data2.json", () => {
    const file1Path = join(generatedDir, "data1.json");
    const file2Path = join(generatedDir, "data2.json");

    assert.ok(existsSync(file1Path), "data1.json should exist");
    assert.ok(existsSync(file2Path), "data2.json should exist");

    const data1 = JSON.parse(readFileSync(file1Path, "utf8"));
    const data2 = JSON.parse(readFileSync(file2Path, "utf8"));

    const expectedData1Subset = { message: "Hello from TypeScript" };
    const expectedData2Subset = { message: "Hello from Makefile" };

    // Partial matching using Node.js' built-in `partialDeepStrictEqual`
    assert.partialDeepStrictEqual(
      data1,
      expectedData1Subset,
      "data1.json should match the expected subset"
    );
    assert.partialDeepStrictEqual(
      data2,
      expectedData2Subset,
      "data2.json should match the expected subset"
    );
  });
  */
});
