'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

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

  // Import strategies
  _configStrategies2['default'].forEach(function (strategy) {
    server.auth.strategy(strategy.name, strategy.scheme, strategy.mode, strategy.options);
  });

  // Add the routes
  server.route(_configRoutes2['default']);

  // Start the server unless require'd
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7MEJBRVAsZUFBZTs7Ozt5QkFDVCxjQUFjOzs7O2dDQUNiLHFCQUFxQjs7Ozs0QkFDbkIsaUJBQWlCOzs7OzZCQUN0QixrQkFBa0I7Ozs7NEJBQ25CLGlCQUFpQjs7OztBQUVwQyxJQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFLLE1BQU0sQ0FBQywwQkFBYSxPQUFPLENBQUMsQ0FBQztBQUNyRCxNQUFNLENBQUMsVUFBVSxDQUFDLDBCQUFhLFVBQVUsQ0FBQyxDQUFDOzs7QUFHM0MsTUFBTSxDQUFDLFFBQVEsNkJBQVUsVUFBQSxLQUFLLEVBQUk7O0FBRWhDLE1BQUksS0FBSyxFQUFFO0FBQ1QsV0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztHQUNuQzs7OztBQUlELGdDQUFXLE9BQU8sQ0FBQyxVQUFBLFFBQVEsRUFBSTtBQUM3QixVQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDdkYsQ0FBQyxDQUFDOzs7QUFHSCxRQUFNLENBQUMsS0FBSywyQkFBUSxDQUFDOzs7O0FBSXJCLE1BQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQ2xCLFVBQU0sQ0FBQyxLQUFLLENBQUM7YUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sMEJBQXdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFHO0tBQUEsQ0FBQyxDQUFDO0dBQ2pGOztBQUFBLENBRUYsQ0FBQyxDQUFDOzs7O0FBSUgsSUFBSSx1QkFBVSxPQUFPLEVBQUU7QUFDckIsMEJBQUksTUFBTSxDQUFDLHVCQUFVLElBQUksQ0FBQyxDQUFDO0FBQzNCLFFBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxtQ0FBaUMsdUJBQVUsSUFBSSxDQUFHLENBQUM7Q0FDckU7OztxQkFHYyxNQUFNIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIYXBpIGZyb20gJ2hhcGknO1xuXG5pbXBvcnQgY2xpIGZyb20gJy4vaGVscGVycy9jbGknO1xuaW1wb3J0IGNsaUNvbmZpZyBmcm9tICcuL2NvbmZpZy9jbGknO1xuaW1wb3J0IHN0cmF0ZWdpZXMgZnJvbSAnLi9jb25maWcvc3RyYXRlZ2llcyc7XG5pbXBvcnQgc2VydmVyQ29uZmlnIGZyb20gJy4vY29uZmlnL3NlcnZlcic7XG5pbXBvcnQgcGx1Z2lucyBmcm9tICcuL2NvbmZpZy9wbHVnaW5zJztcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9jb25maWcvcm91dGVzJztcblxuY29uc3Qgc2VydmVyID0gbmV3IEhhcGkuU2VydmVyKHNlcnZlckNvbmZpZy5vcHRpb25zKTtcbnNlcnZlci5jb25uZWN0aW9uKHNlcnZlckNvbmZpZy5jb25uZWN0aW9uKTtcblxuLy8gUmVnaXN0ZXIgcGx1Z2luc1xuc2VydmVyLnJlZ2lzdGVyKHBsdWdpbnMsIGVycm9yID0+IHtcbiAgLy8gJGxhYjpjb3ZlcmFnZTpvZmYkXG4gIGlmIChlcnJvcikge1xuICAgIHJldHVybiBzZXJ2ZXIubG9nKCdlcnJvcicsIGVycm9yKTtcbiAgfVxuICAvLyAkbGFiOmNvdmVyYWdlOm9uJFxuXG4gIC8vIEltcG9ydCBzdHJhdGVnaWVzXG4gIHN0cmF0ZWdpZXMuZm9yRWFjaChzdHJhdGVneSA9PiB7XG4gICAgc2VydmVyLmF1dGguc3RyYXRlZ3koc3RyYXRlZ3kubmFtZSwgc3RyYXRlZ3kuc2NoZW1lLCBzdHJhdGVneS5tb2RlLCBzdHJhdGVneS5vcHRpb25zKTtcbiAgfSk7XG5cbiAgLy8gQWRkIHRoZSByb3V0ZXNcbiAgc2VydmVyLnJvdXRlKHJvdXRlcyk7XG5cbiAgLy8gU3RhcnQgdGhlIHNlcnZlciB1bmxlc3MgcmVxdWlyZSdkXG4gIC8vICRsYWI6Y292ZXJhZ2U6b2ZmJFxuICBpZiAoIW1vZHVsZS5wYXJlbnQpIHtcbiAgICBzZXJ2ZXIuc3RhcnQoKCkgPT4gc2VydmVyLmxvZygnaW5mbycsIGBTZXJ2ZXIgcnVubmluZyBhdDogJHtzZXJ2ZXIuaW5mby51cml9YCkpO1xuICB9XG4gIC8vICRsYWI6Y292ZXJhZ2U6b24kXG59KTtcblxuLy8gU3RhcnQgdGhlIENMSVxuLy8gJGxhYjpjb3ZlcmFnZTpvZmYkXG5pZiAoY2xpQ29uZmlnLmVuYWJsZWQpIHtcbiAgY2xpLmxpc3RlbihjbGlDb25maWcucG9ydCk7XG4gIHNlcnZlci5sb2coJ2luZm8nLCBgVmFudGFnZSBDTEkgc3RhcnRlZCBvbiBwb3J0ICR7Y2xpQ29uZmlnLnBvcnR9YCk7XG59XG4vLyAkbGFiOmNvdmVyYWdlOm9uJFxuXG5leHBvcnQgZGVmYXVsdCBzZXJ2ZXI7XG4iXX0=