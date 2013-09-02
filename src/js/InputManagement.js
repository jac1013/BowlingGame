/**
 * Created with JetBrains WebStorm.
 * User: Joseph
 * Date: 02/09/13
 * Time: 02:24 PM
 * To change this template use File | Settings | File Templates.
 */

pins = document.getElementById("pins");
button = document.getElementById("button");
pins.addEventListener("keydown", pinsListener, false);

function pinsListener(event) {
    disableOnBackspace(event)
    if (isValidNumber(event)) {
        var value = parseInt(pins.value + String.fromCharCode(event.keyCode)),
            to = pinsLeft();
        checkForMoreThanOneZero();
        enableRollButtonIfValidValue(value, to);
    }
}

function disableOnBackspace(event) {
    if (event.keyCode == 8) {
        button.disabled = true;
    }
}

function isValidNumber(event) {
    var reg = new RegExp("[0-9]");
    return reg.exec(String.fromCharCode(event.keyCode));
}

function pinsLeft() {
    var to = 10;
    if (fixSecondRollPins()) {
        to = 10 - pinsFallenInLastRoll();
    }
    return to;
}

function fixSecondRollPins() {
    return !(logic.firstRoll) && logic.rolls[logic.currentRoll - 1] != null;
}

function pinsFallenInLastRoll() {
    return logic.rolls[logic.currentRoll - 1];
}

function checkForMoreThanOneZero() {
    if (pins.value == "0") {
        button.disabled = true;
        pins.value = "";
    }
}

function enableRollButtonIfValidValue(value, to) {
    if (valueIsBetweenAllowedRange(value, to)) {
        button.disabled = false;
    }
    else {
        button.disabled = true;
    }
}

function valueIsBetweenAllowedRange(value, to) {
    return value <= to && value >= 0
}