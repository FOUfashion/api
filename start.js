if (process.env.CLI_ENABLED) {
  require('./cli');
}

if (process.env.NODE_ENV === 'production') {
  require('./server');
} else {
  const shell = require('shelljs');
  const nodemon = require('nodemon');

  // Folders
  ['config', 'controllers', 'helpers', 'models'].forEach(folder => {
    shell.exec(`babel ${folder} --watch --out-dir build/${folder}`, {
      async: true
    });
  });

  // Files
  ['cli.js', 'server.js', 'start.js'].forEach(file => {
    shell.exec(`babel ${file} --watch --out-file build/${file}`, {
      async: true
    });
  });

  nodemon({
    script: './build/server.js'
  });

  nodemon
    .on('start', console.log.bind(console, '[nodemon] starting `babel-node server.js`'))
    .on('quit', console.log.bind(console, '[nodemon] app stopped – waiting for file changes to restart'))
    .on('restart', console.log.bind(console, '[nodemon] app restarted by'));
}
