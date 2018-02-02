# handstand

[![Join the chat at https://gitter.im/handstandjs/Lobby](https://badges.gitter.im/handstandjs/Lobby.svg)](https://gitter.im/handstandjs/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

web development kit

### Development

#### Use

require('handstand');

let label = new HandstandLabel({ label: 'foo' });

document.querySelector('body').append(label);

#### Extend

require('handstand');

class myAppLabel extends HandstandLabel {
}

#### Interact with Current Build

- clone
- yarn (or npm) install
- grunt buildview-server
- browse to http://localhost:7000/

### Unit Tests Bed
 
 - use 'grunt test' to execute
 - use 'grunt coverage' to produce coverage report

### Structure

#### src/css

Contains element and component styles as well as themes

#### src/js

Contains an element event manager and extendable Handstand objects

#### test

Contains a mocha/chai test bed