(function() {
var _prevfunc = Game_Action.prototype.executeHpDamage;
 Game_Action.prototype.executeHpDamage = function(target, value) {
 _prevfunc.call(this, target, value);
$gameVariables.setValue(3829,value);
};

 })();


Window_BattleLog.prototype.animationBaseDelay = function() {
    return 1;
};

Window_BattleLog.prototype.animationNextDelay = function() {
    return 1;
};

Window_BattleLog.prototype.updateWaitCount = function() {
	var waitMax;
	var waitMin;
   	    waitMax = 3 * 100;
    	waitMin = 1 * 100;

    if (this._waitCount > 0) {
        this._waitCount -= this.isFastForward() ? waitMax : waitMin;
        if (this._waitCount < 0) {
            this._waitCount = 0;
        }
    	return true;
    }
    return false;
};

BattleManager.endTurn = function() {
    this._phase = 'turnEnd';
    this._preemptive = false;
    this._surprise = false;
    this.allBattleMembers().forEach(function(battler) {
        battler.onTurnEnd();
        this.refreshStatus();
        this._logWindow.displayAutoAffectedStatus(battler);
        this._logWindow.displayRegeneration(battler);
    }, this);
    if (this.isForcedTurn()) {
        //this._turnForced = false;
    }
};

Window_BattleLog.prototype.waitForNewLine = function() {
    var baseLine = 0;
    if (this._baseLineStack.length > 0) {
        baseLine = this._baseLineStack[this._baseLineStack.length - 1];
    }
    if (this._lines.length > baseLine) {
       //this.wait();
    }
};
