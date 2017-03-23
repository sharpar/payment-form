/*jslint browser: true*/
/*global $, jQuery, alert, jBox*/

// tooltips for security code and ZIP/Postal code
new jBox('Tooltip', {
    attach: '.tooltip1',
    width: 250,
    position: {
        x: 'left',
        y: 'center'
    },
    outside: 'x'
});

new jBox('Tooltip', {
    attach: '.tooltip2',
    width: 250,
    position: {
        x: 'left',
        y: 'center'
    },
    outside: 'x'
});

// when edit button is clicked
function editAmount() {
    $('.amount').hide();
    $('#edit').hide();
    $('.new-amount').css('display', 'block');
    document.getElementById("editAmount").focus();
}

// when new amount is entered
function updateAmount() {
    var newAmount = document.getElementById("editAmount").value;
    newAmount = parseFloat(Math.round(newAmount * 100) / 100).toFixed(2);
    document.getElementById("amountNumber").innerHTML = newAmount;
    $('.new-amount').hide();
    $('.amount').show();
    $('#edit').show();
    document.getElementById("payButton").innerHTML = '<i class="fa fa-lock" aria-hidden="true"></i> Pay ' + newAmount;
}

//display error message if no value is entered present
function valueError(id) {
    if ($(id).val() === "") {
        $(id).next().show(); //show error message div
        $(id).css("border-color", "#db4f4f"); //change colors to red 
        $(id).css("background-color", "#fef8f8");
        return false;
    } else {
        return true;
    }
}

function errorCheck() {
    //check if all fields have a value
    if (valueError($('#nameOnCard')) & valueError($('#cardNumber')) & valueError($('#expiryDate')) & valueError($('#securityCode')) & valueError($('#postalCode'))) {
        return true;
    }
}

//change input fields from red to blue if value is being entered
function enteringValue(id) {
    if ($(id).css('border-color') == 'rgb(219, 79, 79)') {
        $(id).css("border-color", "#cccccc");
        $(id).css("background-color", "#fff");
    }
    if ($(id).val() === "") {
        $(this).next().show();
    }
}

$(document).ready(function () {

    $("#edit").click(function () {
        editAmount();
    });

    $("#save").click(function () {
        updateAmount();
    });

    //check if all input fields have a value when submitting form
    $("#form").submit(function (event) {
        if (errorCheck() === true) {
            //if all input fields have a value, submit
            return;
        }
        //else prevent submission
        event.preventDefault();
    });

    //detecting if value is being entered
    //not first to avoid input field for new amount
    $('input:not(:first)').on('change input paste', function () {
        $(this).next().hide();
        enteringValue($(this));
    });
});
