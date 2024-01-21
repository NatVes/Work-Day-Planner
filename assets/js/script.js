dayjs.extend(window.dayjs_plugin_advancedFormat);

$('#currentDay').text(dayjs().format('dddd, MMMM Do'));

let workHours = [];
let startHour = 9;
let workingDay = 9;
for (let i=0; i<workingDay; i++) {
    let hour = dayjs().hour(startHour).format('hA');
    workHours.push(hour);
    startHour++;
};

for (let i=0; i<workHours.length; i++) {
    $('.container').append(
        `<div class='row'>
        <div class='hour col-1'>${workHours[i]}</div>
        <textarea class='textarea col-10'></textarea>
        <button class='saveBtn col-1 d-flex'></button>
        </div>`
    )
};



