(function() {
var _prevfunc = Game_Action.prototype.executeHpDamage;
 Game_Action.prototype.executeHpDamage = function(target, value) {
 _prevfunc.call(this, target, value);
$gameVariables.setValue(3829,value);
};

 })();


