const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/*',
    createProxyMiddleware({
      // target: 'http://localhost:8000',
      target: 'http://172.127.0.201:8011',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/*',
    createProxyMiddleware({
      target: 'http://localhost:8011',
      changeOrigin: true,
    })
  );
};