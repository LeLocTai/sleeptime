var targetTime;
var hourSelect;
var minuteSelect;
var ws;
var result;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('docs/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}

window.onload = function() {
    hourSelect = $('#hour');
    minuteSelect = $('#minute');
    result = $('#result');
    ws = $('#ws');

    $('.time-picker>select').drum({
        panelCount: 12,
        dail_w: 32,
        dail_h: 12,
        dail_stroke_width: 0,
        dail_stroke_color: '#fff5c7',
        onChange: changeTargetTime
    });

    $('input[name=ap]', 'form.ampm').change(changeTargetTime);
    ws.change(changeTargetTime);
    changeTargetTime();
};

function changeTargetTime() {
    targetTime = moment(hourSelect.val() + minuteSelect.val() + $('input[name=ap]:checked', 'form.ampm').val(), 'hhmma');

    result.empty();

    var th1, th2, tr1, tr2, tr3, tr4, six, seven, nine;
    tr1 = $('<tr>');
    tr2 = $('<tr>');
    tr3 = $('<tr>');
    tr4 = $('<tr>');
    if (ws.val() == "I need to wake up at") {
        th1 = $('<th>').html('Go to bed at');
        th2 = $('<th>').html('to sleep for');

        tr1.append(th1, th2);

        six = $("<td>").html(targetTime.subtract(6, 'hours').format('HH:mm'));
        tr4.append(six, $("<td>").html('6 hours'));
        seven = $("<td>").html(targetTime.subtract(1.5, 'hours').format('HH:mm'));
        tr3.append(seven, $("<td>").html('7.5 hours'));
        nine = $("<td>").html(targetTime.subtract(1.5, 'hours').format('HH:mm'));
        tr2.append(nine, $("<td>").html('9 hours'));
        result.append(tr1, tr2, tr3, tr4);
    } else {
        th1 = $('<th>').html('Wake up at');
        th2 = $('<th>').html('to sleep for');

        tr1.append(th1, th2);

        six = $("<td>").html(targetTime.add(6, 'hours').format('HH:mm'));
        tr2.append(six, $("<td>").html('6 hours'));
        seven = $("<td>").html(targetTime.add(1.5, 'hours').format('HH:mm'));
        tr3.append(seven, $("<td>").html('7.5 hours'));
        nine = $("<td>").html(targetTime.add(1.5, 'hours').format('HH:mm'));
        tr4.append(nine, $("<td>").html('9 hours'));
        result.append(tr1, tr4, tr3, tr2);
    }

}
