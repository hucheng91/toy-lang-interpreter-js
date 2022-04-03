
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

    if (!Number.isNaN(Number(str[0]))) {
      let number = '';
      while (!Number.isNaN(Number(str[this._cursor]))) {
        number += str[this._cursor++]
      }
      return {
        type: 'NUMBER',
        value: number
      };
    }
    return null;
  }

  hasMoreTokens() {
    return this._cursor < this._string.length;
  }
}