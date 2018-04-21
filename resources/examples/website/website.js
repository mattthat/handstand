class Website {
  constructor() {
    this.layout = new HandstandContainer({ id: 'layout' });
    this.links = new HandstandContainer({ id: 'links' });
    this.layout.append(new HandstandContainer({ id: 'grass' }));
    this.layout.append(this.img({ id: 'webmonkey', src: 'monkey.gif' }));
    this.layout.append(
      new HandstandLabel({
        id: 'hs',
        css: 'vert-text',
        properties: {
          innerText: 'Handstand'
        }
      })
    );
    this.links.append(
      this.a({
        url: '/blog',
        title: 'blog'
      })
    );
    this.links.append(
      this.a({
        url: '/docs',
        title: 'docs'
      })
    );
    this.links.append(
      this.a({
        url: 'http://github.com/mattthat/handstand',
        title: 'github'
      })
    );
    this.links.append(
      this.a({
        url: 'https://www.npmjs.com/package/handstand',
        title: 'npm'
      })
    );
    this.layout.append(this.links);
    document.querySelector('body').append(this.layout);
  }
  a(options) {
    let a = document.createElement('a');
    a.setAttribute('href', options.url);
    a.text = options.title;
    return a;
  }
  img(options) {
    let img = document.createElement('img');
    img.setAttribute('id', options.id);
    img.setAttribute('src', options.src);
    return img;
  }
}
new Website();
