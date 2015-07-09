var babel = require('babel-core');
var fs = require('fs');

var rc = fs.readFileSync('./.babelrc');
rc = JSON.parse(rc);

module.exports = [{
  ext: '.js',
  transform: function(content, filename) {
    if (filename.indexOf('node_modules') === -1) {
      rc.filename = filename;
      rc.sourceFileName = filename;

      return babel.transform(content, rc).code;
    }

    return content;
  }
}];
