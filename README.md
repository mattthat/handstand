# handstand

[![Join the chat at https://gitter.im/handstandjs/Lobby](https://badges.gitter.im/handstandjs/Lobby.svg)](https://gitter.im/handstandjs/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

web development kit

### Links

- Home: http://handstand.matt-that.com
- Blog: http://handstand.matt-that.com/blog
- Docs: http://handstand.matt-that.com/docs
- GitHub: http://github.com/mattthat/handstand
- NPM: https://www.npmjs.com/package/handstand

### Development

#### Use

require('handstand');

let label = new HandstandLabel({ label: 'foo' });

document.querySelector('body').append(label);

#### Extend

require('handstand');

class myAppLabel extends HandstandLabel {
    onRender() {
       // do something new
    }
}

#### Interact with Current Build

- clone
- yarn (or npm) install
- grunt run
- browse to http://localhost:7000/

### Unit Tests Bed
 
 - use 'grunt test' to execute
 - use 'grunt coverage' to produce coverage report