/* eslint-disable prefer-template, max-len */

const getDeferScript = src => (src ? `
  <script defer src="${src}"></script>
` : '');

const getDeferStyle = cssBundle => cssBundle ? `
  <link rel="stylesheet" href="${cssBundle}" media="none" onload="if(media!='all')media='all'" />
  <noscript><link rel="stylesheet" type="text/css" href="${cssBundle}" /></noscript>
` : '';

export const head = vo => `
  <!DOCTYPE html>
  <html lang="nl" ${vo.helmet.htmlAttributes.toString()}>
    ${`
      <head>
        ${vo.helmet.title.toString()}
        ${vo.helmet.meta.toString()}
        ${vo.helmet.link.toString()}
        ${vo.fonts.map(font => `<link rel="preload" as="font" href="${font}" type="font/woff2" crossorigin />`).join('')}
        ${vo.stylesheet}
      </head>
    `}
`;

export const main = vo => `
  <body ${vo.helmet.bodyAttributes.toString()}><section id="root">${vo.root}</section>
`;

export const footer = vo => `
    ${getDeferScript(vo.manifestJSBundle)}
    ${getDeferScript(vo.vendorJSBundle)}
    ${getDeferScript(vo.mainJSBundle)}
    <script>if('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js').catch(function() {})</script>
    <script>window.HnSite = ${vo.HnSite};</script>
    ${getDeferStyle(vo.mainCSSBundle)}
    <script>/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */!function(a){"use strict";var b=function(b,c,d){function e(a){return h.body?a():void setTimeout(function(){e(a)})}function f(){i.addEventListener&&i.removeEventListener("load",f),i.media=d||"all"}var g,h=a.document,i=h.createElement("link");if(c)g=c;else{var j=(h.body||h.getElementsByTagName("head")[0]).childNodes;g=j[j.length-1]}var k=h.styleSheets;i.rel="stylesheet",i.href=b,i.media="only x",e(function(){g.parentNode.insertBefore(i,c?g:g.nextSibling)});var l=function(a){for(var b=i.href,c=k.length;c--;)if(k[c].href===b)return a();setTimeout(function(){l(a)})};return i.addEventListener&&i.addEventListener("load",f),i.onloadcssdefined=l,l(f),i};"undefined"!=typeof exports?exports.loadCSS=b:a.loadCSS=b}("undefined"!=typeof global?global:this);/*! loadCSS rel=preload polyfill. [c]2017 Filament Group, Inc. MIT License */!function(a){if(a.loadCSS){var b=loadCSS.relpreload={};if(b.support=function(){try{return a.document.createElement("link").relList.supports("preload")}catch(b){return!1}},b.poly=function(){for(var b=a.document.getElementsByTagName("link"),c=0;c<b.length;c++){var d=b[c];"preload"===d.rel&&"style"===d.getAttribute("as")&&(a.loadCSS(d.href,d,d.getAttribute("media")),d.rel=null)}},!b.support()){b.poly();var c=a.setInterval(b.poly,300);a.addEventListener&&a.addEventListener("load",function(){b.poly(),a.clearInterval(c)}),a.attachEvent&&a.attachEvent("onload",function(){a.clearInterval(c)})}}}(this)</script>
  </body>
  </html>
`;
