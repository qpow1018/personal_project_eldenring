const { APP_ERROR_CODE, AppErrorBuilder } = require('./error');

class Checker {
  checkRequiredString( ...args ) {
    for (let i = 0; i < args.length; ++i) {
      const argument = args[i];
      if (
        argument === null ||
        argument === undefined ||
        argument.constructor !== String ||
        argument.trim() === ''
      ) {
        throw new AppErrorBuilder( APP_ERROR_CODE.APP_BAD_REQUEST, 'invalid param - required string' );
      }
    }
  }

  checkRequiredStringArray( ...args ) {
    for (let i = 0; i < args.length; ++i) {
      const arrayArgument = args[i];
      if (
        arrayArgument === null ||
        arrayArgument === undefined ||
        arrayArgument.constructor !== Array
      ) {
        throw new AppErrorBuilder( APP_ERROR_CODE.APP_BAD_REQUEST, 'invalid param - required string array' );
      }

      for (let index = 0; index < arrayArgument.length; ++index) {
        if (
          arrayArgument[index] === null ||
          arrayArgument[index] === undefined ||
          arrayArgument[index].constructor !== String ||
          arrayArgument[index].trim() === ''
        ) {
          throw new AppErrorBuilder( APP_ERROR_CODE.APP_BAD_REQUEST, 'invalid param - required string array' );
        }
      }
    }
  }

  checkRequiredPositiveInteger( ...args ) {
    for (let i = 0; i < args.length; ++i) {
      const argument = args[i];
      if (
        argument === null ||
        argument === undefined ||
        argument.constructor !== Number ||
        isNaN(argument) === true ||
        isFinite(argument) === false ||
        Number.isInteger(argument) === false ||
        argument < 0
      ) {
        throw new AppErrorBuilder( APP_ERROR_CODE.APP_BAD_REQUEST, 'invalid param - required positive integer' );
      }
    }
  }

  checkStringOrNull( ...args ) {
    for (let i = 0; i < args.length; ++i) {
      const argument = args[i];
      if (argument === undefined) {
        throw new AppErrorBuilder( APP_ERROR_CODE.APP_BAD_REQUEST, 'invalid param - not string or null' );
      }

      if (
        argument !== null &&
        (
          argument.constructor !== String ||
          argument.trim() === ''
        )
      ) {
        throw new AppErrorBuilder( APP_ERROR_CODE.APP_BAD_REQUEST, 'invalid param - not string or null' );
      }
    }
  }

  checkPositiveIntegerOrNull( ...args ) {
    for (let i = 0; i < args.length; ++i) {
      const argument = args[i];
      if (argument === undefined) {
        throw new AppErrorBuilder( APP_ERROR_CODE.APP_BAD_REQUEST, 'invalid param - not positive integer or null' );
      }

      if (
        argument !== null &&
        (
          argument.constructor !== Number ||
          isNaN(argument) === true ||
          isFinite(argument) === false ||
          Number.isInteger(argument) === false ||
          argument < 0
        )
      ) {
        throw new AppErrorBuilder( APP_ERROR_CODE.APP_BAD_REQUEST, 'invalid param - not positive integer or null' );
      }
    }
  }
}

const _checkerInstance = new Checker();

module.exports = _checkerInstance;