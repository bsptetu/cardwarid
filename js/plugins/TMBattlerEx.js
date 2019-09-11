//=============================================================================
// TMPlugin - �o�g���[�\���g��
// �o�[�W����: 2.0.0
// �ŏI�X�V��: 2016/08/12
// �z�z��    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc �G�l�~�[�ɉ��ߊ��⑧�Â����̕\����ǉ����܂��B
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param baseY
 * @desc �g�嗦�����{�ɂȂ�x���W�B
 * �����l: 400
 * @default 400
 *
 * @param breathH
 * @desc ���Â����̑傫���B
 * �����l: 0.05
 * @default 0.05
 *
 * @param mirrorRate
 * @desc ���E���]�̊m���B
 * �����l: 0.4�i 0 �` 1 �j
 * @default 0.4
 *
 * @param breathStop
 * @desc �s���s�\���ɑ��Â������~�߂�B
 * �����l: 1�i 0 �Ŗ��� / 1 �ŗL�� �j
 * @default 1
 *
 * @param shakeEffect
 * @desc �_�ŃG�t�F�N�g��h��G�t�F�N�g�ɍ����ւ���B
 * �����l: 1�i 0 �Ŗ��� / 1 �ŗL�� �j
 * @default 1
 *
 * @help
 * �g����:
 *
 *   ���̃v���O�C���𓱓�����ƁA�G�L�����̕\���Ɉȉ��̉��o���ǉ�����܂��B
 *     �E��ʂ̏�̕��ɏo������G���������\�������i���ߊ��j
 *     �E�������Ɗg��k�����J��Ԃ��i���Â����j
 *     �E�����_���ɍ��E�����]����
 *
 *   �T�C�h�r���[�ł͍��E���]�������ɂȂ�܂��B
 *   �G�L�����̃������Ƀ^�O���������ނ��ƂŁA�G�L�������Ƃɉ��o�̋����
 *   �ݒ肷�邱�Ƃ��ł��܂��B
 *
 *   �v���O�C���R�}���h�͂���܂���B
 *
 *   ���̃v���O�C���� RPG�c�N�[��MV Version 1.3.0 �œ���m�F�����Ă��܂��B
 *
 *
 * �������i�G�L�����j�^�O:
 *
 *   <scale:1>
 *     �g�嗦���ʂɐݒ肵�܂��A���̃^�O������G�L�����ɂ͉��ߊ��̕\����
 *     �K�p����܂���B
 *
 *   <breathH:0.05>
 *     ���Â����̑傫�����ʂɐݒ肵�܂��B
 *
 *   <noMirror>
 *     ���E���]���֎~���܂��B
 */

var Imported = Imported || {};
Imported.TMBattlerEx = true;

var TMPlugin = TMPlugin || {};
TMPlugin.BattlerEx = {};
TMPlugin.BattlerEx.Parameters = PluginManager.parameters('TMBattlerEx');
TMPlugin.BattlerEx.BaseY = +(TMPlugin.BattlerEx.Parameters['baseY'] || 400);
TMPlugin.BattlerEx.BreathH = +(TMPlugin.BattlerEx.Parameters['breathH'] || 0.05);
TMPlugin.BattlerEx.MirrorRate = +(TMPlugin.BattlerEx.Parameters['mirrorRate'] || 0.4);
TMPlugin.BattlerEx.BreathStop = TMPlugin.BattlerEx.Parameters['breathStop'] === '1';
TMPlugin.BattlerEx.ShakeEffect = TMPlugin.BattlerEx.Parameters['shakeEffect'] === '1';

(function() {

  //-----------------------------------------------------------------------------
  // Sprite_Enemy
  //
  
  var _Sprite_Enemy_initialize = Sprite_Enemy.prototype.initialize;
  Sprite_Enemy.prototype.initialize = function(battler) {
    _Sprite_Enemy_initialize.call(this, battler);
    var r = +(battler.enemy().meta.scale || this.y / (TMPlugin.BattlerEx.BaseY * 2) + 0.5);
    this._baseScale = new Point(r, r);
    if ($gameSystem.isSideView() && Math.random() < TMPlugin.BattlerEx.MirrorRate &&
        !battler.enemy().meta.noMirror) {
      this._baseScale.x = 0 - r;
      this._stateIconSprite.scale.x = -1;
    }
    this._breathMax = Math.randomInt(90) + 90;
    this._breathCount = Math.randomInt(this._breathMax);
  };
  
  var _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
  Sprite_Enemy.prototype.update = function() {
    _Sprite_Enemy_update.call(this);
    this.updateScaleEx();
  };

  Sprite_Enemy.prototype.updateScaleEx = function() {
    if (TMPlugin.BattlerEx.BreathStop && !this._enemy.canMove()) return;
    this._breathCount++;
    if (this._breathCount >= this._breathMax) {
      this._breathMax = Math.randomInt(90) + 90;
      this._breathCount = 0;
    }
    var scaleX = this._baseScale.x;
    var scaleY = this._baseScale.y;
    var bh = +(this._enemy.enemy().meta.breathH || TMPlugin.BattlerEx.BreathH);
    scaleY += Math.sin(Math.PI * this._breathCount / (this._breathMax / 2)) * bh;
    this.scale.set(scaleX, scaleY);
  };

  var _Sprite_Enemy_updateBlink = Sprite_Enemy.prototype.updateBlink;
  Sprite_Enemy.prototype.updateBlink = function() {
    if (TMPlugin.BattlerEx.ShakeEffect) {
      var ed = this._effectDuration;
      this.rotation = ed % 4 < 2 ? ed / 200 : 0 - ed / 200;
    } else {
      _Sprite_Enemy_updateBlink.call(this);
    }
  };

})();
