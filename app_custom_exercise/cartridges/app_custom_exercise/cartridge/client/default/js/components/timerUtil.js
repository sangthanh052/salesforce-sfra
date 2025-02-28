/* eslint-disable radix */
'use strict';
let timer;

/**
 * Convert milisecond to second
 * @param {number} duration time remaining
 * @param {number} timeToResendOTP waiting time before sending OTP again
 * @returns {string} seconds
 */
function msToTime(duration, timeToResendOTP) {
    var seconds = parseInt((duration / 1000) % timeToResendOTP);
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    return seconds;
}

/**
 * Display to storefront
 * @param {string} seconds seconds
 * @param {number} timeToResendOTP waiting time before sending OTP again
 */
function display(seconds, timeToResendOTP) {
    let el = document.getElementById('timer');
    if (el) {
        el.innerHTML = msToTime(seconds, timeToResendOTP);
    }
}

/**
 * Show button Resend after count down finish
 */
function displayAfterCountDown() {
    let el = $('.mdl-chip');
    if (el && el.length) {
        let data = el.data('text-after-waiting');
        el.empty().html(data);
    }
}

/**
 * Reset time stapp
 */
const resetTimer = function () {
    localStorage.removeItem('timestamp');
    display(0);
};

/**
 * Stop count down
 */
const stopTimer = function () {
    localStorage.setItem('timerRunning', 'false');
    clearInterval(timer);
};

const displayTime = function (timestamp) {
    if (timestamp) {
        var duration = (Date.now() - timestamp);
        var timeToResendOTP = $('.mdl-chip__text').data('time-to-resend-otp') || 60;
        var countDownTime = parseInt(timeToResendOTP) * 1000;
        var displayDurationTime = parseInt(timeToResendOTP) * 60000;
        if ((countDownTime - duration) > 0) {
            display(displayDurationTime - duration, parseInt(timeToResendOTP));
        } else {
            stopTimer();
            resetTimer();
            displayAfterCountDown();
        }
    } else {
        display(0);
    }
};

const startTimer = function () {
    let timestamp = parseInt(localStorage.getItem('timestamp')) || Date.now();
    localStorage.setItem('timestamp', timestamp.toString());
    localStorage.setItem('timerRunning', 'true');
    clearInterval(timer);
    timer = setInterval(() => displayTime(timestamp), 1000);
};

module.exports = {
    startTimer,
    stopTimer,
    resetTimer
};
