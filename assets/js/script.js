dayjs.extend(window.dayjs_plugin_advancedFormat);

$('#currentDay').text(dayjs().format('dddd, MMMM Do'));

let workHours = [];
let startHour = 9;
let workingDay = 9;
let currentTime = parseInt(dayjs().format('H'));

for (let i=0; i<workingDay; i++) {
    let hour = {time: dayjs().hour(startHour).format('hA'),
                value: dayjs().hour(startHour).format('H'),}
    workHours.push(hour);
    startHour++;
};

$('.container').addClass('mt-5');

for (let index=0; index<workHours.length; index++) {    
    $('.container').append(
        `<div class='row'>
        <div class='hour col-1'>${workHours[index].time}</div>
        <textarea class='textarea col-10'></textarea>
        <button class='saveBtn col-1'></button>
        </div>`
    );
    let hour =parseInt(workHours[index].value);
    let textarea = $('.container').find('.row').eq(index).find('.textarea');
    if (hour == currentTime) {
        textarea.addClass('present');               
    } else if (hour > currentTime) {
        textarea.addClass('future');        
    } else {
        textarea.addClass('past');
    };    
};


console.log(currentTime);
console.log(workHours);








