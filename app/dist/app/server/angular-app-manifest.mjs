
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 679, hash: '0eb13706d1b9b5cdc29927dd33cd537954e13ab186d9211417c475053a49789a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1000, hash: '00e5712b15b3b89db14e0ee82b385144f1d3e325f9740a0ddf62f5363614f895', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 3824, hash: '9c61b413d2342ab5f1ccdf15e64f1d173a3af41a346fe09ec55be6b8ae6bc4a3', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-HNM5UWYF.css': {size: 67, hash: 'f/azM3a1Ta4', text: () => import('./assets-chunks/styles-HNM5UWYF_css.mjs').then(m => m.default)}
  },
};
