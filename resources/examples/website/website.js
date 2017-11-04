class HandstandWebsite {
    body() {
        return document.querySelector('body');
    }
    containers() {
        this.layout = new HandstandContainer({ id: 'layout' });
        this.grass = new HandstandContainer({ id: 'grass' });
        this.links = new HandstandContainer({ id: 'links' });        
    }
    hstext() {
        return new HandstandText({ id: 'hs', class: 'vert-text', text: 'Handstand' });
    }
    webmonkey() {
        let monkey = document.createElement('img');
        monkey.setAttribute('id', 'webmonkey');
        monkey.setAttribute('src', 'monkey.gif');
        return monkey;
    }
    blog() {
        let blog = new HandstandButton({ id: 'blog' });
        blog.append(new HandstandText({
            id: 'blog-text', text: 'blog' }));
        blog.on('click', () => { document.location.href = '/blog' });
        return blog;
    }
    github() {
        let github = new HandstandButton({ id: 'github' });
        github.append(new HandstandText({
            id: 'github-text', text: 'github' }));
        github.on('click', () => {
            document.location.href = 'http://github.com/mattthat/handstand' });
        return github;
    }
    npm() {
        let npm = new HandstandButton({ id: 'npm' });
        npm.append(new HandstandText({
            id: 'npm-text', text: 'npm' }));
        npm.on('click', () => {
            document.location.href = 'https://www.npmjs.com/package/handstand' });
        return npm;
    }
    download() {
        let download = new HandstandButton({ id: 'download' });
        download.append(new HandstandText({
            id: 'download-text', text: 'download' }));
        download.on('click', () => {
            document.location.href = '/releases' });
        return download;
    }
    toUserExperience() {
        this.containers();
        this.links.append(this.blog());
        this.links.append(this.github());
        this.links.append(this.npm());
        this.links.append(this.download());
        this.layout.append(this.grass);
        this.layout.append(this.webmonkey());
        this.layout.append(this.hstext());
        this.layout.append(this.links);
        this.body().append(this.layout);
    }
};