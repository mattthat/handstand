require('./core_harness.js');
global.Slim = require('./mocks/mockSlim');
global.HandstandSlimIntegration = require(path.join(__dirname, '../src/js/ui-core',
    'HandstandSlimIntegration.js'));
global.HandstandElement = require(path.join(__dirname, '../src/js/ui-core',
    'HandstandElement.js'));
global.HandstandConfigurableElement = require(path.join(__dirname, '../src/js/ui-core',
    'HandstandConfigurableElement.js'));
global.HandstandModel = require(path.join(__dirname, '../src/js/core',
    'HandstandModel.js'));
global.HandstandInput = require(path.join(__dirname, '../src/js/ui-elements/',
    'HandstandInput.js'));