import { strict as assert } from 'assert';
import { describe } from 'mocha';
import Parser from '../../src/parser.mjs';

describe('BinaryExpression', function (params) {
  it('base BinaryExpression', function () {
    const parser = new Parser();
    const ast = parser.parse(`
    1+2;
    `);
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

  it('MultiplicativeExpression2', function () {
    const parser = new Parser();
    const ast = parser.parse(`
    1 + 2 * 3 / 4;
    `);
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
              },
              "operator": "/",
              "right": {
                "type": "NumericLiteral",
                "value": 4
              }
            }
          }
        }
      ]
    });
  });

  it('MultiplicativeExpression', function () {
    const parser = new Parser();
    const ast = parser.parse(`
    1 + 2 * 3 + 4;
    `);
    assert.deepEqual(ast, {
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "operator": "+",
            "left": {
              "type": "BinaryExpression",
              "operator": "+",
              "left": {
                "type": "NumericLiteral",
                "value": 1
              },
              "right": {
                "type": "BinaryExpression",
                "operator": "*",
                "left": {
                  "type": "NumericLiteral",
                  "value": 2
                },
                "right": {
                  "type": "NumericLiteral",
                  "value": 3
                }
              }
            },
            "right": {
              "type": "NumericLiteral",
              "value": 4
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