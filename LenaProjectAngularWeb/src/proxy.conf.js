const PROXY_CONFIG = [
  {
    "context": [
      "/api/login",
      "/api/register",
      "/api/forms",
      "/api/create",
      "/api/form/addField",
      "/api/form",
      "/api"
    ],
    "target": "https://localhost:7249",
    "secure": false,
    "changeOrigin": true,
    "headers": {
      "Connection": 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
