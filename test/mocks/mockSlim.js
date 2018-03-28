let mockSlim = function() {
    this._attributes = [];
    this._events = [];
    this.style = {};
    this.childNodes = [];
    this.children = [];
    this.innerText = "";
    this.setAttribute = function(key, v) { this._attributes[key] = v; };
    this.getAttribute = function(key) { return this._attributes[key]; };
    this.tag = function() { };
    this.render = function() { this.onRender(); };
    this.addEventListener = function(name, method) { this._events[name] = method; };
    this.removeEventListener = function(name, method) { delete this._events[name]; };
    this.trigger = function(name) { this.dispatchEvent(name); };
    this.dispatchEvent = function(name) { if (typeof this._events[name] === 'function') this._events[name](); };
    this.append = function() { };
};
mockSlim.prototype._events = [];
mockSlim.prototype._attributes = [];
mockSlim.prototype.style = {};
mockSlim.prototype.childNodes = [];
mockSlim.prototype.children = [];
mockSlim.prototype.innerText = "";
mockSlim.prototype.setAttribute = function(key, v) { this._attributes[key] = v; };
mockSlim.prototype.getAttribute = function(key) { return this._attributes[key]; }
mockSlim.prototype.tag = function() { };
mockSlim.prototype.append = function() { };
mockSlim.tag = function() { };
mockSlim.render = function() { this.onRender() }

module.exports = mockSlim;