/* eslint-disable */
import React from 'react';
import express from 'express';
import compression from 'compression';
import path from 'path';
import cache from 'cache-control';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { AppContainer } from 'react-hot-loader';
import { StaticRouter } from 'react-router';
import Helmet from 'react-helmet';
import { head, main, footer } from './template';
import Root from '../../components/Root';

const clientAssets = require(KYT.ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require

const app = express();

// Add middleware

// Remove annoying Express header addition.
app.disable('x-powered-by');

// Compress (gzip) assets in production.
app.use(compression());

// Add caching to the app
app.use(cache({
  '/*.html': 0, // Do not cache the index.html since the js file names change
  '/*.js': 31536000,
  '/*.css': 31536000,
  '/*.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)': 31536000,
}));

// Setup the public directory so that we can server static assets.
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));

/**
 * We wrap the React middleware inside a wrap function, so async error don't fail silently
 * but are shown on the page.
 *
 * @see https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
 *
 * TODO: Create fallback middleware that shows nice error page
 */
let wrap = fn => (...args) => fn(...args).catch(args[2])

// Setup server side routing.

app.get('*', wrap(async (req, res) => {

  res.type('text/html');

  const context= {};

  const ServerRoot = (
    <AppContainer>
      <StaticRouter location={req.url} context={context}>
        <Root />
      </StaticRouter>
    </AppContainer>
  );

  const sheet = new ServerStyleSheet();
  const root = renderToString(sheet.collectStyles(ServerRoot));

  const helmet = Helmet.renderStatic();

  res.write(head({
    helmet,
    stylesheet: sheet.getStyleTags(),
    fonts: [],
  }));

  res.write(main({
    root,
    helmet,
  }));

  res.flush();

  res.write(footer({
    manifestJSBundle: clientAssets['manifest.js'],
    mainJSBundle: clientAssets['main.js'],
    vendorJSBundle: clientAssets['vendor.js'],
    mainCSSBundle: clientAssets['main.css'],
  }));

  res.end();
}));

export default app;
