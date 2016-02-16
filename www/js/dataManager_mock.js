function DataManager_mock() {
  //constructor
  this._data = [
   {"id":1, "title":"Study C#", "repeat":REPEAT_WEEKLY, "date_weekly":DATE_WEEKLY_SATURDAY, "dateSpecific":"2016-01-15", "dateSpecificDisplay":"2016-01-15", "time":54000 , "duration":0.5, "isActive":"true", "status":STATUS_NOT_WORKING, "recordNum":"4", "record":["Start: Thursday, October 7, 9:02 pm", "End: Thursday, October 7, 10:09 pm"]},
   {"id":2, "title":"Study PHP", "repeat":REPEAT_EVERYDAY, "date_weekly":DATE_WEEKLY_FRIDAY, "dateSpecific":"2016-01-01", "dateSpecificDisplay":"2016-01-15", "time":61200 , "duration":1, "isActive":"true", "status":STATUS_COMING, "recordNum":"4", "record":["Start: Thursday, October 7, 9:02 pm", "End: Thursday, October 7, 10:09 pm"]},
   {"id":3, "title":"Prepare sth", "repeat":REPEAT_SPECIFIC, "date_weekly":DATE_WEEKLY_MONDAY, "dateSpecific":"Mon Feb 15 2016 00:00:00 GMT-0500", "dateSpecificDisplay":"2016-02-15", "time":10800 , "duration":1, "isActive":"true", "status":STATUS_WORKING, "recordNum":"4", "record":["Start: Thursday, October 7, 9:02 pm", "End: Thursday, October 7, 10:09 pm"]}
  ];
};


DataManager_mock.prototype = {
  getAll: function() {
    // ret ref
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
        return;
      }
    }
    this._data[i] = JSON.parse(JSON.stringify(item));
    return;
  },

  delete: function(id) {
    for (i = 0; i < this._data.length; i++) {
      if(this._data[i].id == id) {
        this._data.splice(i, 1);
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
