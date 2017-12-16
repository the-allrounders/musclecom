import chalk from 'chalk';

/**
 * Capitalize first letter.
 *
 * @param string
 * @returns {string}
 */
function cFL(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const c = console;
const l = c.log;
const e = c.error;

class Logger {
  static info(message) {
    l(`ℹ️   ${chalk.blueBright(cFL(message))}`);
  }

  static success(message) {
    l(`✅  ${chalk.green(cFL(message))}`);
  }

  static warning(message) {
    l(`⚠️  ${chalk.yellowBright(cFL(message))}`);
  }

  static error(message) {
    e(`❌  ${chalk.red(cFL(message))}`);
  }
}

export default Logger;
