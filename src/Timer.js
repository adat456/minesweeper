var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Timer_instances, _Timer_hour, _Timer_minute, _Timer_second, _Timer_intervalId, _Timer_timer, _Timer_formatTime, _Timer_updateDisplays;
import { hourDisplay, minuteDisplay, secondDisplay } from './elements';
class Timer {
    constructor() {
        _Timer_instances.add(this);
        _Timer_hour.set(this, 0);
        _Timer_minute.set(this, 0);
        _Timer_second.set(this, 0);
        _Timer_intervalId.set(this, void 0);
    }
    start() {
        this.reset();
        __classPrivateFieldSet(this, _Timer_intervalId, setInterval(() => __classPrivateFieldGet(this, _Timer_instances, "m", _Timer_timer).call(this), 1000), "f");
    }
    pause() {
        clearInterval(__classPrivateFieldGet(this, _Timer_intervalId, "f"));
    }
    reset() {
        clearInterval(__classPrivateFieldGet(this, _Timer_intervalId, "f"));
        __classPrivateFieldSet(this, _Timer_hour, 0, "f");
        __classPrivateFieldSet(this, _Timer_minute, 0, "f");
        __classPrivateFieldSet(this, _Timer_second, 0, "f");
        __classPrivateFieldGet(this, _Timer_instances, "m", _Timer_updateDisplays).call(this);
    }
    getTimeString() {
        return `${__classPrivateFieldGet(this, _Timer_hour, "f") > 0 ? `${Number(__classPrivateFieldGet(this, _Timer_hour, "f"))} hour${__classPrivateFieldGet(this, _Timer_hour, "f") > 1 ? 's' : ''}, ` : ''}${__classPrivateFieldGet(this, _Timer_minute, "f") > 0 ? `${Number(__classPrivateFieldGet(this, _Timer_minute, "f"))} minute${__classPrivateFieldGet(this, _Timer_minute, "f") > 1 ? 's' : ''}, ` : ''}${__classPrivateFieldGet(this, _Timer_second, "f") > 0 ? `${Number(__classPrivateFieldGet(this, _Timer_second, "f"))} second${__classPrivateFieldGet(this, _Timer_second, "f") > 1 ? 's' : ''}` : ''}`;
    }
}
_Timer_hour = new WeakMap(), _Timer_minute = new WeakMap(), _Timer_second = new WeakMap(), _Timer_intervalId = new WeakMap(), _Timer_instances = new WeakSet(), _Timer_timer = function _Timer_timer() {
    var _a, _b;
    if ((__classPrivateFieldSet(this, _Timer_second, __classPrivateFieldGet(this, _Timer_second, "f") + 1, "f")) == 60) {
        __classPrivateFieldSet(this, _Timer_second, 0, "f");
        __classPrivateFieldSet(this, _Timer_minute, (_a = __classPrivateFieldGet(this, _Timer_minute, "f"), _a++, _a), "f");
    }
    if (__classPrivateFieldGet(this, _Timer_minute, "f") == 60) {
        __classPrivateFieldSet(this, _Timer_minute, 0, "f");
        __classPrivateFieldSet(this, _Timer_hour, (_b = __classPrivateFieldGet(this, _Timer_hour, "f"), _b++, _b), "f");
    }
    __classPrivateFieldGet(this, _Timer_instances, "m", _Timer_updateDisplays).call(this);
}, _Timer_formatTime = function _Timer_formatTime(input) {
    return input >= 10 ? String(input) : `0${input}`;
}, _Timer_updateDisplays = function _Timer_updateDisplays() {
    hourDisplay.textContent = __classPrivateFieldGet(this, _Timer_instances, "m", _Timer_formatTime).call(this, __classPrivateFieldGet(this, _Timer_hour, "f"));
    minuteDisplay.textContent = __classPrivateFieldGet(this, _Timer_instances, "m", _Timer_formatTime).call(this, __classPrivateFieldGet(this, _Timer_minute, "f"));
    secondDisplay.textContent = __classPrivateFieldGet(this, _Timer_instances, "m", _Timer_formatTime).call(this, __classPrivateFieldGet(this, _Timer_second, "f"));
};
export default Timer;
