# handstand

Web Development Kit

[![Join the chat at https://gitter.im/handstandjs/Lobby](https://badges.gitter.im/handstandjs/Lobby.svg)](https://gitter.im/handstandjs/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A self-reliant set of ES6, native javascript classes for building modern web applications

### Links

- Home: http://handstand.matt-that.com
- Blog: http://handstand.matt-that.com/blog
- Docs: http://handstand.matt-that.com/docs
- GitHub: http://github.com/mattthat/handstand
- NPM: https://www.npmjs.com/package/handstand

### Development

#### Use

require('handstand');

let label = new HandstandLabel({ properties: { innerText: 'foo' } });

document.querySelector('body').append(label);

#### Extend

require('handstand');

class myAppLabel extends HandstandLabel {
    onRender() {
       // do something new
    }
}