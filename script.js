$(document).ready(function () {
    $('#text_field').focus();
    $('#submit_btn').prop('disabled', true);
});

$('#text_field').focus(function () {
    $('#text_field').css('transform', 'scale(1.1)');
});

$('#text_field').blur(function () {
    $('#text_field').css('transform', 'scale(1)');

});

$('#text_field').keyup(function () {
    if ($('#text_field').val() != '') {
        $('#submit_btn').prop('disabled', false);
    } else {
        $('#submit_btn').prop('disabled', true);
    }
});
$('#submit_btn').click(function () {
    submitText();
});

$(document).on('keypress', function (e) {
    if (e.which == 13) {
        submitText();
    }
});

function submitText() {
    var text_field = $('#text_field').val();

    if (text_field != '') {
        $.ajax({
            type: "get",
            url: "http://api.creativehandles.com/getRandomColor",
            success: function (data) {
                createElement(text_field, data.color, invertColor(data.color))
            },
            error: function (request, status, error) {
                createElement(text_field, '#6d4298', '#ffffff');
            }
        });
        $('#text_field').val('').focus();
    }
}

function createElement(text, bg_color, text_color) {
    var main_div = document.createElement('div');
    main_div.className = 'd-flex justify-content-center bd-highlight mb-3';

    var inner_div = document.createElement('div');
    inner_div.className = 'form-group col-lg-4 col-md-4 col-xs-12 mb-0';

    var iDiv = document.createElement('div');
    iDiv.className = 'text-center p-3 rounded';
    iDiv.innerHTML = text;
    iDiv.style.cssText = 'background:' + bg_color + '; color: ' + text_color + ';';
    inner_div.innerHTML = iDiv.outerHTML;
    main_div.innerHTML = inner_div.outerHTML;
    $('#dynamic_div').append(main_div);
}

function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        return '#';
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}