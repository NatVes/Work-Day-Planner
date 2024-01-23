dayjs.extend(window.dayjs_plugin_advancedFormat);

$('#currentDay').text(dayjs().format('dddd, MMMM Do'));

let workHours = [];
let startHour = 9;
let workingDay = 9;
let currentTime = parseInt(dayjs().format('H'));
var taskTable = [];

checkAdd();

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
        <div class='hour time-block col-1'>${workHours[index].time}</div>
        <textarea class='textarea col-10 description' name='task'></textarea>
        <button class='saveBtn col-1'><i class="fa-solid fa-floppy-disk"></i></button>
        </div>`
    );
    let hour = parseInt(workHours[index].value);
    let textarea = $('.container').find('.row').eq(index).find('.textarea');
    let rowTime = $('.container').find('.row').eq(index).find('.hour').text();
    if (hour == currentTime) {
        textarea.addClass('present');               
    } else if (hour > currentTime) {
        textarea.addClass('future');        
    } else {
        textarea.addClass('past');
    };    
    
    renderTask(rowTime, textarea);  
};

$('.row').on('click', '.saveBtn', handleSaveTask);

function handleSaveTask(event) {
    event.preventDefault();

    let hourTask = {
        time: $(this).siblings('.hour').text(),
        task: $(this).prev().val(),
    };

    let exist = false;
    for (let i=0; i<taskTable.length; i++) {
        if (taskTable[i].task == hourTask.task && taskTable[i].time == hourTask.time) {
            exist = true;            
        } else if (taskTable[i].time == hourTask.time) {
            taskTable[i].task = hourTask.task;
            exist = true;
        }
    }
    if (!exist) {
        taskTable.push(hourTask);
    }
    
    storeUserData();
}

function storeUserData () {
    localStorage.setItem("taskTable", JSON.stringify(taskTable));
}

function renderTask(rowTime, textarea) {
    for (let i=0; i<taskTable.length; i++) {
        if (taskTable[i].time === rowTime) {
            textarea.text(taskTable[i].task);
        }
    }    
}

function checkAdd() {    
    let storedData = JSON.parse(localStorage.getItem("taskTable"));    
    if (storedData !== null) {
        taskTable = storedData;
    }
}










