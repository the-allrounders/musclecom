import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { Router } from 'express';
import webpackConfig from '../../client/webpack-config';
import log from '../log';

const router = Router();

const compiler = webpack(webpackConfig);

router.use(webpackMiddleware(compiler, { noInfo: true }));

router.use(
  webpackHotMiddleware(compiler, {
    log: msg => {
      if (/webpack built [a-z0-9]+ in [0-9]+ms/.test(msg)) {
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
