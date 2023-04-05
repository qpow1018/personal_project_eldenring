export default class FormValidator {
  private _value: any;
  private _isValid: boolean = true;
  private _errorMsg: string = '';

  constructor (value: any) {
    this._value = value;
  }

  private isValid(): boolean {
    return this._isValid;
  }

  public required(errorMsg: string): FormValidator {
    if (this.isValid() === false) return this;

    const val = this._value;
    if (val === null || val === undefined || val.trim() === '') {
      this._isValid = false;
      this._errorMsg = errorMsg;
    }

    return this;
  }

  public minSize(count: number, errorMsg: string): FormValidator {
    if (this.isValid() === false) return this;

    const val = this._value;
    if (val === null || val === undefined || val.length < count) {
      this._isValid = false;
      this._errorMsg = errorMsg;
    }

    return this;
  }

  public check(): { pass: boolean, errorMsg: string } {
    return {
      pass: this._isValid,
      errorMsg: this._errorMsg
    };
  }
}