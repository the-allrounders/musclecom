import chalk from 'chalk';

const c = console;
const l = c.log;
const e = c.error;

class Logger {
  static info(message) {
    l(`ℹ️   ${chalk.blueBright(message)}`);
  }

  static success(message) {
    l(`✅  ${chalk.green(message)}`);
  }

  static warning(message) {
    l(`⚠️  ${chalk.yellowBright(message)}`);
  }

  static error(message) {
    e(`❌  ${chalk.red(message)}`);
  }
}

export default Logger;
