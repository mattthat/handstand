class HandstandWebsite {
    container(options) {
        return new HandstandContainer(options);
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
    render() {
        this.layout = this.container({ id: 'layout' }),
        this.grass = this.container({ id: 'grass' }),
        this.links = this.container({ id: 'links' }),
        this.name = new HandstandLabel({
            id: 'hs',
            class: 'vert-text',
            label: 'Handstand'
        }),
        this.monkey = this.img({ id: 'webmonkey', src: 'monkey.gif' });
    }
    attach() {
        this.layout.append(this.grass);
        this.layout.append(this.monkey);
        this.layout.append(this.name);
        this.links.append(this.a({
            url: '/blog',
            title: 'blog',
        }));
        this.links.append(this.a({
            url: 'http://github.com/mattthat/handstand',
            title: 'github'
        }));
        this.links.append(this.a({
            url: 'https://www.npmjs.com/package/handstand',
            title: 'npm'
        }));
        this.layout.append(this.links);
        document.querySelector('body').append(this.layout);
    }
    draw() {
        this.render();
        this.attach();
    }
};