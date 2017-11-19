require('jsdom-global')();
global.path  = require('path');
global.chai = require('chai');
global.sinon = require('sinon');
global.should = chai.should();
global.expect = chai.expect;