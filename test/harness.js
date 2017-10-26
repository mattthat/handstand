require('jsdom-global')();
global.path  = require('path');
global.chai = require('chai');
global.sinon = require('sinon');
global.should = chai.should();
global.expect = chai.expect;
global.Slim = require('./mocks/mockSlim');
global.HandstandSlimIntegration = require(path.join(__dirname, '../src/js/handstand',
    'handstand-slimintegration'));
global.HandstandElement = require(path.join(__dirname, '../src/js/handstand',
    'handstand-element'));
global.HandstandConfigurableElement = require(path.join(__dirname, '../src/js/handstand',
    'handstand-configurableelement'));
global.HandstandModel = require(path.join(__dirname, '../src/js',
    'handstand-model'));
global.HandstandEventManager = require(path.join(__dirname, '../src/js',
    'handstand-eventmanager'));
global.Handstand = require(path.join(__dirname, '../src/js',
    'handstand'));
global.HandstandInput = require(path.join(__dirname, '../src/js/elements',
    'handstand-input'));