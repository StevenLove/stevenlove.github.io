const ANNIVERSARY = moment("10-19-2016","MM-DD-YYYY");
const Wiki = require("./wiki.js");
window.odometerOptions = {
//   auto: false, // Don't automatically initialize everything with class 'odometer'
//   selector: '.my-numbers', // Change the selector used to automatically find things to be animated
  format: '(d).dd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
  duration: 1000, // Change how long the javascript expects the CSS animation to take
//   theme: 'car', // Specify the theme (if you have more than one theme css file on the page)
  animation: 'count' // Count is a simpler animation method which just increments the value,
                     // use it when you're looking for something more subtle.
};

const getAnniversaryDays = () => {
    return moment().diff(ANNIVERSARY,"days");
}
const getAnniversaryMonths = () => {
    return moment().diff(ANNIVERSARY,"months",true);
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
    $(".odometer").html(days);
    $("#daysLabel").html("days");
    Wiki.getFact(days,html=>$("#wiki").html(html));
}

const showMonths = () => {
    const months = getAnniversaryMonths();
    $(".odometer").html(months.toFixed(2));
    $("#daysLabel").html("months");
    Wiki.getFact(Math.floor(months),html=>$("#wiki").html(html));
}

const toggleDaysMonths = ()=>{

    if(showingDays){
        fadeInOut(showMonths);
        showingDays = false;
    }
    else{
        fadeInOut(showDays);
        showingDays = true;
    }
}
var showingDays = true;
$(document).ready(()=>{
    // getFact(days,function(html){
    //     $("#explanation").html(html);
    // });

    // var str = '==Alphabets and codes==\n*In the [[NATO phonetic alphabet]], the digit 9 is called \"Niner\".\n*Five-digit [[produce]] [[Price Look-Up code|PLU codes]] that begin with 9 are [[Organic food|organic]]."}]'
    //     str = str.replace("\n"," . HI . ");

    // console.log("PARESE", Wiki.parseMarkup(str));
    // Wiki.getFullFacts(297,console.log);
    // Wiki.getFact(9,console.log);
    // console.log(str);
    // console.log(Wiki.parseMarkup(str));

    fadeIn(showDays);
    var handle = setInterval(toggleDaysMonths,9000);
    $("#explanation").on("scroll",()=>{
        clearInterval(handle);
        handle = setInterval(toggleDaysMonths,9000);
    });
    // $("#explanation").on("mouseleave",()=>{
    //     clearInterval(handle);
    //     handle = setInterval(toggleDaysMonths,fiveSec);
    // })
    // $("#explanation").on("tap taphold swipe scroll",()=>{
    //     clearInterval(handle);
    //     setTimeout(()=>{
    //         handle = setInterval(toggleDaysMonths,fiveSec);
    //     },tenSec);
    // })
    
    // $("#wiki").html("Two hundred [and] eighty-seven 287 = 7·41, sum of three consecutive primes (89 + 97 + 101), sum of five consecutive primes (47 + 53 + 59 + 61 + 67), sum of nine consecutive primes (17 + 19 + 23 + 29 + 31 + 37 + 41 + 43 + 47), Kynea number, pentagonal number, also shorthand for the Intel math coprocessor to the 80286");
})