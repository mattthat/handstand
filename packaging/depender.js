let depender = (segment) => {
    let aliases = {
        all: () => {
            require('./all.js');
        }
    },
    packages = {
        base: () => {
            require('./base.js');
        },
        elements: () => {
            require('./elements.js');
        }
    },
    segments = {
        default: () => { aliases.all(); }
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

depender();

module.exports = depender;