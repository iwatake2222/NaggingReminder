function DataManager() {
  //constructor
  var obj = localStorage.getItem('myData');
  if(obj){
    this._data = JSON.parse(obj);
    // todo. why hashKey added?
    for (i = 0; i < this._data.length; i++) {
      delete this._data[i]["$$hashKey"];
    }
  } else {
    this._data = [];
  }
};

DataManager.prototype = {
  update: function() {
    localStorage.setItem('myData', JSON.stringify(this._data));
  },

  getAllSorted: function() {
    for (i = 0; i < this._data.length; i++) {
      getCommingStartTime(this._data[i]);
    }
    return this._data
  },

  getAll: function() {
    return this._data
  },

  getByID: function(id) {
    //ret val
    for (i = 0; i < this._data.length; i++) {
      if(this._data[i].id == id) {
        var copiedItem = JSON.parse(JSON.stringify(this._data[i]));
        return copiedItem;
      }
    }
    return 0;
  },

  save: function(item) {
    for (i = 0; i < this._data.length; i++) {
      if(this._data[i].id == item.id) {
        this._data[i] = JSON.parse(JSON.stringify(item));
        this.update();
        return;
      }
    }
    this._data[i] = JSON.parse(JSON.stringify(item));
    this.update();
    return;
  },

  delete: function(id) {
    for (i = 0; i < this._data.length; i++) {
      if(this._data[i].id == id) {
        this._data.splice(i, 1);
        this.update();
        return;
      }
    }
  },

  generateId: function() {
    var max = 0;
    for (i = 0; i < this._data.length; i++) {
      if(this._data[i].id > max) {
        max = this._data[i].id;
      }
    }
    return max + 1;
  },

  create: function() {
    var item = 
      {"id":this.generateId(), "title":"New Task", "repeat":REPEAT_WEEKLY, "date_weekly":DATE_WEEKLY_SUNDAY, "dateSpecific":new Date(), "dateSpecificDisplay":"2000-01-01", "time":((new Date()).getHours() * 60 * 60), "duration":1.0, "isActive":"true", "status":STATUS_NOT_WORKING, "recordNum":"0", "record":[]};
    return item;
  }
};
