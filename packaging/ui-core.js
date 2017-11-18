require('./core.js');
global.Slim = require('slim-js').Slim;
global.HandstandSlimIntegration = require('../src/js/ui-core/HandstandSlimIntegration.js');
global.HandstandElement = require('../src/js/ui-core/HandstandElement.js');
global.HandstandConfigurableElement = require('../src/js/ui-core/HandstandConfigurableElement.js');
global.Handstand = require('../src/js/ui-core/Handstand.js');
global.Handstand.version = require('../package.json').version;