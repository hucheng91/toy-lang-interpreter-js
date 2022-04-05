import { strict as assert } from 'assert';
import Parser from '../src/parser.mjs';

function testParser() {
  const parser = new Parser();
  const ast = parser.parse(`123`);
  console.log('ast:', ast);
}
