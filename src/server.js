import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="en">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>sassyNews</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="google-site-verification" content="_5MdnS31_VU7_DmNnX03ULwjU3y8Ixr7H849EALSk0s" />
        <meta name="description" content="Sassy Developers " />
        <meta name="keywords" content="sassy,sassyDevs,devs,SassyDevs,developers,html,css,javascript," />
        <meta name="theme-color" content="#ffffff">
        <link rel="manifest" href="/manifest.json">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js');
          });
        }
        </script>
    </body>
    <noscript>Your browser does not support JavaScript!</noscript>
</html>`
      );
    }
  });

export default server;
