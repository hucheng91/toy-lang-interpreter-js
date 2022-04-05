import { strict as assert } from 'assert';
import Parser from '../../src/parser.mjs';


describe('literal test', function () {
  describe('statement', function () {
    it('testSingleStringLiteral', function () {
      const parser = new Parser();
      const ast = parser.parse(`"hello"`);
      assert.deepEqual(ast, {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: { type: 'StringLiteral', value: 'hello' }
          }
        ]
      });
    });

    it('testSingleNumberLiteral', function () {
      const parser = new Parser();
      const ast = parser.parse(`122`);
    
      assert.deepEqual(ast, {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: { type: 'NumericLiteral', value: 122 }
          }
        ]
      });
    });

    it('testMulLiteral', function () {
      const parser = new Parser();
      const ast = parser.parse(`
      "hello"
      123
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
    });

    it('testComments', function () {
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
    });
  });
});
