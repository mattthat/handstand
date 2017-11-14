# handstand

Web components

## Getting Started

Take a look at http://handstand.matt-that.com

(more to come)

### Development

#### Interact with Current Build

- yarn (or npm) install
- grunt buildview-server
- browse to http://localhost:7000/

#### Use via NPM

https://handstandjs.atlassian.net/wiki/spaces/HSKNOW/pages/622609/Getting+Started+via+NPM

    -snip-

        require('handstand');        // under 1.x this requires all objects
        require('handstand')("base") // under 1.x this requires only the base objects

    -snip-

### Unit Tests Bed
 
 - use 'grunt test' to execute
 - use 'grunt coverage' to produce coverage report


### Structure

#### src/css

Contains element and component styles as well as themes

#### src/html

- elements: individual custom web elements
- components: multiple custom web elements, working together, to provide a specific behavior

#### src/js

Contains an element event manager and extendable Handstand objects

#### test

Contains a mocha/chai test bed