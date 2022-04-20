import { strict as assert } from 'assert';
import { describe } from 'mocha';
import Parser from '../../src/parser.mjs';

describe('BinaryExpression', function (params) {
  it('base BinaryExpression', function () {
    const parser = new Parser();
    const ast = parser.parse(`
    1+2;
    `);
    console.log(JSON.stringify(ast, null, 2));
    assert.deepEqual(ast, {
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression":
          {
            "type": "BinaryExpression",
            "left": {
              "type": "NumericLiteral",
              "value": 1
            },
            "operator": "+",
            "right": {
              "type": "NumericLiteral",
              "value": 2
            }
          }
        }
      ]
    });
  });

  it('nested BinaryExpression', function () {
    const parser = new Parser();
    const ast = parser.parse(`
    1+2+3;
    `);
    console.log(JSON.stringify(ast, null, 2));
    assert.deepEqual(ast, {
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression":
          {
            "type": "BinaryExpression",
            "left": {
              "type": "BinaryExpression",
              "left": {
                "type": "NumericLiteral",
                "value": 1
              },
              "operator": "+",
              "right": {
                "type": "NumericLiteral",
                "value": 2
              }
            },
            "operator": "+",
            "right": {
              "type": "NumericLiteral",
              "value": 3
            }
          }
        }
      ]
    });
  });

  it('MultiplicativeExpression', function () {
    const parser = new Parser();
    const ast = parser.parse(`
    1 + 2 * 3;
    `);
    console.log(JSON.stringify(ast, null, 2));
    assert.deepEqual(ast, {
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression":
          {
            "type": "BinaryExpression",
            "left": {
              "type": "NumericLiteral",
              "value": 1
            },
            "operator": "+",
            "right": {
              "type": "BinaryExpression",
              "left": {
                "type": "NumericLiteral",
                "value": 2
              },
              "operator": "*",
              "right": {
                "type": "NumericLiteral",
                "value": 3
              }
            }
          }
        }
      ]
    });
  });

  it('ParenthesizedExpression', function () {
    const parser = new Parser();
    const ast = parser.parse(`
    (1 + 2) * 3;
    `);
    console.log(JSON.stringify(ast, null, 2));
    assert.deepEqual(ast, {
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression":
          {
            "type": "BinaryExpression",
            "left": {
              "type": "BinaryExpression",
              "left": {
                "type": "NumericLiteral",
                "value": 1
              },
              "operator": "+",
              "right": {
                "type": "NumericLiteral",
                "value": 2
              }
            },
            "operator": "*",
            "right": {
              "type": "NumericLiteral",
              "value": 3
            }
          }
        }
      ]
    });
  });

});