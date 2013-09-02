/**
 * Created with JetBrains WebStorm.
 * User: Joseph
 * Date: 02/09/13
 * Time: 02:18 PM
 * To change this template use File | Settings | File Templates.
 */
function ComponentsContainer() {

    this.outterContainer = (function () {
        return document.querySelector(".mainDiv .forOutter");
    })();

    this.resultContainer = function (leftPosition, topPosition) {
        var div = document.createElement("div");
        div.className = "outter";
        div.style.left = (leftPosition + 70) + "px";
        div.style.top = (topPosition - 62) + "px";
        logic.lastLeftPosition += 70;
        logic.lastTopPosition -= 62
        return div;
    };

    this.totalResultContainer = function (score) {
        var div = document.createElement("div");
        div.className = "totalScoreContainer";
        div.innerHTML += score;
        return div;

    };

    this.rightCorner = (function () {
        var div = document.createElement("div");
        div.className = "rightCorner";
        return div;
    })();


    this.firstResult = function (score) {
        var div = document.createElement("div");
        div.className = "firstRollScore";
        div.innerHTML += score;
        return div;
    };

    this.strikeResult = (function () {
        var div = document.createElement("div"),
            divStrikeBot = document.createElement("div"),
            divStrikeTop = document.createElement("div");
        divStrikeTop.className = "rightCornerTop";
        divStrikeBot.className = "rightCornerBot";
        div.className = "rightCorner";
        div.style.top = "0px";
        div.appendChild(divStrikeTop);
        div.appendChild(divStrikeBot);
        return div;

    })();

    this.spareResult = (function () {
        var div = document.createElement("div"),
            divSpareTop = document.createElement("div"),
            divSpareBot = document.createElement("div");
        divSpareTop.className = "rightCornerTopWhite";
        divSpareBot.className = "rightCornerBot";
        div.className = "rightCorner";
        div.appendChild(divSpareTop);
        div.appendChild(divSpareBot);

        return div;
    })();

    this.singleSecondResult = function (divToAppendScore, score) {
        divToAppendScore.innerHTML += score;
        return divToAppendScore;
    };

    this.outters = function () {
        return document.querySelectorAll(".outter");
    };

    this.rightCorners = function () {
        return document.querySelectorAll(".rightCorner");
    };


}
