import { strict as assert } from 'assert';
import Parser from '../../src/parser.mjs';


describe('blockStatement', function () {
  it('testSingleStringLiteral', function () {
    const parser = new Parser();
    const ast = parser.parse(`
    {"hello"}
    `);
    assert.deepEqual(ast, {
      "type": "Program",
      "body": [
        {
          "type": "BlockStatement",
          "body": [
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "StringLiteral",
                "value": "hello"
              }
            }
          ]
        }
      ]
    });
  });
});
