/**
 * Created with JetBrains WebStorm.
 * User: Joseph
 * Date: 02/09/13
 * Time: 02:26 PM
 * To change this template use File | Settings | File Templates.
 */

logic = new LogicalVariables();
components = new ComponentsContainer();
pins = document.getElementById("pins");
button = document.getElementById("button");
game = new Game();


function rollBall() {
    game.roll(pins.value);
    if (isLastFrame()) {
        var components = new ComponentsContainer();

        if (wasLastRollStrike(components)) {
            letTwoRollsHappenAndShowScore(components);

        } else if (wasLastRollSpare(components)) {
            appendHiddenTotalScore(components);
            calculateTotalScore(totalScoreLengthLessSpareBonus());
        }

    } else {
        paintRoll();
        updateView();
        wasLastFrameAndTwoSingleResults();
    }

}

function isLastFrame() {
    return logic.currentFrame > logic.maxFrame;
}

function wasLastRollStrike(components) {
    return components.outters()[logic.maxFrame].querySelector(".rightCornerTop") != null;
}

function letTwoRollsHappenAndShowScore(components) {
    if (logic.lastRollWasStrike) {
        appendHiddenTotalScore(components);
        calculateTotalScore(totalScoreLengthLessStrikeBonus());
    } else {
        appendHiddenTotalScore(components);
        logic.lastRollWasStrike = true;
    }
}

function appendHiddenTotalScore(components) {
    var mainDiv = document.querySelector(".mainDiv"),
        totalScore = components.totalResultContainer(pins.value);
    totalScore.style.display = "none";
    mainDiv.appendChild(totalScore);
    logic.rolls[logic.currentRoll] = parseInt(pins.value);
    dispathBonusEventsIfExist();
    logic.currentRoll++;
}

function dispathBonusEventsIfExist() {
    for (var i = 0; i < logic.pendingStrikeOrSpareEvents.length; i++) {
        if (itHasBonus(i)) {
            logic.resultContainerWithListener[i].dispatchEvent(logic.pendingStrikeOrSpareEvents[i]);
        }
    }
}

function itHasBonus(i) {
    return !(logic.resultContainerWithListener[i] == null);
}

function calculateTotalScore(numOfScores) {
    var totalScores = document.querySelectorAll(".totalScoreContainer");
    var finalScore = 0;
    for (var j = 0; j < numOfScores; j++) {
        finalScore += parseInt(totalScores[j].innerHTML.trim());
    }

    alert("This is your score: " + finalScore);
    endGame();
}

function endGame() {
    pins.disabled = true;
    button.disabled = true;
}

function totalScoreLengthLessStrikeBonus() {
    return document.querySelectorAll(".totalScoreContainer").length - 2;
}

function wasLastRollSpare(components) {
    return components.outters()[logic.maxFrame].querySelector(".rightCornerTopWhite") != null;
}

function totalScoreLengthLessSpareBonus() {
    return document.querySelectorAll(".totalScoreContainer").length - 1;
}


function wasLastFrameAndTwoSingleResults() {
    var components = new ComponentsContainer(),
        outters = components.outters();
    if (isLastFrame()) {
        if (outters[logic.maxFrame].querySelector(".totalScoreContainer") != null) {
            calculateTotalScore(document.querySelectorAll(".totalScoreContainer").length);
        }
    }
}

function paintRoll() {
    var components = new ComponentsContainer();
    dispathBonusEventsIfExist();
    if (logic.firstRoll) {
        paintFirstRoll(components);
    } else {
        paintSecondRoll(components);
    }


}

function paintFirstRoll(components) {
    var resultContainer = createAndPaintResultContainer(components);
    components.actualResultContainer = resultContainer;

    if (isStrike()) {
        paintStrike(components);
        setupStrikeBonusListener(components);
        logic.currentRoll++;
        logic.currentFrame++;

    } else {
        paintSingleFirstResult(components);
        logic.currentRoll++;

    }
}

function createAndPaintResultContainer(components) {
    var resultContainer = components.resultContainer(logic.lastLeftPosition, logic.lastTopPosition),
        outterContainer = components.outterContainer;
    outterContainer.appendChild(resultContainer);
    return resultContainer;
}

function isStrike() {
    return pins.value == "10";
}

