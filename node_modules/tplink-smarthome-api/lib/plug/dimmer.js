'use strict';
/**
 * Dimmer
 *
 * TP-Link models: HS220.
 */

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class Dimmer {
  constructor(device, apiModuleName) {
    this.device = device;
    this.apiModuleName = apiModuleName;
  }
  /**
   * Sets Plug to the specified `brightness`.
   *
   * Sends `dimmer.set_brightness` command. Does not support childId.
   * @param  {Boolean}     brightness  0-100
   * @param  {SendOptions} [sendOptions]
   * @return {Promise<Object, ResponseError>} parsed JSON response
   */


  setBrightness(brightness, sendOptions = {}) {
    var _this = this;

    return _asyncToGenerator(function* () {
      return _this.device.sendCommand({
        [_this.apiModuleName]: {
          set_brightness: {
            brightness
          }
        }
      }, null, sendOptions);
    })();
  }
  /**
   * Get Plug/Dimmer default behavior configuration.
   *
   * Requests `dimmer.get_default_behavior`. Does not support childId.
   * @param  {SendOptions} [sendOptions]
   * @return {Promise<boolean, ResponseError>}
   */


  getDefaultBehavior(sendOptions = {}) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      return _this2.device.sendCommand({
        [_this2.apiModuleName]: {
          get_default_behavior: {}
        }
      }, null, sendOptions);
    })();
  }
  /**
   * Get Plug/Dimmer parameters configuration.
   *
   * Requests `dimmer.get_dimmer_parameters`. Does not support childId.
   * @param  {SendOptions} [sendOptions]
   * @return {Promise<boolean, ResponseError>}
   */


  getDimmerParameters(sendOptions = {}) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      return _this3.device.sendCommand({
        [_this3.apiModuleName]: {
          get_dimmer_parameters: {}
        }
      }, null, sendOptions);
    })();
  }
  /**
   * Transitions Plug to the specified `brightness`.
   *
   * Sends `dimmer.set_dimmer_transition` command. Does not support childId.
   * @param  {Object}       options
   * @param  {Boolean}     [options.brightness]  0-100
   * @param  {number}      [options.mode]        "gentle_on_off", etc.
   * @param  {number}      [options.duration]    duration in seconds
   * @param  {SendOptions} [sendOptions]
   * @return {Promise<Object, ResponseError>} parsed JSON response
   */


  setDimmerTransition({
    brightness,
    mode,
    duration
  }, sendOptions = {}) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const transition = {};
      if (brightness !== undefined) transition.brightness = brightness;
      if (mode !== undefined) transition.mode = mode;
      if (duration !== undefined) transition.duration = duration;
      return _this4.device.sendCommand({
        [_this4.apiModuleName]: {
          set_dimmer_transition: transition
        }
      }, null, sendOptions);
    })();
  }
  /**
   * Set Plug/Dimmer `default_behavior` configuration for `double_click`.
   *
   * Sends `dimmer.set_double_click_action`. Does not support childId.
   * @param  {Object}       options
   * @param  {string}      [options.mode]
   * @param  {number}      [options.index]
   * @param  {SendOptions} [sendOptions]
   * @return {Promise<boolean, ResponseError>}
   */


  setDoubleClickAction({
    mode,
    index
  }, sendOptions = {}) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      return _this5.setAction({
        actionName: 'set_double_click_action',
        mode,
        index
      });
    })();
  }
  /**
   * @private
   */


  setAction({
    actionName,
    mode,
    index
  }, sendOptions = {}) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      const action = {};
      if (mode !== undefined) action.mode = mode;
      if (index !== undefined) action.index = index;
      return _this6.device.sendCommand({
        [_this6.apiModuleName]: {
          [actionName]: action
        }
      }, null, sendOptions);
    })();
  }
  /**
   * Set Plug `dimmer_parameters` for `fadeOffTime`.
   *
   * Sends `dimmer.set_fade_off_time`. Does not support childId.
   * @param  {number} duration  duration in ms
   * @param  {SendOptions} [sendOptions]
   * @return {Promise<Object, ResponseError>} parsed JSON response
   */


  setFadeOffTime(fadeTime, sendOptions = {}) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      return _this7.device.sendCommand({
        [_this7.apiModuleName]: {
          set_fade_off_time: {
            fadeTime
          }
        }
      }, null, sendOptions);
    })();
  }
  /**
   * Set Plug `dimmer_parameters` for `fadeOnTime`.
   *
   * Sends `dimmer.set_fade_on_time`. Does not support childId.
   * @param  {number} fadeTime  duration in ms
   * @param  {SendOptions} [sendOptions]
   * @return {Promise<Object, ResponseError>} parsed JSON response
   */


  setFadeOnTime(fadeTime, sendOptions = {}) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      return _this8.device.sendCommand({
        [_this8.apiModuleName]: {
          set_fade_on_time: {
            fadeTime
          }
        }
      }, null, sendOptions);
    })();
  }
  /**
   * Set Plug `dimmer_parameters` for `gentleOffTime`.
   *
   * Sends `dimmer.set_gentle_off_time`. Does not support childId.
   * @param  {number} fadeTime  duration in ms
   * @param  {SendOptions} [sendOptions]
   * @return {Promise<Object, ResponseError>} parsed JSON response
   */


  setGentleOffTime(fadeTime, sendOptions = {}) {
    var _this9 = this;

    return _asyncToGenerator(function* () {
      return _this9.device.sendCommand({
        [_this9.apiModuleName]: {
          set_gentle_off_time: {
            fadeTime
          }
        }
      }, null, sendOptions);
    })();
  }
  /**
   * Set Plug `dimmer_parameters` for `gentleOnTime`.
   *
   * Sends `dimmer.set_gentle_on_time`. Does not support childId.
   * @param  {number} fadeTime  duration in ms
   * @param  {SendOptions} [sendOptions]
   * @return {Promise<Object, ResponseError>} parsed JSON response
   */


  setGentleOnTime(fadeTime, sendOptions = {}) {
    var _this10 = this;

    return _asyncToGenerator(function* () {
      return _this10.device.sendCommand({
        [_this10.apiModuleName]: {
          set_gentle_on_time: {
            fadeTime
          }
        }
      }, null, sendOptions);
    })();
  }
  /**
   * Set Plug/Dimmer `default_behavior` configuration for `long_press`.
   *
   * Sends `dimmer.set_long_press_action`. Does not support childId.
   * @param  {Object}       options
   * @param  {string}      [options.mode]
   * @param  {number}      [options.index]
   * @param  {SendOptions} [sendOptions]
   * @return {Promise<boolean, ResponseError>}
   */


  setLongPressAction({
    mode,
    index
  }, sendOptions = {}) {
    var _this11 = this;

    return _asyncToGenerator(function* () {
      return _this11.setAction({
        actionName: 'set_long_press_action',
        mode,
        index
      });
    })();
  }
  /**
   * Sets Plug to the specified on/off state.
   *
   * Sends `dimmer.set_switch_state` command. Does not support childId.
   * @param  {Boolean}     state  true=on, false=off
   * @param  {SendOptions} [sendOptions]
   * @return {Promise<Object, ResponseError>} parsed JSON response
   */


  setSwitchState(state, sendOptions = {}) {
    var _this12 = this;

    return _asyncToGenerator(function* () {
      return _this12.device.sendCommand({
        [_this12.apiModuleName]: {
          set_switch_state: {
            state: state ? 1 : 0
          }
        }
      }, null, sendOptions);
    })();
  }

}

module.exports = Dimmer;