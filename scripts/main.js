const FORM_SELECTOR = '[data-coffee-order="form]'; 
const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]'; 
const SERVER_URL = 'http://saturn.rochesterschools.org:8080/json'; 


(function (window){
    'use strict'; 

    const FORM_SELECTOR = '[data-coffee-order="form"]'; 

    let App = window.App; 
    let Truck = App.Truck; 
    let DataStore = App.DataStore;
    let RemoteDataStore = App.RemoteDataStore; 
    let FormHandler = App.FormHandler; 
    let Checklist = App.Checklist; 
    let Validation = App.Validation; 

    let remoteDS = new RemoteDataStore(SERVER_URL); 

    let myTruck = new Truck('12345', remoteDS); 
    let checklist = new Checklist(CHECKLIST_SELECTOR); 

    window.myTruck = myTruck; 

    let formHandler = new FormHandler(FORM_SELECTOR);
    checklist.addClickHandler(myTruck.deliverOrder.bind(myTruck)); 
    // bind the createORder to a specific truck and pass it to addSubmitHandler
   formHandler.addSubmitHandler(function (data) {
       myTruck.createOrder.call(myTruck, data); 
       checklist.addRow.call(checklist, data); 
   }); 

   formHandler.addInputHandler(Validation.isCompanyEmail); 
})(window); 
