import { Hash } from "./hash";

it("returns hashed string", () => {
  const text = "test";
  const expected =
    "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";

  const hashedText = Hash.create(text);

  expect(hashedText).toEqual(expected);
});
