import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { Router } from 'express';
import webpackConfig from '../../client/webpack-config';

const router = Router();

const compiler = webpack(webpackConfig);

router.use(webpackMiddleware(compiler));

router.use(webpackHotMiddleware(compiler));

export default router;
