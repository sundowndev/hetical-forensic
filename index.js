const path = require('path');
const immersive = require('immersive');

const req = require('./helpers/request');

const config = {
  // Application name used for config persistence (required)
  projectName: 'Hetic Console',
  // Will be displayed on CLI start (optional - default to displayName)
  displayName: 'hetic-console',
  // Path to the directory where commands are defined (required)
  commandsDirectory: path.join(__dirname, 'commands'),
  defaultConfig: {
    // Displayed in prompt
    user: 'hconsole',
    // Displayed in prompt
    symbol: '>',
    colors: {
      prompt: 'green',
    },
  },
  helpers: {
    req,
  }
};

global.user = {};
global.data = {};

immersive(config);
