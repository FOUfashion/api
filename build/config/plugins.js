'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = [{
  register: require('good'),
  options: {
    reporters: [{
      reporter: 'good-console',
      events: {
        log: '*',
        response: '*',
        error: '*'
      }
    }]
  }
}, {
  register: require('hapi-auth-bearer-token')
}];
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvcGx1Z2lucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztxQkFBZSxDQUFDO0FBQ2QsVUFBUSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDekIsU0FBTyxFQUFFO0FBQ1AsYUFBUyxFQUFFLENBQUM7QUFDVixjQUFRLEVBQUUsY0FBYztBQUN4QixZQUFNLEVBQUU7QUFDTixXQUFHLEVBQUUsR0FBRztBQUNSLGdCQUFRLEVBQUUsR0FBRztBQUNiLGFBQUssRUFBRSxHQUFHO09BQ1g7S0FDRixDQUFDO0dBQ0g7Q0FDRixFQUFFO0FBQ0QsVUFBUSxFQUFFLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztDQUM1QyxDQUFDIiwiZmlsZSI6InBsdWdpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBbe1xuICByZWdpc3RlcjogcmVxdWlyZSgnZ29vZCcpLFxuICBvcHRpb25zOiB7XG4gICAgcmVwb3J0ZXJzOiBbe1xuICAgICAgcmVwb3J0ZXI6ICdnb29kLWNvbnNvbGUnLFxuICAgICAgZXZlbnRzOiB7XG4gICAgICAgIGxvZzogJyonLFxuICAgICAgICByZXNwb25zZTogJyonLFxuICAgICAgICBlcnJvcjogJyonXG4gICAgICB9XG4gICAgfV1cbiAgfVxufSwge1xuICByZWdpc3RlcjogcmVxdWlyZSgnaGFwaS1hdXRoLWJlYXJlci10b2tlbicpXG59XTtcbiJdfQ==