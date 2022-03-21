(function (window) {
    'use strict'; 

    let App = window.App || {}; 
    let $ = window.jQuery; 

    function Checklist(selector) {
        if (!selector) {
            throw new Error('NO selector provided'); 
        }

        this.$Element = $(selector); 
        if (this.$Element.length == 0) {
            throw new Error('Could not find element with selector: ' + selector); 
        }
    }

    Checklist.prototype.addClickHandler = function (func) {
        this.$Element.on('click', 'input', function (event) {
            var email = event.target.value; 
            this.removeRow(email); 
            func(email); 
        }.bind(this)); 
    }; 

    Checklist.prototype.removeRow = function (email) {
        this.$Element
            .find('[value="' + email + '"]')
            .closest('[data-coffee-order="checklist"]')
            .remove(); 
    }; 

    Checklist.prototype.addRow = function (coffeeOrder) {
        this.removeRow(coffeeOrder.emailAddress); 
        // create new instance of row with parameter coffee order
        var rowElement = new Row(coffeeOrder); 
        //add new instance of row to checklist
        this.$Element.append(rowElement.$Element); 
    }

    function Row(coffeeOrder) {
        let $div = $('<div></div>', {
            'data-coffee-order': 'checkbox', 'class': 'checkbox'
        }); 
        let $label = $('<label></label>'); 

        let $checkbox = $('<input></input>', {
            type: 'checkbox', 
            value: coffeeOrder.emailAddress
        }); 

        let description = coffeeOrder.size + ' '; 
        if(coffeeOrder.flavor) {
            description+= coffeeOrder.flavor + ' '; 
        }
        description += coffeeOrder.coffee + ', ' ;
        description += ' (' + coffeeOrder.emailAddress + ')'; 
        description += ' [' + coffeeOrder.strength + 'x]'; 

        $label.append($checkbox); 
        $label.append(description); 
        $div.append($label); 

        this.$Element = $div; 
    }

    App.Checklist = Checklist; 
    window.App = App; 
})(window); 