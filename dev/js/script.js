var targetTime;
var hourSelect;
var minuteSelect;
var ws;
var result;
var timeFormat = 'HH:mm';
var config = {};

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}

$(document).ready(function() {
    hourSelect = $('#hour');
    minuteSelect = $('#minute');
    result = $('#result');
    ws = $('#ws');

    config = Cookies.getJSON('config');
    if (config == undefined) {
        config = {
            ws: 'I need to wake up at',
            hour: '06',
            minute: '00',
            ampm: 'AM'
        }
    }
    ws.val(config.ws);
    hourSelect.val(config.hour);
    minuteSelect.val(config.minute);
    if (config.ampm == 'AM') {
        $('form.ampm>input:nth-child(1)').prop('checked', true);
    } else {
        $('form.ampm>input:nth-child(3)').prop('checked', true);
    }


    $('.time-picker>select').drum({
        panelCount: 12,
        dail_w: 32,
        dail_h: 12,
        dail_stroke_width: 0,
        dail_stroke_color: '#fff5c7',
        onChange: changeTargetTime
    });
    //Safari percentage height workaround
    $('.inner').height($('.drum-wrapper').height());

    $('input[name=ap]', 'form.ampm').change(changeTargetTime);
    ws.change(changeTargetTime);

    changeTargetTime();
});

function changeTargetTime() {
    config = {
        ws: ws.val(),
        hour: hourSelect.val(),
        minute: minuteSelect.val(),
        ampm: $('input[name=ap]:checked', 'form.ampm').val()
    };
    Cookies.set('config', config, { expires: 365 });
    targetTime = moment(config.hour + config.minute + config.ampm, 'hhmma');

    result.empty();

    var th1, th2, tr1, tr2, tr3, tr4, six, seven, nine;
    tr1 = $('<tr>');
    tr2 = $('<tr>');
    tr3 = $('<tr>');
    tr4 = $('<tr>');
    if (ws.val() == "I need to wake up at") {
        th1 = $('<th>').html('Fall asleep at');
        th2 = $('<th>').html('to sleep for');

        tr1.append(th1, th2);

        six = $("<td>").html(targetTime.subtract(6, 'hours').format(timeFormat));
        tr4.append(six, $("<td>").html('6 hours'));
        seven = $("<td>").html(targetTime.subtract(1.5, 'hours').format(timeFormat));
        tr3.append(seven, $("<td>").html('7.5 hours'));
        nine = $("<td>").html(targetTime.subtract(1.5, 'hours').format(timeFormat));
        tr2.append(nine, $("<td>").html('9 hours'));
        result.append(tr1, tr2, tr3, tr4);
    } else {
        th1 = $('<th>').html('Wake up at');
        th2 = $('<th>').html('to sleep for');

        tr1.append(th1, th2);

        six = $("<td>").html(targetTime.add(6, 'hours').format(timeFormat));
        tr2.append(six, $("<td>").html('6 hours'));
        seven = $("<td>").html(targetTime.add(1.5, 'hours').format(timeFormat));
        tr3.append(seven, $("<td>").html('7.5 hours'));
        nine = $("<td>").html(targetTime.add(1.5, 'hours').format(timeFormat));
        tr4.append(nine, $("<td>").html('9 hours'));
        result.append(tr1, tr4, tr3, tr2);
    }

}
