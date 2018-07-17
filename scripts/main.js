(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var CheckList = App.CheckList;
  var myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);
  var arr = JSON.parse(sessionStorage.getItem("savedCheckList"));
  console.log(arr);

  formHandler.addSubmitHandler(function(data) {
    myTruck.createOrder(data);
    checkList.addRow(data);
    console.log(data);
    if (arr == null) {
      var arr = [];
      arr.push(data);
      sessionStorage.setItem("savedCheckList", JSON.stringify(arr));
      console.log(JSON.parse(sessionStorage.getItem("savedCheckList")));
    } else {
      arr.push(data);
      sessionStorage.setItem("savedCheckList", JSON.stringify(arr));
      console.log(JSON.parse(sessionStorage.getItem("savedCheckList")));
    }
  });

  if (arr != null) {
    for (var i = 0; i < arr.length; i++) {
      console.log('add row');
      checkList.addRow(arr[i]);
    }
  }

  console.log(formHandler);
})(window);
