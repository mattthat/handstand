class Handstand extends Slim {
   Positioning() {
      this.style.position = this.getAttribute('position') || 'initial'
   }
   Bounding() {
      this.style.width = this.getAttribute('width') || 'auto';
      this.style.height = this.getAttribute('height') || 'auto'
   }
   Padding() {
      var padding = this.getAttribute('padding');
      if (!padding) {
         this.style.paddingTop = this.getAttribute('padding-top') || '0';
         this.style.paddingBottom = this.getAttribute('padding-bottom') || '0';
         this.style.paddingLeft = this.getAttribute('padding-left') || '0';
         this.style.paddingRight = this.getAttribute('padding-right') || '0';
      } else {
         this.style.paddingTop = padding;
         this.style.paddingBottom = padding;
         this.style.paddingLeft = padding;
         this.style.paddingRight = padding;
      }
   }
   Bordering() {
      this.style.borderColor = this.getAttribute('border-color') || 'white';
      this.style.borderWidth = this.getAttribute('border-width') || '0';
      this.style.borderStyle = this.getAttribute('border-style') || 'solid';
      this.style.borderRadius = this.getAttribute('border-radius') || '0';
   }
   Fonting() {
      this.style.fontSize = this.getAttribute('font-size') || '1em'
   }
   Coloring() {
      this.style.color = this.getAttribute('text-color') || 'black';
      this.style.backgroundColor = this.getAttribute('color') || 'white'
   }
   Texting() {
      this.text = this.getAttribute('text');
      this.style.textDecoration = this.getAttribute('decoration') || 'none';
      this.style.textAlign = this.getAttribute('text-align') || 'left';
   }
   onConfiguration() {
      this.Positioning();
      this.Bounding();
      this.Padding();
      this.Bordering();
      this.Fonting();
      this.Coloring();
      this.Texting();
   }
   configure() {
      this.onConfiguration();
   }
   onCreated() {
      this.configure();
   }
   fadeOut() {
      this.style.opacity = 1;
      var that = this;
      for(var i = 1; i <= 100; i++) {
         setTimeout(function() {
            that.style.opacity = that.style.opacity - 0.01;
         }, 5*i)
      }
   }
   fadeIn() {
      this.style.opacity = 0;
      var that = this, opacity = 0;
      for(var i = 1; i <= 100; i++) {
         setTimeout(function() {
            opacity += 0.01;
            that.style.opacity = opacity;
         }, 5*i)
      }
   }
   changeColor(color) {
      this.style.color = color;
   }
   changeText(text) {
      this.text = text;
   }
}