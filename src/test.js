const assert = require('assert');
const app = require('./app');

describe('GET /', function() {
  it('should return a welcome message', function() {
    return app.inject({
      method: 'GET',
      url: '/'
    }).then(response => {
      assert.strictEqual(response.statusCode, 200);
      assert.strictEqual(response.payload, 'Welcome to my API!');
    });
  });
});