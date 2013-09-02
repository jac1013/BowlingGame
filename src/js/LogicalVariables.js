/**
 * Created with JetBrains WebStorm.
 * User: Joseph
 * Date: 02/09/13
 * Time: 02:21 PM
 * To change this template use File | Settings | File Templates.
 */

function LogicalVariables() {
    this.firstRoll = true;
    this.rolls = new Array();
    this.currentRoll = 0;
    this.currentFrame = 0;
    this.lastLeftPosition = -60;
    this.lastTopPosition = 82;
    this.pendingStrikeOrSpareEvents = new Array();
    this.resultContainerWithListener = new Array();
    this.maxFrame = 9;
    this.lastRollWasStrike = false;
}