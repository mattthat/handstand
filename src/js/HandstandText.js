class HandstandText extends Handstand {
   get template() {
       return `<span bind>[[text]]</span>`;
   }
   onAfterRender() {
      this.span = this.childNodes[0];
   }
}
Slim.tag('handstand-text', HandstandText);