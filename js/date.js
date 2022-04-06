const calendar = document.querySelector(".calendar");
const calendarHeader_YearMonth = document.querySelector(".year-month");
const calendarHeader_MonthTitle = document.querySelector(".calendar-header__title-month");
const calendarHeader_TitleImg = document.querySelector(".calendar-header__title-img");
const calendarHeader_TitleLogoImg = document.querySelector(".calendar-header__title-logo");
const splashScreen = document.querySelector(".splash-screen");
const splashScreenImage = document.querySelector(".splash-screen__img");
const calendarDays = document.querySelector(".days");
const calendarDates = document.querySelector(".dates");
const prevBtn = document.querySelector(".go-prev");
const nextBtn = document.querySelector(".go-next");

let date = new Date();
function themeRender(currentMonthName){
    calendarDays.className = "days";
    calendarDays.classList.add(`theme-${currentMonthName}`);
    calendarDates.className = "dates";
    calendarDates.classList.add(`theme-${currentMonthName}-bg`);
    document.body.className = "";
    document.body.classList.add(`theme-${currentMonthName}-bg`);
    calendarHeader_MonthTitle.innerText = `${currentMonthName}`;
    calendarHeader_TitleLogoImg.src = `./resource/img/titlelogo/${currentMonthName}_num.png`;
    calendarHeader_TitleImg.src = `./resource/img/titlelogo/${currentMonthName}_img.png`;
    splashScreenImage.src = `./resource/img/splash/${currentMonthName}.jpg`;
}

function setBtnState(currentMonthName){
    if(currentMonthName === "January"){ prevBtn.style.visibility = "hidden"; }
    else if (currentMonthName === "December" ) { nextBtn.style.visibility = "hidden"; }
    else { prevBtn.style.visibility = "visible"; nextBtn.style.visibility = "visible"; }
}


function prevMonDatesRender(prevDate, prevDay) {
    for (let i = prevDate - prevDay; i <= prevDate; i++) {
        calendarDates.innerHTML = `${calendarDates.innerHTML}<div class="date prev disable">${i}</div>`; 
    }
}
function  thisMonDatesRender(thisDate, currentMonth, currentMonthName){
    var holidayChk;
    for (let i = 1; i <= thisDate; i++) {
        holidayChk = ("00"+currentMonth.toString()).slice(-2) +("00"+i.toString()).slice(-2);
        if(holidays.includes(holidayChk))
        {
            calendarDates.innerHTML = `${calendarDates.innerHTML}<div class="date current theme-${currentMonthName}">${i}<div>${holidaysInfo[holidayChk]  === undefined ? "" : holidaysInfo[holidayChk]}</div></div>`;
            continue;
        }
        else if((calendarDates.childElementCount%7) == 0 || (calendarDates.childElementCount%7) == 6)
        {
            calendarDates.innerHTML = `${calendarDates.innerHTML}<div class="date current theme-${currentMonthName}">${i}</div>`;
            continue;
        }
        calendarDates.innerHTML = `${calendarDates.innerHTML}<div class="date current">${i}</div>`;
    }
}
function  nextMonDatesRender(){
    for (let i = 1; calendarDates.childElementCount < 7*6; i++) { 
        calendarDates.innerHTML = `${calendarDates.innerHTML}<div class="date next disable">${i}</div>`;
    }
}

function renderCalendar() {
    splash();
    calendarDates.innerHTML = "";
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDate = date.getDate();
    const currentMonthName = date.toLocaleString("en-US", { month: "long" });
    themeRender(currentMonthName);
    setBtnState(currentMonthName);

    /* date 매개변수에 0을 줄 시, 이전 달의 마지막 날을 얻을 수 있음 */
    const prevMonLast = new Date(currentYear, currentMonth, 0);
    const prevDate = prevMonLast.getDate();
    const prevDay = prevMonLast.getDay();

    const thisMonLast = new Date(currentYear, currentMonth + 1, 0);
    const thisDate = thisMonLast.getDate();
    const thisDay = thisMonLast.getDay();

    prevMonDatesRender(prevDate, prevDay);
    thisMonDatesRender(thisDate, currentMonth+1, currentMonthName);
    nextMonDatesRender();
}

function skipSplash(){
    splashScreen.style.display = "none";
    splashScreen.style.visibility = "collapse";
    splashScreen.style.opacity = 0;
}

function splash(){
    splashScreen.classList.remove("splash");
    splashScreen.offsetWidth;
    splashScreen.style.display = "flex";
    splashScreen.classList.add("splash");

    calendar.style.animation = "fadeIn 2s";
    calendar.style.WebkitAnimation = "fadeIn 2s";
}

function movePrevMonth(){
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
}
  
function moveNextMonth(){
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
}
  
function moveThisMonth(){
    date = new Date();
    renderCalendar();
}

renderCalendar();
splashScreenImage.addEventListener("click", skipSplash);