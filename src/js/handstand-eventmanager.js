class HandstandEventManager {
   static handler(method) {
      return function (e) { method(e) }
   }
   static listen(selector, event, method) {
       let element = document.querySelector(selector);
       if (method && element && element.addEventListener)
           element.addEventListener(event, this.handler(method) );
   }
   static clear(selector, event, method) {
       let element = document.querySelector(selector);
       if (method && element && element.removeEventListener)
           element.removeEventListener(event, this.handler(method) );
   }
   static onReady(method) {
       document.onreadystatechange = function () {
           if (document.readyState == "complete") {
               if (method) HandstandEventManager.afterReflow(method);
           }
       }
   }
   static afterReflow(method, x) {
       let t = x || 1;
       setTimeout(method, t);
   }
}
try { module.exports = HandstandEventManager } catch(x) {}