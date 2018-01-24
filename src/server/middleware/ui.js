import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { Router } from 'express';
import * as child from 'child_process';
import webpackConfig from '../../client/webpack-config';
import log from '../log';

const router = Router();

const compiler = webpack(webpackConfig);

router.use(webpackMiddleware(compiler, { noInfo: true }));

let startedBrowser = false;

router.use(
  webpackHotMiddleware(compiler, {
    log: msg => {
      if (/webpack built [a-z0-9]+ in [0-9]+ms/.test(msg)) {
        // Start the chrome browser on the raspberry pi.
        if (!startedBrowser && process.argv[2] === 'prod') {
          startedBrowser = true;
          // Lauch Chromium in the browser
          child.exec(
            'DISPLAY=:0 chromium-browser http://localhost:6969 --disable-translate --incognito --noerrdialogs --kiosk &',
            (err, stdout) => {
              console.log(stdout);
            },
          );
        }
        log.success(msg);
      } else if (msg === 'webpack building...') {
        log.info(msg);
      } else {
        log.error(msg);
      }
    },
  }),
);

export default router;
