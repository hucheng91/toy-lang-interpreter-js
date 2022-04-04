import { strict as assert } from 'assert';
import Parser from '../../src/parser.mjs';

export function testSingleStringLiteral() {
  const parser = new Parser();
  const ast = parser.parse(`"hello"`);
  console.log("ast:", ast);
  assert.deepEqual(ast, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: { type: 'StringLiteral', value: 'hello' }
      }
    ]
  });
}

export function testSingleNumberLiteral() {
  const parser = new Parser();
  const ast = parser.parse(`122`);
  console.log("ast:", ast);

  assert.deepEqual(ast, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: { type: 'NumberLiteral', value: 122 }
      }
    ]
  });
}

export function testMulLiteral() {
  const parser = new Parser();
  const ast = parser.parse(`
  "hello"
  123
  `);
  console.log("ast:", ast);

  assert.deepEqual(ast, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: { type: 'StringLiteral', value: 'hello' }
      },
      {
        type: 'ExpressionStatement',
        expression: { type: 'NumericLiteral', value: 123 }
      }
    ]
  });
}

function testComments() {
  const parser = new Parser();
  const ast = parser.parse(`
  /**
   * hello 
   *
  **/ 
  "hello";
  // number
  123;
  `);
  assert.deepEqual(ast, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: { type: 'StringLiteral', value: 'hello' }
      },
      {
        type: 'ExpressionStatement',
        expression: { type: 'NumericLiteral', value: 123 }
      }
    ]
  });
}
