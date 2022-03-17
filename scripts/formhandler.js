(function (window) {
    'use strict'; 

    let App = window.App || {}; 
    let $ = window.jQuery; 

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('NO selector provided'); 
        }

        this.$formElement = $(selector); 
        if (this.$formElement.length == 0) {
            throw new Error('Could not find element with selector: ' + selector); 
        }
    }

    FormHandler.prototype.addSubmitHandler = function (func) {
        console.log('Setting the submit handler for the form...'); 

        this.$formElement.on('submit', function(event) {
            event.preventDefault(); 
            //get the data from the form and store it in a data object
            let data = {}; 
            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;   
                console.log(item.name +' is ' + item.value); 
            })
            console.log(data); 
            func(data); // call the function that was passed in on the from the addSubmitHandler

            this.reset(); //resets form
            this.elements[0].focus(); // focus on field with index 0
        }); 
    }

    App.FormHandler = FormHandler; 
    window.App = App; 
})(window); 