if(!self.define){let e,i={};const n=(n,o)=>(n=new URL(n+".js",o).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(o,s)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let d={};const c=e=>n(e,r),l={module:{uri:r},exports:d,require:c};i[r]=Promise.all(o.map((e=>l[e]||c(e)))).then((e=>(s(...e),d)))}}define(["./workbox-59d6897f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"build/bundle.css",revision:"d2d9baf7ec697b04dcc62d8c727a405a"},{url:"build/bundle.js",revision:"076900cbdec158d61f3964b14d171454"},{url:"favicon.png",revision:"03e76a12252e42511cc1bd64de69d509"},{url:"global.css",revision:"7e392cce7a09e940a6bd667b7c8d8197"},{url:"index.html",revision:"50a402a029ed7c16b53655bd472a3385"},{url:"logo-128.png",revision:"65de1785437e0de1d17fd455f1b55012"},{url:"logo-256.png",revision:"17979a4b0ab587778f460007afc9d4b3"},{url:"logo-512.png",revision:"6a8003faa53f01fb11607f7c9ee43bac"},{url:"manifest.json",revision:"2e5ffa6c56b81530e38599d657eec817"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("https://kangasta.github.io/pakka/index.html")))}));
//# sourceMappingURL=sw.js.map
