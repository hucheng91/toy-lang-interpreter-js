import { TokenType } from './constant.mjs';
const Spec = [
  // Whitespace
  [/^\s+/, null],

  // Comments
  [/^\/\/.*/, null],              // single line comment "//..."
  [/^\/\*[\s\S]*?\*\//, null],    // multi line comment "/*...*/"

  // Symbol, delimiters
  [/^;/, ';'],        // ;
  [/^{/, '{'],        // {
  [/^}/, '}'],        // }

  // Number
  // [/\d+/,'NUMBER'],
  [/^\d[\d.e_-]*/, TokenType.NUMBER],
  // String
  [/^"[^"]*"/, TokenType.STRING],
  [/^'[^']*"/,TokenType.STRING],
]
export default class Tokenizer {

  _string = '';
  _cursor = 0;

  init(string) {
    this._string = string;
    this._cursor = 0;
  }

  getNextToken() {
    if (!this.hasMoreTokens()) {
      return null;
    }
    const str = this._string.slice(this._cursor);

    for (const [regexp, tokenType] of Spec) {
      let tokenValue = this._match(regexp, str);
      if (tokenValue === null) {
        continue;
      }

      if (tokenType === null) {
        return this.getNextToken();
      }

      return {
        type: tokenType,
        value: tokenValue
      }
    }
    let char = str[0];
    throw new SyntaxError(`Unexpected token: '${char}'`);
  }

  _match(regexp, string) {
    const matched = regexp.exec(string);
    if (matched === null) {
      return null;
    }

    this._cursor += matched[0].length;

    return matched[0];
  }

  hasMoreTokens() {
    return this._cursor < this._string.length;
  }
}