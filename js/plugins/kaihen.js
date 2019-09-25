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

Window_BattleLog.prototype.addText = function(text) {
    this._lines.push(text);
    this.refresh();
    //this.wait();
};
