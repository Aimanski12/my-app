const moment = require('moment');

let hr = moment().hour()
let min = moment().minute()

let samp = moment("12-25-1995", "MM-DD-YYYY");

 
// console.log(hr + ':' + min)



// let month = Date.prototype.getMonth();
// let day = Date.prototype.getDay()
// let hrs = Date.prototype.getHours()
// let mins = Date.prototype.getMinutes()
// let sec = Date.prototype.getSeconds()

// console.log(`month: ${month}, day: ${day}, hours: ${hrs}, minutes: ${mins}, seconds: ${sec}`)


// let sampleTime = 0;
// let day = moment(sampleTime)
// // console.log(day.fromNow())
// console.log(day.format('h:mm a'))

let time = moment().valueOf();
console.log(time)

