// @ts-ignore TS6133
import { expect, test } from "@jest/globals";

import * as z from "../index";

const examples: [string, number, boolean] = [ "an example", 123, true ];

test("passing `examples` to schema should add a examples", () => {
  expect(z.string({ examples }).examples).toEqual(examples);
  expect(z.number({ examples }).examples).toEqual(examples);
  expect(z.boolean({ examples }).examples).toEqual(examples);
});

test("`.exemplify` should add an example", () => {
  expect(z.string().exemplify(examples[0]).examples).toEqual([examples[0]]);
  expect(z.number().exemplify(examples[1]).examples).toEqual([examples[1]]);
  expect(z.boolean().exemplify(examples[2]).examples).toEqual([examples[2]]);
});

test("examples should carry over to chained schemas", () => {
  const schema = z.string({ examples });
  expect(schema.examples).toEqual(examples);
  expect(schema.optional().examples).toEqual(examples);
  expect(schema.optional().nullable().default("default").examples).toEqual(
    examples
  );
});

test("`.exemplify` should be chainable", () => {
  const schema = z.string({ examples: ['in constructor'] });
  expect(schema.examples).toEqual(['in constructor']);

  schema.exemplify('example 1');
  expect(schema.examples).toEqual(['in constructor', 'example 1']);

  schema.exemplify('another example');
  expect(schema.examples).toEqual(['in constructor', 'example 1', 'another example']);
});
