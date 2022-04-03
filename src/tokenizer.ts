
export default class Tokenizer {

  _string: string = '';
  _cursor: number = 0;

  init(string: string) {
    this._string = string;
    this._cursor = 0;
  }

  getNextToken() {
   if (!this.hasMoreTokens()) {
     return null;
   }
    const string = this._string.slice(this._cursor);

    if (Number.isNaN(Number(string[0]))) {
      let number = '';
    }
  }

  hasMoreTokens() {
    return this._cursor < this._string.length;
  }
}