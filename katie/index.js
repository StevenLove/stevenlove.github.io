const ANNIVERSARY = moment("10-19-2016","MM-DD-YYYY");
const Wiki = require("./wiki.js");

const getAnniversaryDays = () => {
    return moment().diff(ANNIVERSARY,"days");
}
const getAnniversaryMonths = () => {
    return moment().diff(ANNIVERSARY,"months",true);
}
const getAnniversaryYears = () => {
    return moment().diff(ANNIVERSARY,"years",true);
}
const getAnniversaryHours = () => {
    return moment().diff(ANNIVERSARY,"hours",true);
}

const fadeIn = cb => {
    cb();
    setTimeout(()=>{
        $(".switcher").hide();
        $(".switcher").css("visibility","visible");
        $(".switcher").fadeIn(2000);
    },1000);
}
const fadeInOut = cb => {
    $(".switcher").fadeOut(2000,()=>{
        cb();
        $(".switcher").fadeIn(2000);
    });
}
const showDays = () => {
    const days = getAnniversaryDays();
    $(".odometer").html(days).css("font-size","6em");;
    $("#daysLabel").html("days");
    update();
}

const showMonths = () => {
    const months = getAnniversaryMonths();
    $(".odometer").html(months.toFixed(1)).css("font-size","6em");
    $("#daysLabel").html("months");
    update();
}

const showYears = () => {
    const years = getAnniversaryYears();
    $(".odometer").html(years.toFixed(1)).css("font-size","6em");
    $("#daysLabel").html("years");
    update();
}

const showHours = () => {
    const hours = getAnniversaryHours();
    $(".odometer").html(hours.toFixed(0)).css("font-size","4em");
    $("#daysLabel").html("hours");
    update();
}
let current = 0;
const ordering = [showDays,showHours,showMonths,showYears]
const toggleDaysMonths = ()=>{
    ++current;
    if(current >= ordering.length){
        current = 0;
    }
    fadeInOut(ordering[current]);
}
$(document).ready(()=>{

    fadeIn(showYears);
    // var handle = setInterval(toggleDaysMonths,9000);
    // $("#explanation").on("scroll mousemove mouseenter mouseleave",()=>{
    //     clearInterval(handle);
    //     handle = setInterval(toggleDaysMonths,9000);
    // });
    // $(document).on("click touch",()=>{
    //     clearInterval(handle);
    //     handle = setInterval(toggleDaysMonths,9000);
    //     toggleDaysMonths();
    // })

    // $("#testNumber").on("change",()=>{
    //     Wiki.getFact($("#testNumber").val(),html=>{

    //         html = html.replace("<h1","<h3");
    //         html = html.replace(/(\d+) (\d+)/g,"$1<sup>$2</sup>");
    
    //         $("#wiki").html(html)
    //     })
    // })
})

function update(){
    Wiki.getFact($(".odometer").text(),html=>{

        html = html.replace("<h1","<h3");
        html = html.replace(/(\d+) (\d+)/g,"$1<sup>$2</sup>");

        $("#wiki").html(html)
    })
}