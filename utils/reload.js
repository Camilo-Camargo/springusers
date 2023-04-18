const watchman = require('fb-watchman');
const client = new watchman.Client();
const child_process = require("child_process");

const path = require("path");
const java_code = path.resolve(__dirname, "../api");

//  Java Client
client.command(['watch-project', java_code], (error, resp) => {
  if (error) {
    console.error('Error initiating watch:', error);
    return;
  }

  // Java Subscription
  client.command(['subscribe', resp.watch, 'reload', {
    relative_root: resp.relative_path,
    expression: ['allof', ['match', '*.java'], ['anyof', ['exists'], ['empty']]],
    fields: ['name', 'exists', 'new'],
  }], (error, resp) => {
    if (error) {
      console.error('Error subscribing:', error);
      return;
    }
  });

  // Listen for change events
});


const react_code = path.resolve(__dirname, "../web");
// React Client
client.command(['watch-project', react_code], (error, resp) => {
  if (error) {
    console.error('Error initiating watch:', error);
    return;
  }

  // react Subscription
  client.command(['subscribe', resp.watch, 'reload', {
    expression: ['allof',
      [
        'not',
        ['dirname', 'node_modules'],
      ],
      [
        'anyof',
        ['match', '*.ts'],
        ['match', '*.tsx'],
      ]
    ],
    fields: ['name', 'new', 'exists'],
    relative_root: resp.relative_path
  }], (error, resp) => {
    if (error) {
      console.error('Error subscribing:', error);
      return;
    }
  });

  // Listen for change events
  client.on('subscription', (resp) => {
    if (resp.subscription !== "reload") return;
    child_process.exec("npm run build", {
      cwd: react_code
    }, (error, stdout) => {
      console.log(stdout);
      child_process.exec("./gradlew build", {
        cwd: java_code
      }, (error, stdout) => {
        console.log(stdout);
      }, {});
    }, {});
  });
});

