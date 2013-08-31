/**
 * Created with JetBrains WebStorm.
 * User: Joseph
 * Date: 28/08/13
 * Time: 09:54 AM
 * To change this template use File | Settings | File Templates.
 */

function Game() {

       var rolls = new Array(),
       currentRoll = 0;

    this.roll = function roll(pins) {
        rolls[currentRoll++] = pins;
    }

    this.score = function score() {
        var score = 0,
            frameIndex = 0,
            frame = 0;
        for (; frame < 10; frame++) {
            if (isStrike(frameIndex)) {
                score += 10 + strikeBonus(frameIndex);
                frameIndex++;
            } else if (isSpare(frameIndex)) {
                score += 10 + spareBonus(frameIndex);
                frameIndex += 2;
            } else {
                score += sumBallsOfFrame(frameIndex);
                frameIndex += 2;
            }
        }
        return score;
    }

    function isStrike(frameIndex){
               return rolls[frameIndex] == 10;
    }

    function strikeBonus(frameIndex){
        return  rolls[frameIndex + 1] + rolls[frameIndex + 2];
    }

    function isSpare(frameIndex){
         return rolls[frameIndex] + rolls[frameIndex + 1] == 10;
    }

    function spareBonus(frameIndex){
              return rolls[frameIndex + 2];
    }

    function sumBallsOfFrame(frameIndex){
        return  rolls[frameIndex] + rolls[frameIndex + 1];
    }
}





