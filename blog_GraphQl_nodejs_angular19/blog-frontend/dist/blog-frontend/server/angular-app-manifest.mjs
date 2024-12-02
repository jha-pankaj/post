
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  routes: [
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 2,
    "redirectTo": "/blog/posts",
    "route": "/blog"
  },
  {
    "renderMode": 2,
    "route": "/blog/posts"
  },
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/"
  }
],
  assets: new Map([
['index.csr.html', {size: 18683, hash: '1756e83576d56aa9647ca7417e7969fa44b72fd6c9b4ea5e4ff7514e83c7eef6', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 7969, hash: '01afbc2d2d69247fcdd090092ea1acb6cddfe16bc424bdd0f5217e76005bf7ea', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['login/index.html', {size: 28963, hash: '912925494054ca8e6910ae493bd77c066932ea773751c7ed70f32003caeea15f', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)}], 
['blog/posts/index.html', {size: 19008, hash: 'aefafefa66af14b9fc11585e0dc054e89cb27603322319bbecf1864fb4bdb155', text: () => import('./assets-chunks/blog_posts_index_html.mjs').then(m => m.default)}], 
['register/index.html', {size: 28251, hash: 'eb28ccba182b3294e1c1fe5cc29a0fb97fc6b9db09fbd8c7304554d72ad99c49', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)}], 
['styles-ICGSF6RS.css', {size: 238645, hash: 'ZpX1PbG5tgY', text: () => import('./assets-chunks/styles-ICGSF6RS_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