function paintStrike(components) {
    var strikeResult = components.strikeResult,
        outters = components.outters();
    outters[logic.currentFrame].appendChild(strikeResult);
    logic.rolls[logic.currentRoll] = parseInt(pins.value);
}

function setupStrikeBonusListener(components) {
    var resultContainer = components.actualResultContainer;
    resultContainer.twoRollsHappen = logic.currentRoll + 2;
    resultContainer.addEventListener("strikeBonus", function strikeBonus() {
        if (twoRollsWasMade(resultContainer)) {
            var totalScore = components.totalResultContainer(10 + parseInt(pins.value)
                + logic.rolls[logic.currentRoll - 1]);
            resultContainer.appendChild(totalScore);
            resultContainer.removeEventListener("strikeBonus", strikeBonus, false);
        }
    }, false)
    attachResultAndStrikeListener(resultContainer);

}

function twoRollsWasMade(resultContainer) {
    return resultContainer.twoRollsHappen == logic.currentRoll;
}

function attachResultAndStrikeListener(resultContainer) {
    var strikeEvent = document.createEvent("Event");
    strikeEvent.initEvent("strikeBonus", true, true);
    logic.pendingStrikeOrSpareEvents[logic.currentFrame] = strikeEvent;
    logic.resultContainerWithListener[logic.currentFrame] = resultContainer;
}

function paintSingleFirstResult(components) {
    var firstResult = components.firstResult(pins.value),
        rightCorner = components.rightCorner,
        outters = components.outters();
    outters[logic.currentFrame].appendChild(firstResult).
        appendChild(rightCorner);
    logic.rolls[logic.currentRoll] = parseInt(pins.value);
    logic.firstRoll = false;
}

function paintSecondRoll(components) {
    var resultContainer = components.outters()[logic.currentFrame];
    components.actualResultContainer = resultContainer;

    if (isSpare()) {
        paintSpare(components);
        setupSpareBonusListener(components);
        attachResultAndSpareListener(resultContainer);

    } else {
        paintSingleSecondResult(components);
    }

    logic.currentFrame++;
    logic.currentRoll++;
    logic.firstRoll = true;
}

function isSpare() {
    return parseInt(pins.value) + logic.rolls[logic.currentRoll - 1] == 10;
}

function paintSpare(components) {
    var spareResult = components.spareResult,
        resultContainer = components.actualResultContainer,
        oldRightCorner = components.rightCorners()[logic.currentFrame];
    resultContainer.oneRollHappen = logic.currentRoll + 1;
    oldRightCorner.parentNode.replaceChild(spareResult, oldRightCorner);
    logic.rolls[logic.currentRoll] = parseInt(pins.value);
}

function setupSpareBonusListener(components) {
    var resultContainer = components.actualResultContainer;
    resultContainer.addEventListener("spareBonus", function spareBonus() {
        if (resultContainer.oneRollHappen == logic.currentRoll) {
            var totalScore = components.totalResultContainer(10 + parseInt(pins.value));
            resultContainer.appendChild(totalScore);
            resultContainer.removeEventListener("spareBonus", spareBonus, false);
        }
    }, false);
}

function attachResultAndSpareListener(resultContainer) {
    var spareEvent = document.createEvent("Event");
    spareEvent.initEvent("spareBonus", true, true);
    logic.resultContainerWithListener[logic.currentFrame] = resultContainer;
    logic.pendingStrikeOrSpareEvents[logic.currentFrame] = spareEvent;
}

function paintSingleSecondResult(components) {
    var rightCorner = components.rightCorner,
        rightCornerWithsecondResult = components.singleSecondResult(rightCorner, pins.value),
        oldRightCorner = components.rightCorners()[logic.currentFrame],
        totalScore = components.totalResultContainer(logic.rolls[logic.currentRoll - 1] + parseInt(pins.value)),
        outters = components.outters();
    oldRightCorner.parentNode.replaceChild(rightCornerWithsecondResult, oldRightCorner);
    outters[logic.currentFrame].appendChild(totalScore);
    logic.rolls[logic.currentRoll] = parseInt(pins.value);

}

function updateView() {
    pins.removeEventListener("keypress", pinsListener, false);
    pins.addEventListener("keypress", pinsListener, false);
    pins.value = "";
    button.disabled = true;
}