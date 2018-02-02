class HandstandModel {
   onSet(method) {
      var that = this;
      if (!this.setEventHandler) this.setEventHandler = [];
      this.setEventHandler.push(function(key, value, model) {
         method(key, value, model);
      });
   }
   offSet(index) {
      if (!index) index = 0;
      if (this.setEventHandler && this.setEventHandler.length > 0 &&
         this.setEventHandler[index]) {
         delete this.setEventHandler[index];
      }
   }
   onGet(method) {
      var that = this;
      if (!this.getEventHandler) this.getEventHandler = [];
      this.getEventHandler.push(function(key, value, model) {
         method(key, value, model);
      });
   }
   offGet(index) {
      if (!index) index = 0;
      if (this.getEventHandler && this.getEventHandler.length > 0 &&
         this.getEventHandler[index]) {
         delete this.getEventHandler[index];
      }
   }
   Get(key) {
      var that = this;
      if (!this.dimensions) this.dimensions = {};
      if (this.getEventHandler && this.getEventHandler.length > 0) {
         this.getEventHandler.forEach(function(method) {
            method(key, that.dimensions[key], that)
         });
      }
      return this.dimensions[key];
   }
   Set(key, value) {
      var that = this;
      if (!this.dimensions) this.dimensions = {};
      this.dimensions[key] = value;
      if (this.setEventHandler && this.setEventHandler.length > 0) {
         this.setEventHandler.forEach(function(method) {
            method(key, value, that)
         });
      }
   }
   toJSON() {
      if (!this.dimensions) this.dimensions = {};
      var json = '';
      try {
         json = JSON.stringify(this.dimensions, null, 2);
      } catch(x) {
      }
      return json;
   }
}
try { module.exports = HandstandModel; } catch(x) {}