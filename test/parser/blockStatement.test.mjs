import { strict as assert } from 'assert';
import Parser from '../../src/parser.mjs';


describe('blockStatement', function () {
  it('testSingleBlockStatement', function () {
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

  it('testSingleBlockStatement,number,string', function () {
    const parser = new Parser();
    const ast = parser.parse(`
    {
      "hello";
      123
    }
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
            },
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "NumericLiteral",
                "value": 123
              }
            }
          ]
        }
      ]
    });
  });

  it('testSingleLiteral,number,string', function () {
    const parser = new Parser();
    const ast = parser.parse(`
    {
    }
    `);
    assert.deepEqual(ast, {
      "type": "Program",
      "body": [
        {
          "type": "BlockStatement",
          "body": []
        }
      ]
    });
  });

  it('BlockStatement', function () {
    const parser = new Parser();
    const ast = parser.parse(`
    {
      "hello";
      123
    }
    123;
    {
      "HC"
    }
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
            },
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "NumericLiteral",
                "value": 123
              }
            }
          ]
        },
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "NumericLiteral",
            "value": 123
          }
        },
        {
          "type": "BlockStatement",
          "body": [
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "StringLiteral",
                "value": "HC"
              }
            }
          ]
        },
      ]
    });
  });

  it('nestedBlockStatement', function () {
    const parser = new Parser();
    const ast = parser.parse(`
    {
      "fool";
      {
        "hello";
        123
      }
      123;
      {
        "HC"
      }
    }
   
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
                "value": "fool"
              }
            },
            {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "StringLiteral",
                    "value": "hello"
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "NumericLiteral",
                    "value": 123
                  }
                }
              ]
            },
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "NumericLiteral",
                "value": 123
              }
            },
            {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "StringLiteral",
                    "value": "HC"
                  }
                }
              ]
            },
          ]
        }

      ]
    });
  });


});
