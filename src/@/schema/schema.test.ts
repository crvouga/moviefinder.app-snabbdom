import { Ok } from "../result";
import { describe, expect, test } from "bun:test";
import { s } from "./index";

describe("Schema", () => {
  test("should be ok parsing json", async () => {
    const validJson: unknown[] = [
      1,
      "string",
      true,
      null,
      {},
      [],
      {
        key: "value",
      },
      ["value"],
      {
        key: ["value"],
      },
      [
        {
          key: "value",
        },
      ],
    ];

    for (const json of validJson) {
      expect(s.json.parse(json)).toEqual(Ok(json) as any);
    }
  });
});
