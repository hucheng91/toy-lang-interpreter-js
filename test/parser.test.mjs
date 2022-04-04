import { strict as assert } from 'assert';
import Parser from '../src/parser.mjs';
import { testSingleStringLiteral, testSingleNumberLiteral, testMulLiteral, testComments } from './parser/literal.test.mjs'

function testParser() {
  const parser = new Parser();
  const ast = parser.parse(`123`);
  console.log('ast:', ast);
}

function test() {
  testParser();
  testSingleStringLiteral();
  testSingleNumberLiteral();
  testMulLiteral();
  testComments();
}

test();