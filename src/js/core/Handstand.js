class Handstand {
    static ajax(options) {
        let request = new XMLHttpRequest();
        if (options.timeout) request.timeout = options.timeout;
        request.open(options.type, options.url, true);
        if (options.mime) {
            request.setRequestHeader('Content-type', options.mime);
        }
        if (options.on) {
            request.onreadystatechange = () => {
               if (request.readyState === 4) {
                   if ( options.on[ request.status.toString() ] ) {
                       options.on[ request.status.toString() ](request);
                   } else {
                       options.on[ '*' ](request);
                   }
               }
            }
        }
        request.send(options.data);
    }
    static loaded(method) {
        document.addEventListener("DOMContentLoaded", method);
    }
}
try { module.exports = Handstand; } catch(x) {}