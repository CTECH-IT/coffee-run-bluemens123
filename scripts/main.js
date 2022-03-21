const FORM_SELECTOR = '[data-coffee-order="form]'; 
const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]'; 



(function (window){
    'use strict'; 

    const FORM_SELECTOR = '[data-coffee-order="form"]'; 

    let App = window.App; 
    let Truck = App.Truck; 
    let DataStore = App.DataStore;
    let FormHandler = App.FormHandler; 
    let Checklist = App.Checklist; 

    let myTruck = new Truck('12345', new DataStore()); 
    let checklist = new Checklist(CHECKLIST_SELECTOR); 

    window.myTruck = myTruck; 

    let formHandler = new FormHandler(FORM_SELECTOR);
    checklist.addClickHandler(myTruck.deliverOrder.bind(myTruck)); 
    // bind the createORder to a specific truck and pass it to addSubmitHandler
   formHandler.addSubmitHandler(function (data) {
       myTruck.createOrder.call(myTruck, data); 
       checklist.addRow.call(checklist, data); 
   }); 
})(window); 
