'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

require('./models');

var _helpersCli = require('./helpers/cli');

var _helpersCli2 = _interopRequireDefault(_helpersCli);

var _configCli = require('./config/cli');

var _configCli2 = _interopRequireDefault(_configCli);

var _configStrategies = require('./config/strategies');

var _configStrategies2 = _interopRequireDefault(_configStrategies);

var _configServer = require('./config/server');

var _configServer2 = _interopRequireDefault(_configServer);

var _configPlugins = require('./config/plugins');

var _configPlugins2 = _interopRequireDefault(_configPlugins);

var _configRoutes = require('./config/routes');

var _configRoutes2 = _interopRequireDefault(_configRoutes);

var server = new _hapi2['default'].Server(_configServer2['default'].options);
server.connection(_configServer2['default'].connection);

// Register plugins
server.register(_configPlugins2['default'], function (error) {
  // $lab:coverage:off$
  if (error) {
    return server.log('error', error);
  }
  // $lab:coverage:on$

  // Import auth strategies
  _configStrategies2['default'].forEach(function (strategy) {
    server.auth.strategy(strategy.name, strategy.scheme, strategy.options);
  });

  // Set the default strategy
  server.auth['default']('ownership');

  // Add the routes
  server.route(_configRoutes2['default']);

  // Start the server unless imported
  // $lab:coverage:off$
  if (!module.parent) {
    server.start(function () {
      return server.log('info', 'Server running at: ' + server.info.uri);
    });
  }
  // $lab:coverage:on$
});

// Start the CLI
// $lab:coverage:off$
if (_configCli2['default'].enabled) {
  _helpersCli2['default'].listen(_configCli2['default'].port);
  server.log('info', 'Vantage CLI started on port ' + _configCli2['default'].port);
}
// $lab:coverage:on$

