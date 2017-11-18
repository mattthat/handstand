require('jsdom-global')();
global.path  = require('path');
global.chai = require('chai');
global.sinon = require('sinon');
global.should = chai.should();
global.expect = chai.expect;
global.Slim = require('./mocks/mockSlim');
global.HandstandSlimIntegration = require(path.join(__dirname, '../src/js/ui-core',
    'HandstandSlimIntegration.js'));
global.HandstandElement = require(path.join(__dirname, '../src/js/ui-core',
    'HandstandElement.js'));
global.HandstandConfigurableElement = require(path.join(__dirname, '../src/js/ui-core',
    'HandstandConfigurableElement.js'));
global.HandstandModel = require(path.join(__dirname, '../src/js/core',
    'HandstandModel.js'));
global.Handstand = require(path.join(__dirname, '../src/js/ui-core',
    'Handstand.js'));
global.HandstandInput = require(path.join(__dirname, '../src/js/ui-elements/',
    'HandstandInput.js'));