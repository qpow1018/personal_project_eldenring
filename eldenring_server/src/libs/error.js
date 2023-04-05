const APP_ERROR_CODE = {
  APP_BAD_REQUEST: 'APP_BAD_REQUEST',
  APP_DATA_NOT_FOUND: 'APP_DATA_NOT_FOUND'
};
Object.freeze(APP_ERROR_CODE);

class AppErrorBuilder {
  constructor(
    errorCode,
    errorMessage
  ) {
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
}

module.exports = {
  APP_ERROR_CODE,
  AppErrorBuilder
}