import { strict as assert } from 'assert';
import { describe } from 'mocha';
import Parser from '../../src/parser.mjs';

describe('BinaryExpression', function (params) {
  it('base BinaryExpression', function () {
    const parser = new Parser();
    const ast = parser.parse(`1+2`);
    assert.deepEqual(ast, {
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "body": [
            {
              "type": "BinaryExpression",
              "left": {
                "type": "NumericLiteral",
                "value": 1
              },
              "operator": "+",
              "right": {
                "type": "NumericLiteral",
                "value": 1
              }
            }
          ]
        }
      ]
    });
  });
});