exports['default'] = server;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7UUFDaEIsVUFBVTs7MEJBRUQsZUFBZTs7Ozt5QkFDVCxjQUFjOzs7O2dDQUNiLHFCQUFxQjs7Ozs0QkFDbkIsaUJBQWlCOzs7OzZCQUN0QixrQkFBa0I7Ozs7NEJBQ25CLGlCQUFpQjs7OztBQUVwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFLLE1BQU0sQ0FBQywwQkFBYSxPQUFPLENBQUMsQ0FBQztBQUNyRCxNQUFNLENBQUMsVUFBVSxDQUFDLDBCQUFhLFVBQVUsQ0FBQyxDQUFDOzs7QUFHM0MsTUFBTSxDQUFDLFFBQVEsNkJBQVUsVUFBQSxLQUFLLEVBQUk7O0FBRWhDLE1BQUksS0FBSyxFQUFFO0FBQ1QsV0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztHQUNuQzs7OztBQUlELGdDQUFXLE9BQU8sQ0FBQyxVQUFBLFFBQVEsRUFBSTtBQUM3QixVQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0dBQ3hFLENBQUMsQ0FBQzs7O0FBR0gsUUFBTSxDQUFDLElBQUksV0FBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7QUFHakMsUUFBTSxDQUFDLEtBQUssMkJBQVEsQ0FBQzs7OztBQUlyQixNQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtBQUNsQixVQUFNLENBQUMsS0FBSyxDQUFDO2FBQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLDBCQUF3QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRztLQUFBLENBQUMsQ0FBQztHQUNqRjs7Q0FFRixDQUFDLENBQUM7Ozs7QUFJSCxJQUFJLHVCQUFVLE9BQU8sRUFBRTtBQUNyQiwwQkFBSSxNQUFNLENBQUMsdUJBQVUsSUFBSSxDQUFDLENBQUM7QUFDM0IsUUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLG1DQUFpQyx1QkFBVSxJQUFJLENBQUcsQ0FBQztDQUNyRTs7O3FCQUdjLE1BQU0iLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhhcGkgZnJvbSAnaGFwaSc7XG5pbXBvcnQgJy4vbW9kZWxzJztcblxuaW1wb3J0IGNsaSBmcm9tICcuL2hlbHBlcnMvY2xpJztcbmltcG9ydCBjbGlDb25maWcgZnJvbSAnLi9jb25maWcvY2xpJztcbmltcG9ydCBzdHJhdGVnaWVzIGZyb20gJy4vY29uZmlnL3N0cmF0ZWdpZXMnO1xuaW1wb3J0IHNlcnZlckNvbmZpZyBmcm9tICcuL2NvbmZpZy9zZXJ2ZXInO1xuaW1wb3J0IHBsdWdpbnMgZnJvbSAnLi9jb25maWcvcGx1Z2lucyc7XG5pbXBvcnQgcm91dGVzIGZyb20gJy4vY29uZmlnL3JvdXRlcyc7XG5cbmNvbnN0IHNlcnZlciA9IG5ldyBIYXBpLlNlcnZlcihzZXJ2ZXJDb25maWcub3B0aW9ucyk7XG5zZXJ2ZXIuY29ubmVjdGlvbihzZXJ2ZXJDb25maWcuY29ubmVjdGlvbik7XG5cbi8vIFJlZ2lzdGVyIHBsdWdpbnNcbnNlcnZlci5yZWdpc3RlcihwbHVnaW5zLCBlcnJvciA9PiB7XG4gIC8vICRsYWI6Y292ZXJhZ2U6b2ZmJFxuICBpZiAoZXJyb3IpIHtcbiAgICByZXR1cm4gc2VydmVyLmxvZygnZXJyb3InLCBlcnJvcik7XG4gIH1cbiAgLy8gJGxhYjpjb3ZlcmFnZTpvbiRcblxuICAvLyBJbXBvcnQgYXV0aCBzdHJhdGVnaWVzXG4gIHN0cmF0ZWdpZXMuZm9yRWFjaChzdHJhdGVneSA9PiB7XG4gICAgc2VydmVyLmF1dGguc3RyYXRlZ3koc3RyYXRlZ3kubmFtZSwgc3RyYXRlZ3kuc2NoZW1lLCBzdHJhdGVneS5vcHRpb25zKTtcbiAgfSk7XG5cbiAgLy8gU2V0IHRoZSBkZWZhdWx0IHN0cmF0ZWd5XG4gIHNlcnZlci5hdXRoLmRlZmF1bHQoJ293bmVyc2hpcCcpO1xuXG4gIC8vIEFkZCB0aGUgcm91dGVzXG4gIHNlcnZlci5yb3V0ZShyb3V0ZXMpO1xuXG4gIC8vIFN0YXJ0IHRoZSBzZXJ2ZXIgdW5sZXNzIGltcG9ydGVkXG4gIC8vICRsYWI6Y292ZXJhZ2U6b2ZmJFxuICBpZiAoIW1vZHVsZS5wYXJlbnQpIHtcbiAgICBzZXJ2ZXIuc3RhcnQoKCkgPT4gc2VydmVyLmxvZygnaW5mbycsIGBTZXJ2ZXIgcnVubmluZyBhdDogJHtzZXJ2ZXIuaW5mby51cml9YCkpO1xuICB9XG4gIC8vICRsYWI6Y292ZXJhZ2U6b24kXG59KTtcblxuLy8gU3RhcnQgdGhlIENMSVxuLy8gJGxhYjpjb3ZlcmFnZTpvZmYkXG5pZiAoY2xpQ29uZmlnLmVuYWJsZWQpIHtcbiAgY2xpLmxpc3RlbihjbGlDb25maWcucG9ydCk7XG4gIHNlcnZlci5sb2coJ2luZm8nLCBgVmFudGFnZSBDTEkgc3RhcnRlZCBvbiBwb3J0ICR7Y2xpQ29uZmlnLnBvcnR9YCk7XG59XG4vLyAkbGFiOmNvdmVyYWdlOm9uJFxuXG5leHBvcnQgZGVmYXVsdCBzZXJ2ZXI7XG4iXX0=