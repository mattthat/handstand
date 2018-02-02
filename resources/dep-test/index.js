
// setup test values
let testValue = JSON.stringify({
  "test-value": "foobar"
}, null, 2);
let version = require('../../package.json').version;

// mock HTMLElement object
global.HTMLElement = function() {
    this.getAttribute = function() {};
    this.setAttribute = function() {};
    this.style = {};
    this.childNodes = [];
    this.innerHTML = '';
    this.querySelectorAll = function() { return {} };
};

// mock window object
global.window = {};

// mock document object
global.document = {
	innerHTML: '', 
	createElement: function(o) {
	    return new HTMLElement(o); 
	}
};

// mock customElements object
global.customElements = function() {};
customElements.define = function() {};

// depend on handstand
require('handstand')('ui-element:HandstandLabel');

let label = new HandstandLabel();
label.model.Set('test-value', 'foobar');

if (testValue === label.model.toJSON() &&
	version === Handstand.version) {
    console.log("pass");
    process.exit(0);
} else {
    console.log("fail");
    process.exit(1);
}