let depender = (segment) => {
    let aliases = {
        all: () => {
            require('./aliases/all.js');
        }
    },
    packages = {
        core: () => {
            require('./packages/core.js');
        },
        'ui-core': () => {
            require('./packages/ui-core.js')
        },
        'ui-elements': () => {
            require('./packages/ui-elements.js');
        },
        'ui-components': () => {
            require('./packages/ui-components.js');
        },
        worker: () => {
            require('./packages/worker.js');
        }
    },
    segments = {
        default: () => { packages.core(); },
        'ui-element:HandstandInput': () => {
            packages['ui-core']();
            global.HandstandInput = require('../src/js/ui-elements/HandstandInput.js');
        },
        'ui-element:HandstandButton': () => {
            packages['ui-core']();
            global.HandstandButton = require('../src/js/ui-elements/HandstandButton.js');
        },
        'ui-element:HandstandContainer': () => {
            packages['ui-core']();
            global.HandstandContainer = require('../src/js/ui-elements/HandstandContainer.js');
        },
        'ui-element:HandstandLabel': () => {
            packages['ui-core']();
            global.HandstandLabel = require('../src/js/ui-elements/HandstandLabel.js');
        },
        'ui-element:HandstandList': () => {
            packages['ui-core']();
            global.HandstandList = require('../src/js/ui-elements/HandstandList.js');
        },
        'ui-element:HandstandSwitch': () => {
            packages['ui-core']();
            global.HandstandSwitch = require('../src/js/ui-elements/HandstandSwitch.js');
        },
        'ui-element:HandstandCheckbox': () => {
            packages['ui-core']();
            global.HandstandCheckbox = require('../src/js/ui-elements/HandstandCheckboxjs');
        },
        'ui-element:HandstandTextInput': () => {
            packages['ui-core']();
            global.HandstandTextInput = require('../src/js/ui-elements/HandstandTextInput.js');
        },
        'ui-element:HandstandSelector': () => {
            packages['ui-core']();
            global.HandstandSelector = require('../src/js/ui-elements/HandstandSelector.js');
        }
    };
    if (segment && segment.length > 0) {
        if (typeof segments[segment] === "function") {
            segments[segment]();
        } else if (typeof packages[segment] === "function") {
            packages[segment]();
        } else if (typeof aliases[segment] === "function") {
            aliases[segment]();
        }
    } else {
        segments.default();
    }
};

module.exports = depender;