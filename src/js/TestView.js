/**
 * Created with JetBrains WebStorm.
 * User: Joseph
 * Date: 02/09/13
 * Time: 02:33 PM
 * To change this template use File | Settings | File Templates.
 * For use of the test the must be include in the BowlingView.html and
 * comment 3 methods in BowlingGameContoller:
 * "paintRoll();updateView();wasLastFrameAndTwoSingleResults();"
 * then auto-call the test you want to use (add "()" to the end of the
 * method to auto-call it).
 * Essentially these test were made for a TDD approach for the view.
 */
var ca = new ComponentsContainer();

testPaintResultContainer: (function () {
    var resultContainer = ca.resultContainer(logic.lastLeftPosition, logic.lastTopPosition),
        outterContainer = ca.outterContainer;
    outterContainer.appendChild(resultContainer);
});

testPaintFirstResult: (function () {
    var firstResult = ca.firstResult(5),
        outters = ca.outters();
    outters[0].appendChild(firstResult);

});

testPaintSingleSecondResult: (function () {
    var rightCorner = ca.rightCorner,
        rightCornerWithsecondResult = ca.singleSecondResult(rightCorner, 4),
        outters = ca.outters();
    rightCorner.style.top = "-31px";
    outters[0].appendChild(rightCornerWithsecondResult);
});

testRepaintRightCorner: (function () {
    var rightCorner = ca.rightCorner,
        rightCornerWithsecondResult = ca.singleSecondResult(rightCorner, 4),
        outters = ca.outters(),
        spareResult = ca.spareResult;
    rightCorner.style.top = "-31px";
    outters[0].appendChild(rightCornerWithsecondResult).
        replaceChild(spareResult, rightCorner);

});

testPaintSpareResult: (function () {
    var spareResult = ca.spareResult,
        outters = ca.outters();
    spareResult.style.top = "-31px";
    outters[0].appendChild(spareResult);
});

testPaintStrikeResult: (function () {
    var strikeResult = ca.strikeResult,
        outters = ca.outters();
    strikeResult.style.top = "-31px";
    outters[0].appendChild(strikeResult);
});

testPaintSecondResultContainer: (function () {
    var resultContainer = ca.resultContainer(logic.lastLeftPosition, logic.lastTopPosition),
        outterContainer = ca.outterContainer;
    outterContainer.appendChild(resultContainer);
    var firstResult = ca.firstResult(4),
        secondResult = ca.singleSecondResult(ca.rightCorner, 5),
        totalResult = ca.totalResultContainer(9),
        outters = ca.outters();
    secondResult.style.top = "-31px"
    totalResult.style.top = "-30px";
    outters[1].appendChild(firstResult);
    outters[1].appendChild(secondResult);
    outters[1].appendChild(totalResult);

});

testPaintTotalScore: (function () {
    var outters = ca.outters(),
        totalScore = ca.totalResultContainer(9);
    outters[0].appendChild(totalScore);
});

testResultListenerForStrike: (function () {
    var resultContainer = ca.resultContainer(logic.lastLeftPosition, logic.lastTopPosition);
    resultContainer.twoRollsHappen = logic.currentFrame;
    resultContainer.addEventListener("strikeBonus", function strikeBonus() {
        if (resultContainer.twoRollsHappen == logic.currentFrame) {
            var totalScore = ca.totalResultContainer(20),
                outterContainer = ca.outterContainer;
            totalScore.style.top = "-30px";
            resultContainer.appendChild(totalScore);
            outterContainer.appendChild(resultContainer);
            resultContainer.removeEventListener("strikeBonus", strikeBonus, false);
        }
    }, false);
    var strikeEvent = document.createEvent("Event");
    strikeEvent.initEvent("strikeBonus", true, true);
    resultContainer.dispatchEvent(strikeEvent);
});

testValidatePinsValue: (function () {
    pins.addEventListener("keypress", function (event) {
        var reg = new RegExp("[0-9]");
        if (reg.exec(String.fromCharCode(event.keyCode))) {
            var value = parseInt(pins.value + String.fromCharCode(event.keyCode));
            if (value <= 10 && value >= 0) {
                console.log("is a valid number!");
            }
            else {
                console.log("is not a valid number!");
            }
        }
    }, false);
});

testSumAllRolls: (function () {

    for (var i = 0; i < 8; i++) {
        var components = new ComponentsContainer();
        var resultContainer = components.resultContainer(logic.lastLeftPosition, logic.lastTopPosition),
            outterContainer = components.outterContainer;
        outterContainer.appendChild(resultContainer);
        var firstResult = components.firstResult(4),
            secondResult = components.singleSecondResult(components.rightCorner, 5),
            totalResult = components.totalResultContainer(9),
            outters = components.outters();
        secondResult.style.top = "-31px"
        totalResult.style.top = "-30px";
        outters[i].appendChild(firstResult);
        outters[i].appendChild(secondResult);
        outters[i].appendChild(totalResult);
    }
    var totalScores = document.querySelectorAll(".totalScoreContainer");
    var finalScore = 0;
    for (var j = 0; j < totalScores.length; j++) {
        finalScore += parseInt(totalScores[j].innerHTML.trim());
    }

    alert("This is your score: " + finalScore);

});