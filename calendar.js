var list = new Array();
var list_goal = new Array();
var date = new Date();
var selectedDate = new Date();
curYear = selectedDate.getFullYear();
curMonth = selectedDate.getMonth();
curDate = selectedDate.getDate();
document.querySelector('.month-date').textContent = `${curMonth + 1}월 ${curDate}일`;

function renderCalender() {
    var viewYear = date.getFullYear();
    var viewMonth = date.getMonth();

    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    var prevLast = new Date(viewYear, viewMonth, 0);
    var thisLast = new Date(viewYear, viewMonth + 1, 0);

    var PLDate = prevLast.getDate();
    var PLDay = prevLast.getDay();

    var TLDate = thisLast.getDate();
    var TLDay = thisLast.getDay();

    var prevDates = [];
    var thisDates = [...Array(TLDate + 1).keys()].slice(1);
    var nextDates = [];

    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }

    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    var dates = prevDates.concat(thisDates, nextDates);
    var firstDateIndex = dates.indexOf(1);
    var lastDateIndex = dates.lastIndexOf(TLDate);

    dates.forEach((date, i) => {
        var condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';
        dates[i] = `<div class="date" id="${i}"><span class=${condition}>${date}</span></div>`;
    });

    document.querySelector('.dates').innerHTML = dates.join('');

    var today = new Date();
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (+date.innerText === today.getDate()) {
                date.classList.add('today');
                break;
            }
        }
    }
    if (viewMonth === selectedDate.getMonth() && viewYear === selectedDate.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (date.innerText === curDate) {
                date.classList.add("selected");
                break;
            }
        }
    }
    for (var i = 0; i < list.length; i++) {
        if (list[i].year == viewYear && list[i].month == viewMonth) {
            for (let date of document.querySelectorAll('.this')) {
                if (date.innerText == list[i].date) {
                    date.classList.add("succeed");
                }
            }
        }
    }
    $('.Date').click(function () {
        $(document.getElementsByClassName("selected")).removeClass("selected");
        $(this).addClass("selected");

        curDate = $(this).text();
        curMonth = viewMonth;
        selectedDate.setDate(1);
        if ($(this).children().hasClass("other")) {
            if ($(this).attr("id") < firstDateIndex) {
                selectedDate.setMonth(date.getMonth() - 1);
                curYear = selectedDate.getFullYear();
                curMonth = selectedDate.getMonth();
                prevMonth();
            }
            else {
                selectedDate.setMonth(date.getMonth() + 1);
                curYear = selectedDate.getFullYear();
                curMonth = selectedDate.getMonth();
                nextMonth();
            }
        }
        selectedDate = new Date(curYear, curMonth, curDate);
        var flag = true;
        for (var i = 0; i < list_goal.length; i++) {
            if (curYear == list_goal[i].year && curMonth == list_goal[i].month && curDate == list_goal[i].date) {
                document.querySelector('.btn2').textContent = `${list_goal[i].goal}`;
                flag = false;
                break;
            }
        }
        if(flag) document.querySelector('.btn2').textContent = '오늘의 목표를 입력하세요.';
        document.querySelector('.month-date').textContent = `${curMonth + 1}월 ${curDate}일`;
    })

    var cnt = 0;
    for (var i = 0; i < list.length; i++) {
        if (viewYear == list[i].year && viewMonth == list[i].month) {
            cnt++;
        }
    }
    document.querySelector('.month-success-day').textContent = `${cnt} / ${TLDate}`;
}

renderCalender();

function prevMonth() {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    renderCalender();
}

function nextMonth() {
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    renderCalender();
}

function goToday() {
    date = new Date();
    renderCalender();
}

function succes() {
    var obj = new Object();
    obj.year = curYear;
    obj.month = curMonth;
    obj.date = curDate;
    var flag = true;
    for (var i = 0; i < list.length; i++) {
        if (obj.year == list[i].year && obj.month == list[i].month && obj.date == list[i].date) {
            flag = false;
            list.splice(i, 1);
            alert('취소되었습니다.');
            break;
        }
    }
    if (flag) {
        list.push(obj);
        alert('목표 달성을 축하드립니다!');
    }
    document.querySelector('.success-day').textContent = `${list.length}일`;
    renderCalender();
}

function input(){
    var userInput = prompt("오늘의 목표는 무엇인가요?");
    if(userInput==null) return;
    var obj = new Object();
    obj.year=curYear;
    obj.month=curMonth;
    obj.date=curDate;
    obj.goal=userInput;
    var flag = true;
    for (var i = 0; i < list_goal.length; i++) {
        if (obj.year == list_goal[i].year && obj.month == list_goal[i].month && obj.date == list_goal[i].date) {
            list_goal.splice(i, 1);
            alert('목표가 수정되었습니다.');
            break;
        }
    }
    list_goal.push(obj);
    document.querySelector('.btn2').textContent = `${userInput}`;
}