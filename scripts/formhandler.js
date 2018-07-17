(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function(fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();
      document.location.href = 'payment.html';
    });
  };

  $('#paymentForm').on('submit', function(event) {
    event.preventDefault();
    console.log("Button pressed");
    var data = {};
    $(this).serializeArray().forEach(function(item) {
      data[item.name] = item.value;
    });
    console.log(data.username);

    $('#Msg').text('Thank you for your payment, ' + data.title + ' ' + data.username);
    $('#myModal').modal({});

    $('#myModal').on('hidden.bs.modal', function(event) {
      console.log('modal closed');
    });

    $('#modalConinueButton').on('click', function() {
      console.log('go to next page');
      document.location.href = 'index.html';
    });
    //document.location.href = 'index.html';
  });


  App.FormHandler = FormHandler;
  window.App = App;
})(window);
