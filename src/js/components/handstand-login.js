class HandstandLogin extends Handstand {
   get template() {
      return `<slim-content>
         <handstand-container id="container-login">
          <handstand-container id="container-username" class="display-block">
           <handstand-label id="label-username" label="Username"></handstand-label>
           <handstand-textinput id="input-username" placeholder="[[userPlaceholder]]" monitor="true"></handstand-textinput>
          </handstand-container>
          <handstand-container id="container-password" class="display-block">
           <handstand-label id="label-password" label="Password"></handstand-label>
           <handstand-maskedinput id="input-password" placeholder="[[passwordPlaceholder]]" monitor="true"></handstand-maskedinput>
          </handstand-container>
          <handstand-container id="container-login-actions" class="display-block">
           <handstand-button id="button-login">
            <handstand-label interactive
            id="label-login"
            label="Login"
            parent="#button-login"
            click="buttonPressed"></handstand-label>
          </handstand-button>
         </handstand-container>
        </handstand-container>
      </slim-content>`;
  }
  setUp() {
     this.userPlaceholder = this.getAttribute('user-placeholder') || ' ';
     this.passwordPlaceholder = this.getAttribute('password-placeholder') || ' ';
  }
  buildUp() {
    var method = this.getAttribute('onAfter');
    if (window[method] && typeof window[method] === 'function') {
       window[method](this);
    }
  }
}
Handstand.tag('handstand-login', HandstandLogin);
try { module.exports = HandstandLogin; } catch(x) {}